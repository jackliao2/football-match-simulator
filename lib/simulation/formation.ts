import type { HistoricalTeam } from "@/types"
import { clamp } from "@/lib/format"

export type FormationShape = {
  defenders: number
  midfielders: number
  forwards: number
  lines: number
}

/** Outfield 10 split from a `4-3-3` / `3-5-2` / `4-2-3-1` string. */
export function parseFormation(formation: string): FormationShape {
  const parts = formation
    .split("-")
    .map((bit) => Number.parseInt(bit, 10))
    .filter((n) => Number.isFinite(n) && n > 0 && n < 11)
  const defenders = parts[0] ?? 4
  const forwards = parts.length > 1 ? parts[parts.length - 1]! : 2
  const midfielders = clamp(10 - defenders - forwards, 1, 8)
  return { defenders, midfielders, forwards, lines: Math.max(3, parts.length) }
}

/**
 * Small shape-vs-shape term. Ratings still dominate; this stops 4-3-3 vs 5-4-1
 * from being identical to the same XI printed as a different formation.
 */
export function formationMatchup(attacking: HistoricalTeam, defending: HistoricalTeam): number {
  const atk = parseFormation(attacking.formation)
  const def = parseFormation(defending.formation)
  const frontVsBack = (atk.forwards - (def.defenders - 3)) / 50
  const midfieldNumbers = (atk.midfielders - def.midfielders) / 100
  const possessionMids = attacking.possession >= 58 ? midfieldNumbers : midfieldNumbers * 0.35
  const wingBackWidth = atk.defenders <= 3 && attacking.width >= 72 ? 0.012 : 0
  return clamp(1 + frontVsBack + possessionMids + wingBackWidth, 0.94, 1.08)
}
