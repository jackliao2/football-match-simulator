import { describe, expect, it } from "vitest"
import { FEATURED_MATCHUPS } from "@/data/matchups"
import { editorialTeamIds, getTeamEditorial, isIndexableTeamPage } from "@/data/team-editorial"
import { getTeam } from "@/data/teams"

describe("season dossiers", () => {
  it("keeps Inter's 1988/89 champions separate from Klinsmann's later arrival", () => {
    const team = getTeam("inter-milan-1988-89")!
    expect(team.players.some((player) => /Klinsmann/.test(player.name))).toBe(false)
    expect(team.startingXI).toContain("ramon-diaz")
    expect(team.startingXI).toContain("aldo-serena")
    expect(new Set(team.startingXI).size).toBe(11)
    expect(team.startingXI.every((id) => team.players.some((player) => player.id === id))).toBe(true)
    expect(getTeamEditorial(team.id)?.sources?.some((source) => source.url.startsWith("https://www.inter.it/"))).toBe(true)
  })

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
    expect(isIndexableTeamPage("bayern-munich-2019-20")).toBe(true)
    expect(isIndexableTeamPage("spain-2012")).toBe(true)
    expect(isIndexableTeamPage("belgium-2018")).toBe(true)
    expect(editorialTeamIds().length).toBeGreaterThanOrEqual(60)
  })

  it("keeps every dossier above the indexability bar", () => {
    for (const id of editorialTeamIds()) {
      expect(getTeam(id), id).toBeDefined()
      const editorial = getTeamEditorial(id)
      expect(editorial, id).toBeDefined()
      const text = [editorial!.intro, ...editorial!.sections.flatMap((section) => section.paragraphs)].join(" ")
      expect(text.length, id).toBeGreaterThan(650)
      expect(editorial!.sections.length, id).toBeGreaterThanOrEqual(2)
    }
  })
})
