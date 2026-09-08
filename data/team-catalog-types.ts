import type { HistoricalTeam, TeamKind, Trophy } from "@/types"

export type TeamCatalogEntry = {
  id: string
  clubId: string
  clubName: string
  clubCode: string
  season: string
  displaySeason: string
  kind: TeamKind
  overallRating: number
  manager: string
  formation: string
  styleTags: string[]
  eraYear: number
  trophies: Trophy[]
  tokens?: string
  path?: string
}

export function isCurrentEntry(entry: Pick<TeamCatalogEntry, "kind" | "eraYear">) {
  return entry.kind === "nation" ? entry.eraYear >= 2026 : entry.eraYear >= 2025
}

export function catalogStub(entry: TeamCatalogEntry): HistoricalTeam {
  return {
    id: entry.id,
    kind: entry.kind,
    clubId: entry.clubId,
    clubName: entry.clubName,
    clubCode: entry.clubCode,
    season: entry.season,
    displaySeason: entry.displaySeason,
    eraYear: entry.eraYear,
    formation: entry.formation,
    manager: entry.manager,
    attackRating: entry.overallRating,
    midfieldRating: entry.overallRating,
    defenseRating: entry.overallRating,
    goalkeeperRating: entry.overallRating,
    chemistryRating: entry.overallRating,
    overallRating: entry.overallRating,
    tempo: 50,
    pressing: 50,
    possession: 50,
    counterAttack: 50,
    width: 50,
    aerialThreat: 50,
    players: [],
    startingXI: [],
    trophies: entry.trophies,
    achievements: [],
    styleTags: entry.styleTags,
    summary: "",
    seoTitle: "",
    seoDescription: "",
  }
}
