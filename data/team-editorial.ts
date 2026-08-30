import { CLUB_TEAM_EDITORIAL } from "@/data/team-editorial-clubs"
import { NATION_TEAM_EDITORIAL } from "@/data/team-editorial-nations"

export type TeamEditorial = {
  intro: string
  sections: Array<{ heading: string; paragraphs: string[] }>
}

const TEAM_EDITORIAL: Record<string, TeamEditorial> = {
  ...CLUB_TEAM_EDITORIAL,
  ...NATION_TEAM_EDITORIAL,
}

export function getTeamEditorial(teamId: string): TeamEditorial | undefined {
  return TEAM_EDITORIAL[teamId]
}

export function isIndexableTeamPage(teamId: string): boolean {
  return Boolean(TEAM_EDITORIAL[teamId])
}

export function editorialTeamIds(): string[] {
  return Object.keys(TEAM_EDITORIAL)
}
