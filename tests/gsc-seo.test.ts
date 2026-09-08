import { describe, expect, it } from "vitest"
import nextConfig from "../next.config"
import robots from "@/app/robots"
import { CLUB_COMPARES, compareFaqs, compareSearchDescription } from "@/data/compare"
import { getPrimeEntity } from "@/data/prime"
import { getPrimeEditorial } from "@/data/prime-editorial"
import { isIndexableTeamPage } from "@/data/team-editorial"
import { getTeam } from "@/data/teams"
import { teamH1, teamPageCopy } from "@/lib/page-copy"
import { informalSeason, isCurrentSquad, modelledCurrentSquadNote, squadKeywords } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site"

describe("GSC landing pages", () => {
  it("keeps match permalinks out of robots crawl budget", () => {
    const policy = robots()
    const rules = Array.isArray(policy.rules) ? policy.rules[0] : policy.rules
    expect(rules?.disallow).toEqual(expect.arrayContaining(["/api/", "/match/"]))
  })

  it("slows SEO crawlers without changing the default robots rule", () => {
    const policy = robots()
    const rules = Array.isArray(policy.rules) ? policy.rules : [policy.rules]
    expect(rules[0]?.userAgent).toBe("*")
    const seo = rules.find(
      (rule) => Array.isArray(rule?.userAgent) && rule.userAgent.includes("SemrushBot"),
    )
    expect(seo?.userAgent).toEqual(expect.arrayContaining(["SemrushBot", "AhrefsBot", "MJ12bot", "DotBot"]))
    expect(seo?.crawlDelay).toBe(10)
    expect(seo?.disallow).toEqual(expect.arrayContaining(["/api/", "/match/"]))
    expect(seo?.disallow).not.toEqual(expect.arrayContaining(["/simulate"]))
  })

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
    expect(milan.seoTitle).toBe("AC Milan vs Inter Milan: Who Is Better?")
    expect(compareSearchDescription(milan)).toMatch(/^Milan across European history/)
    expect(compareSearchDescription(milan)).toMatch(/AC Milan 1988\/89/)
  })

  it("gives the Clasico comparison a result-oriented search snippet", () => {
    const clasico = CLUB_COMPARES.find((pair) => pair.slug === "barcelona-vs-real-madrid")!
    expect(clasico.seoTitle).toBe("Barcelona vs Real Madrid: Who Is Better?")
    expect(compareSearchDescription(clasico)).toMatch(/^Real Madrid all-time/)
    expect(compareSearchDescription(clasico)).toMatch(/our answer is Real Madrid/)
  })

  it("answers who-is-better in every compare snippet and FAQ", () => {
    for (const pair of CLUB_COMPARES) {
      const snippet = compareSearchDescription(pair)
      expect(snippet.startsWith(pair.verdictHeading), pair.slug).toBe(true)
      const faqs = compareFaqs(pair, "Left", "Right", "Left peak", "Right peak")
      expect(faqs[0]?.q).toMatch(/Who is better/)
      expect(faqs[0]?.a).toContain(pair.verdictHeading)
      expect(faqs.some((item) => item.q.startsWith("Can I simulate"))).toBe(true)
    }
  })

  it("indexes the GSC-follow-up season pages with their own dossiers", () => {
    for (const id of ["everton-1984-85", "chelsea-2011-12", "senegal-2002", "croatia-2018"]) {
      expect(getTeam(id), id).toBeDefined()
      expect(isIndexableTeamPage(id), id).toBe(true)
      expect(teamPageCopy(getTeam(id)!).h1.toLowerCase()).toContain("squad")
    }
  })

  it("indexes the 2026-09-08 historic-season batch", () => {
    for (const id of [
      "bayern-munich-2019-20",
      "juventus-2016-17",
      "porto-2003-04",
      "spain-2012",
      "portugal-2016",
      "uruguay-1950",
    ]) {
      expect(getTeam(id), id).toBeDefined()
      expect(isIndexableTeamPage(id), id).toBe(true)
      expect(teamPageCopy(getTeam(id)!).h1.toLowerCase()).toContain("squad")
    }
  })

  it("indexes the follow-up historic-season dossier batch", () => {
    for (const id of [
      "arsenal-1997-98",
      "juventus-2002-03",
      "inter-milan-1988-89",
      "paris-saint-germain-2017-18",
      "tottenham-2016-17",
      "aston-villa-1981-82",
      "benfica-1961-62",
      "red-star-1990-91",
      "valencia-2003-04",
      "denmark-1992",
      "greece-2004",
      "brazil-1962",
    ]) {
      expect(getTeam(id), id).toBeDefined()
      expect(isIndexableTeamPage(id), id).toBe(true)
      expect(teamPageCopy(getTeam(id)!).h1.toLowerCase()).toContain("squad")
    }
  })

  it("labels modelled current squads as modelled", () => {
    const club = getTeam("arsenal-2025-26")!
    const nation = getTeam("brazil-2026")!
    expect(isCurrentSquad(club)).toBe(true)
    expect(isCurrentSquad(nation)).toBe(true)
    expect(modelledCurrentSquadNote(club)).toMatch(/modelled current-season/)
    expect(modelledCurrentSquadNote(nation)).toMatch(/modelled tournament-cycle/)
    expect(modelledCurrentSquadNote(getTeam("england-2026")!)).toMatch(/modelled/)
  })

  it("publishes Brazil vs Argentina and England vs Germany as nation compares", () => {
    const brazil = CLUB_COMPARES.find((pair) => pair.slug === "brazil-vs-argentina")!
    const england = CLUB_COMPARES.find((pair) => pair.slug === "england-vs-germany")!
    expect(brazil.kind).toBe("nation")
    expect(england.kind).toBe("nation")
    expect(brazil.verdict[0].length).toBeGreaterThan(120)
    expect(england.verdict[1]).toMatch(/1966/)
  })

  it("uses short-season titles on Arsenal 03/04 and Liverpool 04/05", () => {
    expect(teamPageCopy(getTeam("arsenal-2003-04")!).title).toMatch(/03\/04/)
    expect(teamPageCopy(getTeam("liverpool-2004-05")!).title).toMatch(/04\/05/)
  })

  it("publishes a Liverpool prime page with a real case and counter-case", () => {
    const page = getPrimeEntity("liverpool")
    const editorial = getPrimeEditorial("liverpool")
    expect(page?.seoTitle.toLowerCase()).toContain("liverpool")
    expect(editorial?.sections?.length).toBeGreaterThanOrEqual(3)
    expect(editorial!.caseFor).toMatch(/2018\/19/)
    expect(editorial!.counterCase).toMatch(/2004\/05|Istanbul/)
  })

  it("keeps reciprocal hreflang on English and Spanish simulate pages", async () => {
    const { languageAlternates } = await import("@/lib/i18n")
    const langs = languageAlternates("/simulate", ["es"])
    expect(langs.en).toMatch(/\/simulate$/)
    expect(langs.es).toMatch(/\/es\/simulate$/)
    expect(langs["pt-BR"]).toBeUndefined()
    expect(langs["x-default"]).toBe(langs.en)
  })

  it("sends HSTS and HTML edge-cache headers, and keeps simulate/API uncached", async () => {
    const headers = await nextConfig.headers!()
    const all = headers.find((rule) => rule.source === "/(.*)")
    expect(all?.headers.some((item) => item.key === "Strict-Transport-Security")).toBe(true)
    const homepage = headers.find((rule) => rule.source === "/")
    expect(homepage?.headers.some((item) => item.key === "CDN-Cache-Control")).toBe(true)
    const search = headers.find((rule) => rule.source === "/search")
    expect(search?.headers.some((item) => item.key === "CDN-Cache-Control")).toBe(true)
    const simulate = headers.find((rule) => rule.source === "/simulate")
    expect(simulate?.headers).toEqual([{ key: "Cache-Control", value: "private, no-store" }])
    const api = headers.find((rule) => rule.source === "/api/:path*")
    expect(api?.headers).toEqual([{ key: "Cache-Control", value: "private, no-store" }])
  })

  it("declares a WebSite SearchAction pointing at /search", async () => {
    const { websiteJsonLd } = await import("@/lib/seo")
    const graph = websiteJsonLd()["@graph"] as Array<Record<string, unknown>>
    const site = graph.find((node) => node["@type"] === "WebSite") as {
      potentialAction?: { target?: { urlTemplate?: string } }
    }
    expect(site.potentialAction?.target?.urlTemplate).toBe("https://legendarymatch.com/search?q={search_term_string}")
  })

  it("lists /search in the sitemap and stamps content pages with a later date than legal pages", async () => {
    const { default: sitemap } = await import("@/app/sitemap")
    const { SITE } = await import("@/lib/site")
    const routes = sitemap()
    const search = routes.find((route) => route.url.endsWith("/search"))
    const privacy = routes.find((route) => route.url.endsWith("/privacy"))
    const compare = routes.find((route) => route.url.endsWith("/compare/barcelona-vs-real-madrid"))
    expect(search?.lastModified).toBe(SITE.contentUpdatedIso)
    expect(privacy?.lastModified).toBe(SITE.legalUpdatedIso)
    expect(compare?.lastModified).toBe(SITE.contentUpdatedIso)
    expect(SITE.contentUpdatedIso > SITE.legalUpdatedIso).toBe(true)
  })
})
