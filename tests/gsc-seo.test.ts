import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import nextConfig from "../next.config"
import robots from "@/app/robots"
import { CLUB_COMPARES, compareFaqs, compareSearchDescription, compareSeoTitle } from "@/data/compare"
import { clubs, getClub, nations } from "@/data/clubs"
import { HUB_COPY } from "@/data/hub-copy"
import { getPrimeEntity, primeEntities } from "@/data/prime"
import { getPrimeEditorial } from "@/data/prime-editorial"
import { isIndexableTeamPage, getTeamEditorial } from "@/data/team-editorial"
import { getTeam, getTeamsByClub, teams } from "@/data/teams"
import { FEATURED_MATCHUPS } from "@/data/matchups"
import { matchupFeature } from "@/data/vs-editorial"
import { ABOUT_PAGE, BEST_TEAM, COMPARE_HUB, HOME_PAGE, HOME_SECTIONS, METHODOLOGY_PAGE, NATIONS_HUB, PRIME_HUB, SEARCH_PAGE, SIMULATE_PAGE, TEAMS_HUB, VS_HUB } from "@/data/collection-copy"
import { orgHubCopy, firstSentence, teamH1, teamPageCopy, vsPageCopy } from "@/lib/page-copy"
import { compareOgCopy, teamOgCopy } from "@/lib/og-copy"
import { informalSeason, isCurrentSquad, modelledCurrentSquadNote, squadKeywords } from "@/lib/seo"
import { teamFaqs } from "@/lib/team-faqs"
import { SEARCH_YEAR_NOTES } from "@/components/teams/HistoricalTeamView"
import { getSiteUrl, SITE } from "@/lib/site"

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
    expect(copy.h1).toBe(copy.title)
    expect(copy.h1.toLowerCase()).toContain("squad")
    expect(copy.dossierHeading).toMatch(/Chelsea 2004\/05/)
    expect(copy.faqHeading).toMatch(/Chelsea 2004\/05/)
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
    expect(copy.h1).toBe(copy.title)
    expect(copy.h1.toLowerCase()).not.toBe("england 2026 squad")
  })

  it("puts who-is-better language on the Milan compare pair", () => {
    const milan = CLUB_COMPARES.find((pair) => pair.slug === "ac-milan-vs-inter-milan")!
    expect(milan.keywords.join(" ")).toMatch(/who is better/)
    expect(milan.title).toBe(milan.verdictHeading)
    expect(milan.title).toMatch(/Sacchi|2010|Europe/)
    expect(milan.title).not.toMatch(/Which Is Better/)
    expect(milan.seoTitle).toMatch(/Sacchi|2010/)
    expect(compareSearchDescription(milan)).toMatch(/^Milan across European history/)
    expect(compareSearchDescription(milan)).toMatch(/AC Milan 1988\/89/)
  })

  it("gives the Clasico comparison a result-oriented search snippet", () => {
    const clasico = CLUB_COMPARES.find((pair) => pair.slug === "barcelona-vs-real-madrid")!
    expect(clasico.seoTitle).toMatch(/2010\/11|All-Time/)
    expect(compareSearchDescription(clasico)).toMatch(/^Real Madrid all-time/)
    expect(compareSearchDescription(clasico)).toMatch(/our answer is Real Madrid/)
  })

  it("answers who-is-better in every compare snippet and FAQ", () => {
    const titles = new Set<string>()
    for (const pair of CLUB_COMPARES) {
      const snippet = compareSearchDescription(pair)
      expect(snippet.startsWith(pair.verdictHeading), pair.slug).toBe(true)
      const faqs = compareFaqs(pair, "Left", "Right", "Left peak", "Right peak")
      expect(faqs[0]?.q).toMatch(/Who is better/)
      expect(faqs[0]?.a).toContain(pair.verdictHeading)
      expect(faqs.some((item) => item.q.startsWith("What is the prime matchup"))).toBe(true)
      expect(faqs.some((item) => item.q.startsWith("Can I simulate"))).toBe(false)
      const seo = compareSeoTitle(pair, pair.leftClubId, pair.rightClubId)
      expect(seo, pair.slug).not.toMatch(/^Who Is Better, /)
      expect(pair.title, pair.slug).toBe(pair.verdictHeading)
      expect(pair.title, pair.slug).not.toMatch(/Which Is Better/)
      expect(pair.description, pair.slug).not.toMatch(
        /then simulate|simulate the peaks|in the football match simulator|simulated meeting of/i,
      )
      expect(titles.has(seo), seo).toBe(false)
      titles.add(seo)
    }
  })

  it("indexes the GSC-follow-up season pages with their own dossiers", () => {
    for (const id of ["everton-1984-85", "chelsea-2011-12", "senegal-2002", "croatia-2018"]) {
      expect(getTeam(id), id).toBeDefined()
      expect(isIndexableTeamPage(id), id).toBe(true)
      const team = getTeam(id)!
      const copy = teamPageCopy(team)
      expect(copy.h1).toBe(copy.title)
      expect(copy.h1.toLowerCase(), id).not.toBe(teamH1(team).toLowerCase())
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
      const team = getTeam(id)!
      const copy = teamPageCopy(team)
      expect(copy.h1).toBe(copy.title)
      expect(copy.h1.toLowerCase(), id).not.toBe(teamH1(team).toLowerCase())
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
      const team = getTeam(id)!
      const copy = teamPageCopy(team)
      expect(copy.h1).toBe(copy.title)
      expect(copy.h1.toLowerCase(), id).not.toBe(teamH1(team).toLowerCase())
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
    expect(modelledCurrentSquadNote(club)).not.toMatch(/starting XI|for the simulator/)
    expect(modelledCurrentSquadNote(nation)).not.toMatch(/starting XI/)
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

  it("does not reuse the factory squad title on any team page", () => {
    const titles = new Set<string>()
    for (const team of teams) {
      const copy = teamPageCopy(team)
      expect(copy.title, team.id).not.toMatch(/Squad, Lineup, Formation & Ratings/)
      expect(copy.description, team.id).not.toMatch(/^Explore the /)
      expect(copy.h1, team.id).toBe(copy.title)
      expect(copy.h1.toLowerCase(), team.id).not.toBe(teamH1(team).toLowerCase())
      expect(copy.dossierHeading, team.id).toMatch(team.displaySeason)
      expect(copy.faqHeading, team.id).toMatch(team.clubName)
      expect(copy.dossierHeading, team.id).toMatch(team.manager)
      expect(copy.faqHeading, team.id).not.toMatch(/— questions$/)
      expect(copy.dossierHeading, team.id).not.toMatch(/Why .+ mattered$/)
      if (isIndexableTeamPage(team.id)) {
        expect(copy.xiHeading, team.id).not.toBe("Starting XI")
        expect(copy.xiHeading, team.id).toMatch(team.displaySeason)
        expect(copy.benchHeading, team.id).not.toBe("Bench")
        expect(copy.ratingsHeading, team.id).not.toBe("Ratings")
        expect(copy.modelHeading, team.id).not.toBe("How the model treats this XI")
        expect(copy.tagsHeading, team.id).not.toBe("Style tags")
        expect(copy.honoursHeading, team.id).not.toBe("Achievements")
        expect(copy.formationHeading, team.id).not.toMatch(/^Formation /)
        expect(copy.simulateCta, team.id).not.toBe("Simulate this team")
      }
      expect(titles.has(copy.title), `${team.id} duplicates title: ${copy.title}`).toBe(false)
      titles.add(copy.title)
      if (isIndexableTeamPage(team.id)) {
        expect(copy.description, team.id).not.toMatch(/Starting XI, .+ ratings/)
        expect(copy.description, team.id).not.toMatch(/Simulate .+ against any era/i)
        expect(copy.title, team.id).not.toMatch(/Lineup & Players|Lineup, Players & Formation/)
      }
      if (isCurrentSquad(team)) {
        expect(copy.description, team.id).toMatch(/modelled/i)
      }
    }
  })

  it("gives Napoli 86/87, Italy 2006 and Barcelona 2010/11 specific titles", () => {
    expect(teamPageCopy(getTeam("napoli-1986-87")!).title).toMatch(/Maradona/i)
    expect(teamPageCopy(getTeam("italy-2006")!).title).toMatch(/Cannavaro|Pirlo|Lippi/)
    expect(teamPageCopy(getTeam("barcelona-2010-11")!).title).toMatch(/false nine|Wembley/i)
  })

  it("names packed indexable seasons instead of factory lineup chrome", () => {
    expect(teamPageCopy(getTeam("greece-2004")!).title).toMatch(/Rehhagel|Charisteas/)
    expect(teamPageCopy(getTeam("nottingham-forest-1979-80")!).title).toMatch(/Clough|Shilton/)
    expect(teamPageCopy(getTeam("aston-villa-1981-82")!).title).toMatch(/Withe|Cowans|Rotterdam/)
    expect(teamPageCopy(getTeam("senegal-2002")!).title).toMatch(/Diouf|Fadiga/)
    expect(teamPageCopy(getTeam("croatia-2018")!).title).toMatch(/Modrić|Rakitić/)
  })

  it("gives every club and nation hub a unique written title", () => {
    const titles = new Set<string>()
    const descriptions = new Set<string>()
    const kickers = new Set<string>()
    for (const org of [...clubs, ...nations]) {
      expect(HUB_COPY[org.id], org.id).toBeDefined()
      const copy = orgHubCopy(org, getTeamsByClub(org.id))
      expect(copy.title.toLowerCase(), org.id).not.toMatch(/playable years|in the simulator$/)
      expect(copy.description.toLowerCase(), org.id).not.toMatch(
        /\bplayable\b|simulate them|simulate either|then simulate|lineups?, ratings|in the simulator/,
      )
      expect(copy.kicker, org.id).not.toMatch(
        /^(La Liga|Premier League|Serie A|Bundesliga|Ligue 1|World Cups)$/,
      )
      expect(titles.has(copy.title), copy.title).toBe(false)
      expect(descriptions.has(copy.description), copy.description).toBe(false)
      expect(kickers.has(copy.kicker), copy.kicker).toBe(false)
      titles.add(copy.title)
      descriptions.add(copy.description)
      kickers.add(copy.kicker)
    }
  })

  it("gives featured vs pages a written kicker instead of Dream match", () => {
    const headings = new Set<string>()
    for (const [a, b] of FEATURED_MATCHUPS) {
      const home = getTeam(a)!
      const away = getTeam(b)!
      const copy = vsPageCopy(home, away, 100)
      expect(copy.kicker, `${a}-vs-${b}`).not.toBe("Dream match")
      expect(copy.sectionHeading).not.toMatch(/Two football ideas/)
      expect(copy.sectionHeading, `${a}-vs-${b}`).not.toMatch(/\d-\d-\d against/)
      expect(copy.description, `${a}-vs-${b}`).not.toMatch(/Compare the squads and \d+ simulated matches/)
      expect(copy.playHeading, `${a}-vs-${b}`).not.toMatch(/^Simulate /)
      expect(copy.snapshotHeading, `${a}-vs-${b}`).not.toMatch(/on the model$/)
      expect(copy.contextHeading, `${a}-vs-${b}`).not.toMatch(/as a football idea$/)
      expect(copy.faqHeading, `${a}-vs-${b}`).not.toMatch(/— FAQ$/)
      expect(copy.longReadKicker, `${a}-vs-${b}`).not.toBe("The long read")
      expect(copy.whyKicker, `${a}-vs-${b}`).not.toBe("Why this game")
      expect(copy.hingeKicker, `${a}-vs-${b}`).not.toBe("Tactical hinge")
      expect(copy.readingKicker, `${a}-vs-${b}`).not.toBe("Reading the game")
      expect(copy.snapshotKicker, `${a}-vs-${b}`).not.toBe("Rating snapshot")
      expect(copy.faqKicker, `${a}-vs-${b}`).not.toBe("FAQ")
      expect(copy.playKicker, `${a}-vs-${b}`).not.toBe("Your turn")
      expect(headings.has(copy.sectionHeading), copy.sectionHeading).toBe(false)
      headings.add(copy.sectionHeading)
      const feature = matchupFeature(home, away)
      expect(copy.title, `${a}-vs-${b}`).not.toMatch(/Who Would Win/)
      if (feature) {
        expect(copy.kicker).toBe(feature.title)
        expect(copy.title).toContain(feature.title)
      }
    }
  })

  it("writes current-squad FAQs as modelled, not official lineups", () => {
    const faqs = teamFaqs(getTeam("barcelona-2025-26")!, { runs: 100 })
    expect(faqs[0]?.q).toMatch(/official/)
    expect(faqs[0]?.a).toMatch(/modelled/i)
    expect(faqs[0]?.a).not.toMatch(/highest-rated names in this/)
    expect(faqs.some((item) => item.q.startsWith("How do I play"))).toBe(false)
  })

  it("keeps historic FAQs attached to the dossier, not a fill-in-the-blank", () => {
    const faqs = teamFaqs(getTeam("napoli-1986-87")!, { runs: 100 })
    expect(faqs[0]?.a).toMatch(/Maradona|scudetto|Diego/i)
    expect(faqs[0]?.a).not.toMatch(/lead the .+ under/)
    expect(faqs.some((item) => item.q.startsWith("How do I play"))).toBe(false)
  })

  it("writes indexable FAQ answers without factory XI labels", () => {
    for (const team of teams) {
      if (!isIndexableTeamPage(team.id)) continue
      const faqs = teamFaqs(team, { runs: 100 })
      expect(faqs.length, team.id).toBeGreaterThan(0)
      for (const item of faqs) {
        expect(item.a, `${team.id}: ${item.q}`).not.toMatch(/The labels on this XI/i)
        expect(item.a, `${team.id}: ${item.q}`).not.toMatch(/Style tags on this XI/i)
        expect(item.a, `${team.id}: ${item.q}`).not.toMatch(/lead the .+ under/)
        expect(item.a, `${team.id}: ${item.q}`).not.toMatch(/seeded simulations of this modelled matchup/)
      }
    }
  })

  it("drops factory starting-XI language from on-page year notes", () => {
    for (const [id, note] of Object.entries(SEARCH_YEAR_NOTES)) {
      expect(note, id).not.toMatch(/starting XI, formation/i)
      expect(note, id).not.toMatch(/preferred lineup/i)
      expect(note, id).not.toMatch(/modelled starting XI and formation/)
    }
    expect(getTeamEditorial("england-2026")?.intro).not.toMatch(/\bplayable\b/)
  })

  it("drops factory simulator tails from packed and current-squad descriptions", () => {
    for (const team of teams) {
      expect(team.seoDescription, team.id).not.toMatch(/Starting XI, .+ ratings in the simulator/)
      expect(team.seoDescription, team.id).not.toMatch(/squad, starting XI and ratings/)
      expect(team.seoDescription, team.id).not.toMatch(/\bplayable\b/)
      expect(team.seoDescription, team.id).not.toMatch(/in the simulator/)
      const copy = teamPageCopy(team)
      expect(copy.description, team.id).not.toMatch(/Starting XI, .+ ratings in the simulator/)
      expect(copy.title, team.id).not.toMatch(/lineup and formation/i)
      expect(copy.faqKicker, team.id).not.toBe("FAQ")
      expect(copy.dossierKicker, team.id).not.toMatch(/dossier$/i)
    }
  })

  it("publishes a Liverpool prime page with a real case and counter-case", () => {
    const page = getPrimeEntity("liverpool")
    const editorial = getPrimeEditorial("liverpool")
    expect(page?.seoTitle.toLowerCase()).toContain("liverpool")
    expect(page?.title).toMatch(/2018\/19/)
    expect(page?.pick).toBe("2018/19")
    expect(editorial?.sections?.length).toBeGreaterThanOrEqual(3)
    expect(editorial!.caseFor).toMatch(/2018\/19/)
    expect(editorial!.counterCase).toMatch(/2004\/05|Istanbul/)
  })

  it("gives collection hubs a named verdict instead of a factory query", () => {
    expect(PRIME_HUB.h1).not.toBe("When was their prime?")
    expect(PRIME_HUB.h1).toMatch(/2010\/11/)
    expect(PRIME_HUB.title).toMatch(/2010\/11/)
    expect(PRIME_HUB.kicker).toBe("When was their prime?")
    expect(PRIME_HUB.homeHeading).toMatch(/2018\/19/)
    expect(PRIME_HUB.description).not.toMatch(/you can simulate/i)
    expect(COMPARE_HUB.description).not.toMatch(/in the simulator/)
    expect(COMPARE_HUB.lead).not.toMatch(/in the simulator/)
    expect(NATIONS_HUB.description).not.toMatch(/you can play/)
    expect(VS_HUB.title).not.toMatch(/You Can Play/)
    expect(BEST_TEAM.description).not.toMatch(/then simulate/)
    expect(ABOUT_PAGE.description).not.toMatch(/is playable/)
    expect(ABOUT_PAGE.description).not.toMatch(/\bplayable\b/)
    expect(HOME_SECTIONS.matchupsKicker).not.toBe("Dream matches")
    expect(HOME_SECTIONS.matchupsKicker).toMatch(/Clásico|2010/)
    expect(HOME_SECTIONS.clubsKicker).not.toBe("Clubs")
    expect(HOME_SECTIONS.nationsKicker).not.toBe("Nations")
    expect(HOME_SECTIONS.howKicker).not.toBe("Three steps")
    expect(HOME_SECTIONS.faqKicker).not.toBe("The rules")
    expect(HOME_SECTIONS.argumentsKicker).not.toBe("Big arguments")
    expect(PRIME_HUB.standardKicker).not.toBe("Editorial standard")
    expect(PRIME_HUB.guideKicker).not.toBe("How to use the dossiers")
    expect(BEST_TEAM.verdictKicker).not.toBe("The verdict")
    expect(BEST_TEAM.shortlistKicker).not.toBe("The shortlist")
    expect(BEST_TEAM.readingKicker).not.toBe("How to read the list")

    expect(VS_HUB.h1).not.toBe("Dream matches")
    expect(VS_HUB.h1).toMatch(/2010\/11/)
    expect(VS_HUB.title).toMatch(/Madrid 2016\/17/)
    expect(VS_HUB.kicker).toBe("Dream matches")
    expect(VS_HUB.crumb).toBe("Matchups")
    expect(VS_HUB.crumb).not.toBe(VS_HUB.kicker)

    expect(COMPARE_HUB.h1).not.toBe("Who is better?")
    expect(COMPARE_HUB.title).not.toMatch(/^Who Is Better\?/)
    expect(COMPARE_HUB.title).toMatch(/Brazil/)
    expect(COMPARE_HUB.kicker).toBe("Who is better?")
    expect(COMPARE_HUB.nationHeading).toMatch(/Brazil|Argentina/)
    expect(COMPARE_HUB.clubHeading).toMatch(/Clásico|United/)
    expect(COMPARE_HUB.nationHeading).not.toBe("National teams")
    expect(COMPARE_HUB.clubHeading).not.toBe("Clubs")

    expect(ABOUT_PAGE.h1).toMatch(/2010\/11/)
    expect(ABOUT_PAGE.title).toMatch(/2010\/11/)
    expect(ABOUT_PAGE.kicker).toBe("Jack")
    expect(ABOUT_PAGE.kicker).not.toBe("The project")

    expect(BEST_TEAM.h1).not.toBe("What is the best football team ever?")
    expect(BEST_TEAM.h1).toMatch(/2010\/11/)
    expect(BEST_TEAM.title).toMatch(/2010\/11/)
    expect(BEST_TEAM.kicker).toMatch(/best football team ever/i)
    expect(BEST_TEAM.homeCardTitle).toMatch(/2010\/11/)
    expect(HOME_SECTIONS.matchupsTitle).not.toBe("Popular dream matches")
    expect(HOME_SECTIONS.matchupsTitle).toMatch(/2010\/11/)
    expect(HOME_SECTIONS.clubsTitle).not.toBe("Legendary clubs")
    expect(HOME_SECTIONS.nationsTitle).not.toBe("Legendary nations")
    expect(HOME_SECTIONS.howTitle).not.toBe("How the football simulator works")

    expect(SIMULATE_PAGE.h1).not.toBe("Simulate any two squads")
    expect(SIMULATE_PAGE.h1).toMatch(/2010\/11/)
    expect(SIMULATE_PAGE.title).toMatch(/2010\/11/)
    expect(SIMULATE_PAGE.kicker).toBe("Football match simulator")
    expect(SIMULATE_PAGE.guideHeading).not.toMatch(/not a chatbot picking a winner/)
    expect(VS_HUB.crumb).not.toBe("Dreams")
    expect(VS_HUB.crumb).not.toBe("Dream matches")

    expect(SEARCH_PAGE.h1).not.toBe("Find a squad, then play it")
    expect(SEARCH_PAGE.title).toMatch(/1970|08\/09/)
    expect(SEARCH_PAGE.popularKicker).not.toBe("Popular sides")
    expect(SEARCH_PAGE.popularKicker).toMatch(/1970|08\/09/)

    expect(SIMULATE_PAGE.faqHeading).not.toBe("Football match simulator FAQ")
    expect(SIMULATE_PAGE.faqHeading).toMatch(/2010\/11/)
    expect(SIMULATE_PAGE.faqHeading).not.toMatch(/simulator questions/)

    expect(METHODOLOGY_PAGE.title).toMatch(/2010\/11/)
    expect(METHODOLOGY_PAGE.h1).toMatch(/2010\/11/)
    expect(METHODOLOGY_PAGE.kicker).toBe("400 nights")
    expect(METHODOLOGY_PAGE.kicker).not.toBe("How it works")
    expect(METHODOLOGY_PAGE.kicker).not.toBe(SIMULATE_PAGE.guideKicker)
    expect(METHODOLOGY_PAGE.h1).not.toBe("Simulation methodology")
    expect(SIMULATE_PAGE.guideKicker).toMatch(/Guardiola|Zidane|2010/)
    expect(SIMULATE_PAGE.guideKicker).not.toBe("How a match is actually decided")
    expect(SIMULATE_PAGE.cardNamed).toMatch(/2008\/09|2014\/15/)
    expect(SIMULATE_PAGE.cardNamed).not.toBe("Named seasons")
    expect(SIMULATE_PAGE.cardSpread).not.toBe("One score, then a distribution")
    expect(SIMULATE_PAGE.cardRatings).toMatch(/1970/)
    expect(SIMULATE_PAGE.cardRatings).not.toBe("Era-relative ratings")
    expect(SEARCH_PAGE.kicker).toMatch(/08\/09|1970|Barcelona/)
    expect(SEARCH_PAGE.kicker).not.toBe("Catalogue search")
    expect(VS_HUB.cardKicker).toMatch(/2010\/11|Barcelona/)
    expect(VS_HUB.cardKicker).not.toBe("How the card was picked")

    expect(VS_HUB.clubHeading).not.toBe("Club dynasties")
    expect(VS_HUB.clubHeading).toMatch(/Guardiola|Sacchi|Zidane/)
    expect(VS_HUB.nationHeading).toMatch(/1970/)

    expect(HOME_PAGE.title).not.toMatch(/Football & Soccer Match Simulator/)
    expect(HOME_PAGE.title).toMatch(/2010\/11/)
    expect(HOME_PAGE.tagline).not.toContain("Pick a team")
    expect(HOME_PAGE.tagline.join(" ")).toMatch(/2010\/11/)
    expect(HOME_PAGE.faqHeading).not.toBe("Football match simulator FAQ")
    expect(HOME_PAGE.kicker).toBe("Football match simulator")
    expect(SITE.tagline).not.toMatch(/Pick a team/)
    expect(SITE.tagline).toMatch(/2010\/11/)

    expect(TEAMS_HUB.h1).not.toBe("Club squads, by the year that mattered")
    expect(TEAMS_HUB.title).not.toBe("Club squads by season")
    expect(TEAMS_HUB.h1).toMatch(/Barça|2016\/17/)
    expect(TEAMS_HUB.kicker).toMatch(/Barça|Madrid|United/)
    expect(TEAMS_HUB.kicker).not.toBe("Club database")
    expect(NATIONS_HUB.h1).not.toBe("National teams, the years that stuck")
    expect(NATIONS_HUB.title).not.toBe("National teams by tournament year")
    expect(NATIONS_HUB.h1).toMatch(/1970/)
    expect(NATIONS_HUB.kicker).toMatch(/1970|1986|2010/)
    expect(NATIONS_HUB.kicker).not.toBe("World Cup sides")
  })

  it("drops playable from about, methodology, privacy and contact copy", () => {
    for (const file of [
      "app/about/page.tsx",
      "app/methodology/page.tsx",
      "app/privacy/page.tsx",
      "app/contact/page.tsx",
    ]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/\bplayable\b/)
    }
  })

  it("drops factory section kickers from prime, best-team, home and compare chrome", () => {
    expect(readFileSync("app/prime/[entity]/page.tsx", "utf8")).not.toMatch(
      /The reasoning|Deep dive|Editorial verdict/,
    )
    expect(readFileSync("app/prime/page.tsx", "utf8")).not.toMatch(
      /Editorial standard|How to use the dossiers/,
    )
    expect(readFileSync("app/best-football-team-ever/page.tsx", "utf8")).not.toMatch(
      /The verdict|The shortlist|How to read the list/,
    )
    expect(readFileSync("app/page.tsx", "utf8")).not.toMatch(
      /Three steps|The rules|Big arguments|Editorial ranking|Club comparison|Nation comparison/,
    )
    expect(readFileSync("app/compare/page.tsx", "utf8")).not.toMatch(/Nation debate|Club debate/)
    expect(readFileSync("components/teams/HistoricalTeamView.tsx", "utf8")).not.toMatch(
      /displaySeason\} dossier/,
    )
    expect(readFileSync("components/teams/HistoricalTeamView.tsx", "utf8")).not.toMatch(/Chapter /)
    expect(readFileSync("app/prime/[entity]/page.tsx", "utf8")).not.toMatch(/Candidate \{/)
    expect(readFileSync("app/prime/[entity]/page.tsx", "utf8")).not.toMatch(
      /More era debates|Other primes worth arguing about|Open this dream match|Simulate these two eras/,
    )
    expect(readFileSync("components/simulator/MatchResult.tsx", "utf8")).not.toMatch(/Simulated result/)
    expect(readFileSync("app/vs/page.tsx", "utf8")).not.toMatch(/How the card was picked/)
    expect(readFileSync("app/teams/page.tsx", "utf8")).not.toMatch(/for the football and soccer match simulator/)
    expect(readFileSync("app/national-teams/page.tsx", "utf8")).not.toMatch(/detail: "National team"/)
    expect(readFileSync("app/terms/page.tsx", "utf8")).not.toMatch(/for this simulator/)
    expect(readFileSync("app/privacy/page.tsx", "utf8")).not.toMatch(/kicker="Legal"/)
    expect(readFileSync("app/terms/page.tsx", "utf8")).not.toMatch(/kicker="Legal"/)
    expect(readFileSync("app/contact/page.tsx", "utf8")).not.toMatch(/kicker="Site"/)
    expect(readFileSync("app/simulate/page.tsx", "utf8")).not.toMatch(
      /Named seasons|One score, then a distribution|Era-relative ratings/,
    )
    expect(readFileSync("app/prime/[entity]/page.tsx", "utf8")).not.toMatch(/Open squad page/)
    expect(readFileSync("app/prime/page.tsx", "utf8")).not.toMatch(/Prime is a question, not the highest OVR/)
    expect(readFileSync("components/simulator/QuickMatch.tsx", "utf8")).not.toMatch(/Change opponent/)
    expect(readFileSync("components/simulator/MatchSetup.tsx", "utf8")).not.toMatch(/label=\{ui\.home\}/)
    expect(readFileSync("app/vs/[slug]/page.tsx", "utf8")).not.toMatch(/Home · |Away · |Choose different teams/)
    expect(readFileSync("app/search/page.tsx", "utf8")).not.toMatch(/send it into the simulator/)
    expect(readFileSync("app/search/page.tsx", "utf8")).not.toMatch(/Nation" : "Club"/)
    expect(readFileSync("app/best-football-team-ever/page.tsx", "utf8")).not.toMatch(
      /Six sides that still have a case|Choose any two candidates/,
    )
    expect(readFileSync("components/teams/FilteredCatalog.tsx", "utf8")).not.toMatch(/All eras/)
    expect(readFileSync("components/simulator/EraSelect.tsx", "utf8")).not.toMatch(/Latest squad/)
    expect(readFileSync("components/simulator/MatchSetup.tsx", "utf8")).not.toMatch(/Latest squad/)
    expect(readFileSync("components/simulator/CommentaryPanel.tsx", "utf8")).not.toMatch(/kicker="Report"/)
    expect(readFileSync("app/match/[matchId]/page.tsx", "utf8")).not.toMatch(/Simulated match/)
    expect(readFileSync("app/search/page.tsx", "utf8")).not.toMatch(/Play \{entry\.displaySeason\}/)
    expect(readFileSync("components/simulator/QuickMatch.tsx", "utf8")).not.toMatch(
      /Play \$\{home\.displaySeason\}/,
    )
    expect(readFileSync("components/simulator/AiAnalysisResult.tsx", "utf8")).not.toMatch(
      /The opening 20|The duel to watch|The manager's move|The chaos factor/,
    )
    expect(readFileSync("components/simulator/AiAnalysisResult.tsx", "utf8")).not.toMatch(
      /The call|Expert dossier|How the match develops|Era collision/,
    )
    expect(readFileSync("components/simulator/ClubPicker.tsx", "utf8")).not.toMatch(/label: "Other"/)
    expect(readFileSync("components/simulator/ClubPicker.tsx", "utf8")).not.toMatch(
      /Choose a club or nation/,
    )
    expect(readFileSync("app/teams/loading.tsx", "utf8")).not.toMatch(/Loading squads/)
    expect(readFileSync("app/prime/[entity]/page.tsx", "utf8")).not.toMatch(/Other primes/)
  })

  it("names flagship sides on Spanish and Portuguese hubs instead of factory catalog labels", async () => {
    const { LOCALIZED_COPY } = await import("@/lib/i18n")
    expect(LOCALIZED_COPY.es.home.metaTitle).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.home.tagline).not.toContain("Elige un equipo")
    expect(LOCALIZED_COPY.es.home.tagline.join(" ")).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.home.lead).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.home.lead).not.toMatch(/Elige dos equipos/)
    expect(LOCALIZED_COPY["pt-br"].home.tagline).not.toContain("Escolha um time")
    expect(LOCALIZED_COPY["pt-br"].home.tagline.join(" ")).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.home.metaTitle).not.toMatch(/\| LegendaryMatch$/)
    expect(LOCALIZED_COPY.es.simulate.title).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.simulate.metaTitle).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.dreams.title).not.toBe("Partidos soñados")
    expect(LOCALIZED_COPY.es.sections.dream).not.toBe("Duelos populares")
    expect(LOCALIZED_COPY.es.howTitle).not.toBe("Cómo funciona el simulador")
    expect(LOCALIZED_COPY.es.aboutTitle).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.how[0]?.[1]).toMatch(/2010\/11|1970/)
    expect(LOCALIZED_COPY.es.faq[0]?.[1]).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.faqTitle).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY.es.faq.at(-1)?.[0]).toMatch(/2010\/11/)

    expect(LOCALIZED_COPY["pt-br"].home.metaTitle).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY["pt-br"].simulate.title).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY["pt-br"].dreams.title).not.toBe("Jogos dos sonhos")
    expect(LOCALIZED_COPY["pt-br"].sections.clubs).not.toBe("Clubes lendários")
    expect(LOCALIZED_COPY["pt-br"].aboutTitle).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY["pt-br"].how[0]?.[1]).toMatch(/2010\/11|1970/)
    expect(LOCALIZED_COPY["pt-br"].home.title).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY["pt-br"].home.lead).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY["pt-br"].home.lead).not.toMatch(/Escolha dois times/)
    expect(LOCALIZED_COPY["pt-br"].faqTitle).toMatch(/2010\/11/)
    expect(LOCALIZED_COPY["pt-br"].howTitle).not.toBe("Como funciona o simulador")
    expect(LOCALIZED_COPY["pt-br"].faq.at(-1)?.[0]).toMatch(/2010\/11/)
  })

  it("gives compare hub cards unique leads instead of Who is better, X or Y", () => {
    const leads = new Set<string>()
    for (const pair of CLUB_COMPARES) {
      const line = firstSentence(pair.lead)
      expect(line, pair.slug).not.toMatch(/^Who is better,/i)
      expect(leads.has(line), line).toBe(false)
      leads.add(line)
    }
  })

  it("gives OG cards a unique line instead of factory squad or Who is better chrome", () => {
    const headings = new Set<string>()
    for (const team of teams) {
      const og = teamOgCopy(team)
      expect(og.heading, team.id).toBe(teamPageCopy(team).title)
      expect(og.heading, team.id).not.toBe(`${team.clubName} ${team.displaySeason}`)
      expect(og.subtitle, team.id).not.toMatch(/Squad, lineup, formation/i)
      expect(headings.has(og.heading), og.heading).toBe(false)
      headings.add(og.heading)
    }
    const compareHeadings = new Set<string>()
    const footers = new Set<string>()
    for (const pair of CLUB_COMPARES) {
      const left = getClub(pair.leftClubId)!
      const right = getClub(pair.rightClubId)!
      const og = compareOgCopy(pair, left.name, right.name)
      expect(og.heading, pair.slug).not.toMatch(/^Who is better/i)
      expect(og.heading, pair.slug).not.toMatch(/ or .+\?$/)
      expect(og.kicker, pair.slug).not.toBe("WHO IS BETTER")
      expect(og.footer, pair.slug).not.toMatch(/^Simulate /)
      expect(og.footer, pair.slug).not.toBe("LegendaryMatch — then simulate the primes")
      expect(og.footer, pair.slug).toMatch(left.name)
      expect(compareHeadings.has(og.heading), og.heading).toBe(false)
      compareHeadings.add(og.heading)
      expect(footers.has(og.footer), og.footer).toBe(false)
      footers.add(og.footer)
    }
  })

  it("gives every prime page a unique verdict title instead of When Was X's Prime", () => {
    const titles = new Set<string>()
    const seos = new Set<string>()
    for (const entity of primeEntities) {
      expect(entity.pick, entity.slug).toBeTruthy()
      expect(entity.title, entity.slug).not.toMatch(/^When Was .+['’]s Prime\?$/)
      expect(entity.seoTitle, entity.slug).not.toMatch(/When Was .+ Prime/)
      expect(entity.seoDescription, entity.slug).not.toMatch(/^When was .+ prime\?/i)
      expect(entity.seoDescription, entity.slug).not.toMatch(/\bsimulate\b/i)
      expect(entity.description, entity.slug).not.toMatch(/\bplayable\b/)
      expect(titles.has(entity.title), entity.title).toBe(false)
      expect(seos.has(entity.seoTitle), entity.seoTitle).toBe(false)
      titles.add(entity.title)
      seos.add(entity.seoTitle)
    }
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
    expect(SITE.contentUpdated).toMatch(/September 2026/)
  })
})
