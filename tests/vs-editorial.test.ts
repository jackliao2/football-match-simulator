import { describe, expect, it } from "vitest"
import { FEATURED_MATCHUPS } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { matchupFeature } from "@/data/vs-editorial"

describe("curated dream-match editorial", () => {
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
