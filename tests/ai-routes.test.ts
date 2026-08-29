import { describe, expect, it } from "vitest"
import { POST as analyse } from "@/app/api/analysis/route"
import { POST as commentate } from "@/app/api/commentary/route"

function jsonRequest(path: string, body: unknown, ip = crypto.randomUUID()) {
  return new Request(`https://example.test${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": ip,
    },
    body: JSON.stringify(body),
  })
}

describe("AI route handlers", () => {
  it("returns a fresh protected pre-match analysis without an API key", async () => {
    const response = await analyse(
      jsonRequest("/api/analysis", {
        awayId: "real-madrid-2016-17",
        homeId: "barcelona-2008-09",
      }),
    )
    const body = (await response.json()) as {
      analysis?: { copy?: { headline?: string; decidingSequence?: string }; featuredMatch?: { seed?: string }; simulation?: { runs?: number } }
      source?: string
    }

    expect(response.status).toBe(200)
    expect(Number(response.headers.get("X-RateLimit-Limit"))).toBeGreaterThan(0)
    expect(response.headers.get("X-AI-Cache")).toBe("disabled")
    expect(body.source).toBe("template")
    expect(body.analysis?.copy?.headline?.length).toBeGreaterThan(20)
    expect(body.analysis?.copy?.decidingSequence?.length).toBeGreaterThan(40)
    expect(body.analysis?.simulation?.runs).toBe(100)

    const repeat = await analyse(
      jsonRequest("/api/analysis", {
        awayId: "real-madrid-2016-17",
        homeId: "barcelona-2008-09",
      }),
    )
    const repeatedBody = (await repeat.json()) as { analysis?: { featuredMatch?: { seed?: string } } }
    expect(repeat.headers.get("X-AI-Cache")).toBe("disabled")
    expect(repeatedBody.analysis?.featuredMatch?.seed).not.toBe(body.analysis?.featuredMatch?.seed)
  })

  it("reuses a deterministic match report", async () => {
    const matchId = "barcelona-2008-09-vs-real-madrid-2016-17-a71d92"
    const first = await commentate(jsonRequest("/api/commentary", { matchId }))
    const second = await commentate(jsonRequest("/api/commentary", { matchId }))
    const body = (await second.json()) as { report?: string; source?: string }

    expect(first.status).toBe(200)
    expect(second.status).toBe(200)
    expect(second.headers.get("X-AI-Cache")).toBe("hit")
    expect(body.source).toBe("template")
    expect(body.report?.length).toBeGreaterThan(80)
  })

  it("rejects malformed JSON before generation", async () => {
    const response = await analyse(
      new Request("https://example.test/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Forwarded-For": crypto.randomUUID() },
        body: "{not-json",
      }),
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: "Request body must be valid JSON" })
  })
})
