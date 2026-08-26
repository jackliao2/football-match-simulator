import { describe, expect, it } from "vitest"
import { FixedWindowRateLimiter, TtlCache, withAiCache } from "@/lib/ai/guard"

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
