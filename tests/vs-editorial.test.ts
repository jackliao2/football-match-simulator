import { describe, expect, it } from "vitest"
import { allVsPairs, FEATURED_MATCHUPS, HOMEPAGE_MATCHUPS } from "@/data/matchups"
import { canonicalVsSlug } from "@/lib/match-id"
import { getTeam } from "@/data/teams"
import { matchupFeature, writtenMatchupEditorial } from "@/data/vs-editorial"

describe("curated dream-match editorial", () => {
  it("separates hypothetical France 1998 from Senegal's actual 2002 opener", () => {
    const france = getTeam("france-1998")!
    const senegal = getTeam("senegal-2002")!
    const lead = writtenMatchupEditorial(france, senegal)!
    const feature = matchupFeature(france, senegal)!
    expect(canonicalVsSlug(france.id, senegal.id)).toBe("france-1998-vs-senegal-2002")
    expect(lead).toMatch(/hypothetical cross-era matchup/)
    expect(lead).toMatch(/real 1–0 win came against France in 2002/)
    expect(feature.context).toMatch(/Zidane was injured and did not play/)
    expect(feature.hinge).toMatch(/Diouf broke down the left and delivered a low cross for Diop's goal/)
    expect(feature.sources?.some((source) => source.url === "https://inside.fifa.com/news/diouf-interview-senegal-france-2002-fifa-world-cup")).toBe(true)
    expect([lead, feature.context, feature.hinge, feature.reading].join(" ")).not.toMatch(/rematch|long throw|one set-piece/i)
  })

  it("only promotes homepage matchups that have a published canonical page", () => {
    const published = new Set(allVsPairs().map(([home, away]) => canonicalVsSlug(home, away)))
    for (const [home, away] of HOMEPAGE_MATCHUPS) {
      expect(published.has(canonicalVsSlug(home, away)), `${home} vs ${away}`).toBe(true)
    }
  })

  it("gives every published matchup substantial hand-written analysis", () => {
    for (const [homeId, awayId] of FEATURED_MATCHUPS) {
      const home = getTeam(homeId)
      const away = getTeam(awayId)
      expect(home, homeId).toBeDefined()
      expect(away, awayId).toBeDefined()

      const feature = matchupFeature(home!, away!)
      expect(feature, `${homeId} vs ${awayId}`).toBeDefined()
      expect(feature!.context.length).toBeGreaterThan(200)
      expect(feature!.hinge.length).toBeGreaterThan(200)
      expect(feature!.reading.length).toBeGreaterThan(200)
      expect(feature!.context.length + feature!.hinge.length + feature!.reading.length).toBeGreaterThan(700)
    }
  })
})
