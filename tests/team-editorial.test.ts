import { describe, expect, it } from "vitest"
import { FEATURED_MATCHUPS } from "@/data/matchups"
import { editorialTeamIds, getTeamEditorial, isIndexableTeamPage } from "@/data/team-editorial"
import { getTeam } from "@/data/teams"

describe("season dossiers", () => {
  it("covers every featured dream-match team with a substantial hand-written dossier", () => {
    const ids = new Set(FEATURED_MATCHUPS.flat())
    for (const id of ids) {
      expect(getTeam(id), id).toBeDefined()
      const editorial = getTeamEditorial(id)
      expect(editorial, id).toBeDefined()
      const text = [editorial!.intro, ...editorial!.sections.flatMap((section) => section.paragraphs)].join(" ")
      expect(text.length, id).toBeGreaterThan(650)
      expect(editorial!.sections.length, id).toBeGreaterThanOrEqual(2)
    }
  })

  it("only marks dossier teams as indexable", () => {
    expect(isIndexableTeamPage("barcelona-2010-11")).toBe(true)
    expect(isIndexableTeamPage("barcelona-2014-15")).toBe(true)
    expect(editorialTeamIds().length).toBeGreaterThanOrEqual(30)
  })
})
