import { describe, expect, it } from "vitest"
import sitemap from "@/app/sitemap"
import { SEARCH_PRIORITY_RECORDS, PRIORITY_REVIEW_DATE } from "@/data/search-priority"
import { getTeam } from "@/data/teams"
import { getPrimeEditorial } from "@/data/prime-editorial"
import { HUB_COPY } from "@/data/hub-copy"
import { writtenMatchupEditorial } from "@/data/vs-editorial"

const reviewedPaths = [
  "/teams/chelsea/2004-05",
  "/teams/barcelona/2008-09",
  "/national-teams/france/2018",
  "/national-teams/netherlands/1988",
  "/national-teams/italy/2006",
  "/compare/ac-milan-vs-inter-milan",
  "/compare/manchester-united-vs-liverpool",
  "/compare/barcelona-vs-real-madrid",
  "/compare/real-madrid-vs-atletico-madrid",
]

describe("priority content review", () => {
  it("publishes all reviewed records with consistent tables, sources and canonical sitemap entries", () => {
    const routes = sitemap()
    expect(Object.keys(SEARCH_PRIORITY_RECORDS).sort()).toEqual([...reviewedPaths].sort())
    for (const path of reviewedPaths) {
      const record = SEARCH_PRIORITY_RECORDS[path]!
      expect(record.sources.length, path).toBeGreaterThanOrEqual(2)
      expect(record.sources.every((source) => new URL(source.url).protocol === "https:"), path).toBe(true)
      expect(record.rows.every((row) => row.length === record.columns.length), path).toBe(true)
      expect(new Set(record.rows.map((row) => row[0])).size, path).toBe(record.rows.length)
      expect(new Set(record.faqs.map((faq) => faq.q)).size, path).toBe(record.faqs.length)
      const route = routes.filter((item) => new URL(item.url).pathname === path)
      expect(route, path).toHaveLength(1)
      expect(route[0]?.lastModified, path).toBe(PRIORITY_REVIEW_DATE)
    }
    expect(routes.find((item) => item.url.endsWith("/prime/real-madrid"))?.lastModified).toBe(PRIORITY_REVIEW_DATE)
  })

  it("keeps full historical rosters separate from the smaller playable selections", () => {
    for (const [nation, season, fullCount, modelCount] of [
      ["france", "2018", 23, 20],
      ["netherlands", "1988", 20, 16],
      ["italy", "2006", 23, 19],
    ] as const) {
      const record = SEARCH_PRIORITY_RECORDS[`/national-teams/${nation}/${season}`]!
      const team = getTeam(`${nation}-${season}`)!
      expect(record.rows, nation).toHaveLength(fullCount)
      expect(team.players, nation).toHaveLength(modelCount)
      expect(team.startingXI, nation).toHaveLength(11)
      expect(team.startingXI.every((id) => team.players.some((player) => player.id === id)), nation).toBe(true)
    }
    expect(SEARCH_PRIORITY_RECORDS["/national-teams/netherlands/1988"]!.rows.filter((row) => row[2] === "Yes")).toHaveLength(11)
    expect(getTeam("netherlands-1988")!.players.some((player) => /Fraser|Huistra/.test(player.name))).toBe(false)
    expect(getTeam("italy-2006")!.players.some((player) => /Pessotto/.test(player.name))).toBe(false)
    for (const path of ["/national-teams/france/2018", "/national-teams/italy/2006"]) {
      expect(SEARCH_PRIORITY_RECORDS[path]!.rows.map((row) => Number(row[0]))).toEqual(Array.from({ length: 23 }, (_, i) => i + 1))
    }
  })

  it("does not propagate the incorrect third-successive title claim for Madrid 2016/17", () => {
    const madrid = getTeam("real-madrid-2016-17")!
    const lead = writtenMatchupEditorial(getTeam("barcelona-2008-09")!, madrid)!
    expect([madrid.seoTitle, madrid.seoDescription, lead].join(" ")).not.toMatch(/third (straight|consecutive)/i)
    expect(HUB_COPY["real-madrid"]!.lead).toContain("second successive")
    expect(getPrimeEditorial("real-madrid")!.sources?.length).toBeGreaterThan(0)
    expect(getPrimeEditorial("real-madrid")!.caseFor).toContain("93 points")
  })
})
