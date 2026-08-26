export type AiEndpoint = "analysis" | "commentary"

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
}

interface RateBucket {
  count: number
  resetAt: number
}

export class FixedWindowRateLimiter {
  private readonly buckets = new Map<string, RateBucket>()
  private checks = 0

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly maxKeys = 10_000,
  ) {}

  consume(key: string, now = Date.now()): RateLimitResult {
    this.checks += 1
    if (this.checks % 100 === 0) this.prune(now)

    const current = this.buckets.get(key)
    if (!current || current.resetAt <= now) {
      const resetAt = now + this.windowMs
      this.buckets.set(key, { count: 1, resetAt })
      return {
        allowed: true,
        limit: this.limit,
        remaining: Math.max(0, this.limit - 1),
        resetAt,
      }
    }

    if (current.count >= this.limit) {
      return { allowed: false, limit: this.limit, remaining: 0, resetAt: current.resetAt }
    }

    current.count += 1
    return {
      allowed: true,
      limit: this.limit,
      remaining: Math.max(0, this.limit - current.count),
      resetAt: current.resetAt,
    }
  }

  private prune(now: number) {
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAt <= now) this.buckets.delete(key)
    }
    if (this.buckets.size <= this.maxKeys) return

    const oldest = [...this.buckets.entries()]
      .sort((a, b) => a[1].resetAt - b[1].resetAt)
      .slice(0, this.buckets.size - this.maxKeys)
    for (const [key] of oldest) this.buckets.delete(key)
  }
}

interface CacheEntry<T> {
  expiresAt: number
  value: T
}

export class TtlCache<T> {
  private readonly entries = new Map<string, CacheEntry<T>>()

  constructor(private readonly maxEntries = 500) {}

  get(key: string, now = Date.now()): T | undefined {
    const entry = this.entries.get(key)
    if (!entry) return undefined
    if (entry.expiresAt <= now) {
      this.entries.delete(key)
      return undefined
    }
    return entry.value
  }

  set(key: string, value: T, ttlMs: number, now = Date.now()) {
    if (this.entries.size >= this.maxEntries && !this.entries.has(key)) {
      const oldest = [...this.entries.entries()].sort(
        (a, b) => a[1].expiresAt - b[1].expiresAt,
      )[0]
      if (oldest) this.entries.delete(oldest[0])
    }
    this.entries.set(key, { expiresAt: now + ttlMs, value })
  }
}

interface AiRuntimeState {
  cache: TtlCache<unknown>
  configSignature: string
  limiter: FixedWindowRateLimiter
  pending: Map<string, Promise<unknown>>
}

const aiGlobal = globalThis as typeof globalThis & {
  __legendaryMatchAiRuntime?: AiRuntimeState
}

function envInt(name: string, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(process.env[name] ?? "", 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(min, Math.min(max, parsed))
}

function runtimeState(): AiRuntimeState {
  const limit = envInt("AI_RATE_LIMIT_MAX", 6, 1, 100)
  const windowMs = envInt("AI_RATE_LIMIT_WINDOW_MS", 600_000, 10_000, 86_400_000)
  const signature = `${limit}:${windowMs}`
  const existing = aiGlobal.__legendaryMatchAiRuntime
  if (existing?.configSignature === signature) return existing

  const state: AiRuntimeState = {
    cache: existing?.cache ?? new TtlCache<unknown>(500),
    configSignature: signature,
    limiter: new FixedWindowRateLimiter(limit, windowMs),
    pending: existing?.pending ?? new Map<string, Promise<unknown>>(),
  }
  aiGlobal.__legendaryMatchAiRuntime = state
  return state
}

function clientKey(request: Request): string {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim()
  return ip || request.headers.get("x-real-ip")?.trim() || "unknown"
}

export interface AiRequestGuard {
  allowed: boolean
  headers: Record<string, string>
  status: number
  error?: string
}

export function guardAiRequest(request: Request, endpoint: AiEndpoint): AiRequestGuard {
  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      allowed: false,
      error: "Content-Type must be application/json",
      headers: {},
      status: 415,
    }
  }

  const declaredLength = Number.parseInt(request.headers.get("content-length") ?? "0", 10)
  if (Number.isFinite(declaredLength) && declaredLength > 4_096) {
    return { allowed: false, error: "Request body is too large", headers: {}, status: 413 }
  }

  const result = runtimeState().limiter.consume(`${endpoint}:${clientKey(request)}`)
  const resetSeconds = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1_000))
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1_000)),
  }
  if (!result.allowed) headers["Retry-After"] = String(resetSeconds)

  return {
    allowed: result.allowed,
    error: result.allowed ? undefined : "Too many AI requests. Please try again later.",
    headers,
    status: result.allowed ? 200 : 429,
  }
}

export class AiRequestBodyError extends Error {
  constructor(
    message: string,
    readonly status = 400,
  ) {
    super(message)
  }
}

export async function readAiJson<T>(request: Request): Promise<T> {
  const text = await request.text()
  if (new TextEncoder().encode(text).byteLength > 4_096) {
    throw new AiRequestBodyError("Request body is too large", 413)
  }
  if (!text.trim()) throw new AiRequestBodyError("Request body is empty")
  try {
    return JSON.parse(text) as T
  } catch {
    throw new AiRequestBodyError("Request body must be valid JSON")
  }
}

export type AiCacheStatus = "hit" | "miss" | "shared"

export async function withAiCache<T>(
  key: string,
  ttlMs: number,
  create: () => Promise<T>,
  shouldCache: (value: T) => boolean = () => true,
): Promise<{ status: AiCacheStatus; value: T }> {
  const state = runtimeState()
  const cached = state.cache.get(key) as T | undefined
  if (cached !== undefined) return { status: "hit", value: cached }

  const pending = state.pending.get(key) as Promise<T> | undefined
  if (pending) return { status: "shared", value: await pending }

  const promise = create()
    .then((value) => {
      if (shouldCache(value)) state.cache.set(key, value, ttlMs)
      return value
    })
    .finally(() => {
      state.pending.delete(key)
    })
  state.pending.set(key, promise as Promise<unknown>)
  return { status: "miss", value: await promise }
}

export function aiCacheTtlMs(endpoint: AiEndpoint): number {
  const fallback = endpoint === "commentary" ? 604_800 : 86_400
  const seconds = envInt(
    endpoint === "commentary"
      ? "AI_COMMENTARY_CACHE_TTL_SECONDS"
      : "AI_ANALYSIS_CACHE_TTL_SECONDS",
    fallback,
    60,
    2_592_000,
  )
  return seconds * 1_000
}
