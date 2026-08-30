import { describe, expect, it } from "vitest"
import { crestRects } from "@/components/teams/PixelCrest"
import { CLUB_COMPARES } from "@/data/compare"
import {
  FEATURED_MATCHUPS,
  allVsPairs,
  isFeaturedMatchup,
  isPublishedMatchup,
} from "@/data/matchups"
import { getClub } from "@/data/clubs"
import { getTeam } from "@/data/teams"

describe("published dream matches", () => {
  it("indexes the handwritten featured card and does not dump filler who-would-win pages", () => {
    const pairs = allVsPairs()
    expect(pairs.length).toBe(FEATURED_MATCHUPS.length)
    expect(pairs.length).toBeGreaterThanOrEqual(20)
    expect(pairs.length).toBeLessThanOrEqual(40)
  })

  it("only publishes pairs whose team IDs exist", () => {
    for (const [homeId, awayId] of allVsPairs()) {
      expect(getTeam(homeId), homeId).toBeDefined()
      expect(getTeam(awayId), awayId).toBeDefined()
      expect(homeId).not.toBe(awayId)
    }
  })

  it("keeps the 2008/09 Clásico featured and every featured pair published", () => {
    expect(isFeaturedMatchup("barcelona-2008-09", "real-madrid-2016-17")).toBe(true)
    expect(isPublishedMatchup("barcelona-2008-09", "real-madrid-2016-17")).toBe(true)
    for (const [home, away] of FEATURED_MATCHUPS) {
      expect(isPublishedMatchup(home, away), `${home} vs ${away}`).toBe(true)
    }
  })
})

describe("club compare pages", () => {
  it("covers a full set of unique club pairs with real peak squads", () => {
    expect(CLUB_COMPARES.length).toBeGreaterThanOrEqual(20)
    expect(CLUB_COMPARES.length).toBeLessThanOrEqual(40)
    const slugs = new Set<string>()
    for (const pair of CLUB_COMPARES) {
      expect(slugs.has(pair.slug), pair.slug).toBe(false)
      slugs.add(pair.slug)
      expect(getClub(pair.leftClubId), pair.leftClubId).toBeDefined()
      expect(getClub(pair.rightClubId), pair.rightClubId).toBeDefined()
      expect(getTeam(pair.leftPeakId), pair.leftPeakId).toBeDefined()
      expect(getTeam(pair.rightPeakId), pair.rightPeakId).toBeDefined()
      expect(pair.verdict[0].length).toBeGreaterThan(80)
      expect(pair.verdict[1].length).toBeGreaterThan(80)
      expect(pair.rows.length).toBeGreaterThanOrEqual(3)
    }
  })
})

describe("pixel crests", () => {
  it("merges adjacent pixels into fewer SVG rects than a 16×16 grid", () => {
    const rects = crestRects("barcelona")
    expect(rects.length).toBeGreaterThan(8)
    expect(rects.length).toBeLessThan(256)
    expect(rects.every((rect) => rect.w >= 1 && rect.color !== "transparent")).toBe(true)
  })
})
