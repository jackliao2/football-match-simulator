import { describe, expect, it } from "vitest"
import { join } from "node:path"
import { tmpdir } from "node:os"
import { FixedWindowRateLimiter, TtlCache, withAiCache } from "@/lib/ai/guard"
import { consumeDailyQuota } from "@/lib/ai/quota-store"

describe("AI rate limiting", () => {
  it("blocks requests after the fixed-window allowance and resets later", () => {
    const limiter = new FixedWindowRateLimiter(2, 1_000)

    expect(limiter.consume("analysis:visitor", 10_000)).toMatchObject({
      allowed: true,
      remaining: 1,
    })
    expect(limiter.consume("analysis:visitor", 10_100)).toMatchObject({
      allowed: true,
      remaining: 0,
    })
    expect(limiter.consume("analysis:visitor", 10_200)).toMatchObject({
      allowed: false,
      remaining: 0,
    })
    expect(limiter.consume("analysis:visitor", 11_001)).toMatchObject({
      allowed: true,
      remaining: 1,
    })
  })
})

describe("AI response caching", () => {
  it("bypasses storage and request deduplication when disabled", async () => {
    let calls = 0
    const create = async () => {
      calls += 1
      return `report-${calls}`
    }

    const first = await withAiCache("disabled", 0, create)
    const second = await withAiCache("disabled", 0, create)

    expect(calls).toBe(2)
    expect(first).toEqual({ status: "miss", value: "report-1" })
    expect(second).toEqual({ status: "miss", value: "report-2" })
  })

  it("expires values after their TTL", () => {
    const cache = new TtlCache<string>()
    cache.set("report", "cached", 500, 1_000)

    expect(cache.get("report", 1_499)).toBe("cached")
    expect(cache.get("report", 1_500)).toBeUndefined()
  })

  it("deduplicates concurrent provider requests", async () => {
    const key = `test:${crypto.randomUUID()}`
    let calls = 0
    let release: (() => void) | undefined
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const create = async () => {
      calls += 1
      await gate
      return "report"
    }

    const first = withAiCache(key, 1_000, create)
    const second = withAiCache(key, 1_000, create)
    release?.()
    const [a, b] = await Promise.all([first, second])

    expect(calls).toBe(1)
    expect(a.value).toBe("report")
    expect(b.value).toBe("report")
    expect([a.status, b.status].sort()).toEqual(["miss", "shared"])
  })
})

describe("AI daily quota file", () => {
  it("blocks a visitor after the daily cap and allows a different IP", async () => {
    process.env.AI_DAILY_QUOTA_ENABLED = "true"
    process.env.AI_DAILY_QUOTA_MAX = "2"
    process.env.AI_QUOTA_STORE_PATH = join(tmpdir(), `lm-quota-${crypto.randomUUID()}.json`)
    const ip = `203.0.113.${Math.floor(Math.random() * 200)}`
    const first = await consumeDailyQuota(ip)
    const second = await consumeDailyQuota(ip)
    const third = await consumeDailyQuota(ip)
    const other = await consumeDailyQuota("198.51.100.9")
    expect(first.allowed).toBe(true)
    expect(second.allowed).toBe(true)
    expect(third.allowed).toBe(false)
    expect(third.remaining).toBe(0)
    expect(other.allowed).toBe(true)
  })
})
