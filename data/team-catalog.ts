import { teams } from "@/data/teams"
import { teamPath } from "@/lib/paths"
import { CLUB_ALIASES, seasonSearchTokens } from "@/lib/seo"
import type { HistoricalTeam } from "@/types"
import type { TeamCatalogEntry } from "@/data/team-catalog-types"

export { catalogStub, isCurrentEntry, type TeamCatalogEntry } from "@/data/team-catalog-types"

export function toCatalogCard(team: HistoricalTeam): HistoricalTeam {
  return {
    ...team,
    players: [],
    startingXI: [],
    summary: "",
    seoTitle: "",
    seoDescription: "",
  }
}

export function toSimulatorTeam(team: HistoricalTeam): HistoricalTeam {
  return {
    ...team,
    achievements: [],
    summary: "",
    seoTitle: "",
    seoDescription: "",
  }
}

export function toCatalogEntry(team: HistoricalTeam): TeamCatalogEntry {
  const aliases = CLUB_ALIASES[team.clubId] ?? [team.clubName]
  return {
    id: team.id,
    clubId: team.clubId,
    clubName: team.clubName,
    clubCode: team.clubCode,
    season: team.season,
    displaySeason: team.displaySeason,
    kind: team.kind,
    overallRating: team.overallRating,
    manager: team.manager,
    formation: team.formation,
    styleTags: team.styleTags,
    eraYear: team.eraYear,
    trophies: team.trophies,
    tokens: [
      team.clubName,
      team.clubId.replaceAll("-", " "),
      team.clubCode,
      team.manager,
      team.displaySeason,
      team.season,
      ...aliases,
      ...seasonSearchTokens(team),
      ...team.styleTags,
    ]
      .join(" ")
      .toLowerCase(),
    path: teamPath(team),
  }
}

export const TEAM_CATALOG: TeamCatalogEntry[] = teams.map(toCatalogEntry)

export function searchCatalog(query: string, limit = 24): TeamCatalogEntry[] {
  const q = query.trim().toLowerCase().replace(/\s+/g, " ")
  if (q.length < 2) return []
  const terms = q.split(" ")
  const scored: Array<{ entry: TeamCatalogEntry; score: number }> = []
  for (const entry of TEAM_CATALOG) {
    let score = 0
    const name = entry.clubName.toLowerCase()
    if (name === q) score += 80
    else if (name.startsWith(q)) score += 50
    else if (name.includes(q)) score += 30
    if (entry.clubId.replaceAll("-", " ") === q) score += 40
    if (entry.displaySeason.toLowerCase() === q || entry.season === q) score += 25
    const allTerms = terms.every((term) => entry.tokens.includes(term))
    if (allTerms) score += 20
    else if (entry.tokens.includes(q)) score += 12
    if (score === 0) continue
    score += entry.overallRating / 100
    scored.push({ entry, score })
  }
  return scored
    .sort((a, b) => b.score - a.score || b.entry.overallRating - a.entry.overallRating)
    .slice(0, limit)
    .map((row) => row.entry)
}
