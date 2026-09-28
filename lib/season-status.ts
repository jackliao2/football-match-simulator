import type { TeamKind } from "@/types"

export function currentClubSeasonStart(date = new Date()): number {
  return date.getUTCMonth() >= 6 ? date.getUTCFullYear() : date.getUTCFullYear() - 1
}

export function isCurrentTeamEra(
  team: { kind: TeamKind; eraYear: number },
  date = new Date(),
): boolean {
  if (team.kind === "club") return team.eraYear >= currentClubSeasonStart(date)
  const currentNationCycle = date.getUTCMonth() >= 7 ? date.getUTCFullYear() + 1 : date.getUTCFullYear()
  return team.eraYear >= currentNationCycle
}
