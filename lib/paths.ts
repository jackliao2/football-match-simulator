import type { HistoricalTeam, TeamKind } from "@/types"

export function teamPath(team: Pick<HistoricalTeam, "clubId" | "season" | "kind">): string {
  return orgSeasonPath(team.kind, team.clubId, team.season)
}

export function orgPath(kind: TeamKind | undefined, orgId: string): string {
  return kind === "nation" ? `/national-teams/${orgId}` : `/teams/${orgId}`
}

export function orgSeasonPath(
  kind: TeamKind | undefined,
  orgId: string,
  season: string,
): string {
  return `${orgPath(kind ?? "club", orgId)}/${season}`
}

export function orgIndexPath(kind: TeamKind | undefined): string {
  return kind === "nation" ? "/national-teams" : "/teams"
}
