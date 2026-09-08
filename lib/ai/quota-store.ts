import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { tmpdir } from "node:os"

export type DailyQuotaResult = {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
}

type QuotaFile = {
  days: Record<string, Record<string, number>>
}

function envInt(name: string, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(process.env[name] ?? "", 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(min, Math.min(max, parsed))
}

export function utcDayKey(now = Date.now()) {
  return new Date(now).toISOString().slice(0, 10)
}

export function dailyQuotaLimit() {
  return envInt("AI_DAILY_QUOTA_MAX", 20, 1, 1_000)
}

export function dailyQuotaEnabled() {
  return process.env.AI_DAILY_QUOTA_ENABLED !== "false"
}

export function quotaStorePath() {
  if (process.env.AI_QUOTA_STORE_PATH) return process.env.AI_QUOTA_STORE_PATH
  if (process.env.VITEST) return join(tmpdir(), `legendarymatch-ai-quota-${process.pid}.json`)
  return join(process.cwd(), ".data", "ai-quota.json")
}

let chain = Promise.resolve()

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn)
  chain = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}

async function readStore(path: string): Promise<QuotaFile> {
  try {
    const parsed = JSON.parse(await readFile(path, "utf8")) as QuotaFile
    if (!parsed || typeof parsed !== "object" || !parsed.days) return { days: {} }
    return parsed
  } catch {
    return { days: {} }
  }
}

export async function consumeDailyQuota(ip: string, now = Date.now()): Promise<DailyQuotaResult> {
  const cap = dailyQuotaLimit()
  const day = utcDayKey(now)
  const resetAt = Date.parse(`${day}T00:00:00.000Z`) + 86_400_000
  if (!dailyQuotaEnabled()) {
    return { allowed: true, limit: cap, remaining: cap, resetAt }
  }

  const key = ip.trim() || "unknown"
  return withLock(async () => {
    const path = quotaStorePath()
    await mkdir(dirname(path), { recursive: true })
    const store = await readStore(path)
    for (const old of Object.keys(store.days)) {
      if (old < day) delete store.days[old]
    }
    const today = store.days[day] ?? {}
    const used = today[key] ?? 0
    if (used >= cap) {
      return { allowed: false, limit: cap, remaining: 0, resetAt }
    }
    today[key] = used + 1
    store.days[day] = today
    await writeFile(path, JSON.stringify(store), "utf8")
    return {
      allowed: true,
      limit: cap,
      remaining: Math.max(0, cap - today[key]!),
      resetAt,
    }
  })
}
