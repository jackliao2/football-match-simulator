import { describe, expect, it } from "vitest"
import { getTeamEditorial, editorialTeamIds } from "@/data/team-editorial"
import { getTeam } from "@/data/teams"
import { teamFaqs } from "@/lib/team-faqs"

describe("historical squad content scope", () => {
  it("does not present a selected playable squad as the full historical register", () => {
    const team = getTeam("napoli-1986-87")!
    const faqs = teamFaqs(team, { editorial: getTeamEditorial(team.id), runs: 100 })
    expect(faqs[0]?.a).toContain(`${team.players.length} selected players`)
    expect(faqs[0]?.a).toContain("not a complete registration list")
    expect(faqs[0]?.a).toMatch(/Maradona|scudetto|Diego/)
  })

  it("labels the formation as a modelling choice and drops duplicate season-alias questions", () => {
    for (const id of editorialTeamIds()) {
      const team = getTeam(id)!
      const faqs = teamFaqs(team, { editorial: getTeamEditorial(id), runs: 100 })
      expect(faqs.some((faq) => /searches usually|names people mean/.test(faq.a)), id).toBe(false)
      if (!faqs[0]?.q.startsWith("Is this the official")) {
        expect(faqs.at(-1)?.q, id).toContain("in the simulator?")
        expect(faqs.at(-1)?.a, id).toContain("actual lineups varied")
      }
    }
  })
})
