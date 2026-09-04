import { describe, expect, it } from "vitest"
import nextConfig from "../next.config"
import { CLUB_COMPARES } from "@/data/compare"
import { isIndexableTeamPage } from "@/data/team-editorial"
import { getTeam } from "@/data/teams"
import { teamH1, teamPageCopy } from "@/lib/page-copy"
import { informalSeason, squadKeywords } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site"

describe("GSC landing pages", () => {
  it("sends www homepage to the apex host", async () => {
    const redirects = await nextConfig.redirects!()
    const wwwHome = redirects.find(
      (rule) => rule.source === "/" && rule.has?.some((item) => item.value === "www.legendarymatch.com"),
    )
    expect(wwwHome?.destination).toBe("https://legendarymatch.com/")
    expect(wwwHome?.permanent).toBe(true)
  })

  it("keeps canonicals on the apex host even if SITE_URL is www", () => {
    expect(getSiteUrl()).not.toMatch(/www\./i)
  })

  it("targets Chelsea 04/05 query variants on the 2004/05 squad page", () => {
    const team = getTeam("chelsea-2004-05")!
    const keys = squadKeywords(team)
    expect(informalSeason(team)).toBe("04/05")
    expect(keys).toEqual(expect.arrayContaining(["chelsea 04 05", "chelsea 04/05 squad", "chelsea fc 2004 squad"]))
    const copy = teamPageCopy(team)
    expect(copy.title.toLowerCase()).toContain("04/05")
    expect(copy.h1.toLowerCase()).toContain("squad")
    expect(copy.description.toLowerCase()).toMatch(/04\/05|2004\/05/)
    expect(isIndexableTeamPage(team.id)).toBe(true)
  })

  it("indexes England 2026 as a squad page, not a noindex stub", () => {
    const team = getTeam("england-2026")!
    expect(isIndexableTeamPage(team.id)).toBe(true)
    expect(teamH1(team).toLowerCase()).toBe("england 2026 squad")
    const keys = squadKeywords(team)
    expect(keys).toEqual(
      expect.arrayContaining([
        "england squad 2026",
        "england 2026 national team",
        "england national football team 2026",
      ]),
    )
    const copy = teamPageCopy(team)
    expect(copy.title.toLowerCase()).toContain("england 2026 squad")
  })

  it("puts who-is-better language on the Milan compare pair", () => {
    const milan = CLUB_COMPARES.find((pair) => pair.slug === "ac-milan-vs-inter-milan")!
    expect(milan.keywords.join(" ")).toMatch(/who is better/)
    expect(milan.title.toLowerCase()).toMatch(/who is better/)
  })
})
