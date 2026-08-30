import { describe, expect, it } from "vitest"
import { parseCatalogTrophy } from "@/lib/catalog-filters"
import { FEATURED_MATCHUPS, HOMEPAGE_MATCHUPS, isFeaturedMatchup, todaysDebate } from "@/data/matchups"
import { canonicalVsSlug } from "@/lib/match-id"
import { getTeam } from "@/data/teams"
import { matchShareCopy } from "@/lib/share"

describe("todays debate and featured matchups", () => {
  it("rotates through featured pairs and stays inside the catalogue", () => {
    const first = todaysDebate(new Date("2026-08-30T00:00:00Z"))
    const later = todaysDebate(new Date("2026-08-31T00:00:00Z"))
    expect(first).not.toEqual(later)
    for (const id of [...first, ...later]) {
      expect(getTeam(id), id).toBeDefined()
    }
  })

  it("publishes the homepage default Clásico pairing", () => {
    expect(isFeaturedMatchup("barcelona-2008-09", "real-madrid-2016-17")).toBe(true)
    expect(canonicalVsSlug("barcelona-2008-09", "real-madrid-2016-17")).toBe(
      "barcelona-2008-09-vs-real-madrid-2016-17",
    )
    expect(FEATURED_MATCHUPS.length).toBeGreaterThan(HOMEPAGE_MATCHUPS.length)
  })
})

describe("catalog trophy filters", () => {
  it("accepts shareable aliases and rejects unknown values", () => {
    expect(parseCatalogTrophy("clubs", "ucl")).toBe("europe")
    expect(parseCatalogTrophy("clubs", "treble")).toBe("treble")
    expect(parseCatalogTrophy("nations", "world-cup")).toBe("world")
    expect(parseCatalogTrophy("clubs", "nope")).toBe("all")
    expect(parseCatalogTrophy("nations", undefined)).toBe("all")
  })
})

describe("share copy", () => {
  it("puts the scoreline in the title", () => {
    const copy = matchShareCopy("Barcelona", "2008/09", 1, "Real Madrid", "2016/17", 1)
    expect(copy.title).toBe("Barcelona 2008/09 1-1 Real Madrid 2016/17")
    expect(copy.text).toContain("would you have called it")
  })
})
