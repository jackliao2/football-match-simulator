import { describe, expect, it } from "vitest"
import {
  buildMatchId,
  canonicalVsSlug,
  parseMatchId,
  parseVsSlug,
} from "@/lib/match-id"

describe("match ids", () => {
  it("round-trips team ids that contain hyphens", () => {
    const id = buildMatchId("manchester-united-1998-99", "real-madrid-2016-17", "a71d92")

    expect(parseMatchId(id)).toEqual({
      awayId: "real-madrid-2016-17",
      homeId: "manchester-united-1998-99",
      seed: "a71d92",
    })
  })

  it("rejects malformed or unsafe seeds", () => {
    expect(parseMatchId("barcelona-vs-real-madrid-not-a-seed")).toBeNull()
    expect(parseMatchId("barcelona-vs-real-madrid-ABC123")).toBeNull()
    expect(parseMatchId("missing-separator")).toBeNull()
  })

  it("creates one canonical URL for a matchup", () => {
    const forward = canonicalVsSlug("barcelona-2008-09", "real-madrid-2016-17")
    const reverse = canonicalVsSlug("real-madrid-2016-17", "barcelona-2008-09")

    expect(reverse).toBe(forward)
    expect(parseVsSlug(forward)).toEqual({
      awayId: "real-madrid-2016-17",
      homeId: "barcelona-2008-09",
    })
  })
})
