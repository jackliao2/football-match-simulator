import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import { crestRects } from "@/components/teams/PixelCrest"
import { CLUB_COMPARES } from "@/data/compare"
import {
  FEATURED_MATCHUPS,
  allVsPairs,
  isFeaturedMatchup,
  isPublishedMatchup,
} from "@/data/matchups"
import { getClub } from "@/data/clubs"
import { getTeam, teams } from "@/data/teams"
import { searchCatalog, TEAM_CATALOG } from "@/data/team-catalog"

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

describe("pixel flags and brand mark", () => {
  it("merges flag pixels into run-length SVG rects", async () => {
    const { flagRects } = await import("@/components/teams/PixelFlag")
    const rects = flagRects("BR")
    expect(rects.length).toBeGreaterThan(3)
    expect(rects.length).toBeLessThan(96)
    expect(rects.every((rect) => rect.w >= 1)).toBe(true)
  })

  it("skips transparent brand-mark cells when building SVG rects", async () => {
    const { brandRects, BRAND_MARK_SIZE } = await import("@/lib/brand-mark")
    const rects = brandRects()
    expect(rects.length).toBeGreaterThan(8)
    expect(rects.length).toBeLessThan(BRAND_MARK_SIZE * BRAND_MARK_SIZE)
    expect(rects.every((rect) => rect.color.startsWith("#"))).toBe(true)
  })
})

describe("slim team catalog", () => {
  it("covers every playable squad without embedding players", () => {
    expect(TEAM_CATALOG).toHaveLength(teams.length)
    expect(TEAM_CATALOG.every((entry) => !("players" in entry) || !Array.isArray((entry as { players?: unknown }).players))).toBe(true)
    const chelsea = searchCatalog("chelsea 04/05")
    expect(chelsea.some((entry) => entry.id === "chelsea-2004-05")).toBe(true)
    const brazil = searchCatalog("brazil 1970")
    expect(brazil[0]?.id).toBe("brazil-1970")
  })

  it("keeps full squads out of the simulator and catalog client modules", () => {
    const setup = readFileSync("components/simulator/MatchSetup.tsx", "utf8")
    const picker = readFileSync("components/simulator/ClubPicker.tsx", "utf8")
    const catalog = readFileSync("components/teams/FilteredCatalog.tsx", "utf8")
    expect(setup).not.toMatch(/from ["']@\/data\/teams["']/)
    expect(setup).not.toMatch(/from ["']@\/data\/team-catalog["']/)
    expect(picker).not.toMatch(/from ["']@\/data\/teams["']/)
    expect(catalog).not.toMatch(/from ["']@\/data\/teams["']/)
  })
})
