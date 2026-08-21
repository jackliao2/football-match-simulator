import type { HistoricalTeam } from "@/types"
import { clamp, round2 } from "@/lib/format"
import {
  defensiveStrength,
  effectiveRatings,
  offensiveStrength,
  tacticalModifier,
} from "@/lib/simulation/ratings"
import type { Rng } from "@/lib/simulation/random"

const MIN_XG = 0.25
const MAX_XG = 3.8
const BASE_RATE = 1.36
const HOME_ADVANTAGE = 1.055

export function calculateExpectedGoals(
  attacking: HistoricalTeam,
  defending: HistoricalTeam,
  isHome: boolean,
  rng: Rng,
): number {
  const atk = effectiveRatings(attacking)
  const def = effectiveRatings(defending)
  const tactical = tacticalModifier(atk, def)
  const attack = offensiveStrength(atk, tactical * 100)
  const resist = defensiveStrength(def)
  const noise = 0.93 + rng() * 0.14
  const home = isHome ? HOME_ADVANTAGE : 1
  const xg = BASE_RATE * (attack / resist) * home * tactical * noise
  return round2(clamp(xg, MIN_XG, MAX_XG))
}

export function derivePossession(
  home: HistoricalTeam,
  away: HistoricalTeam,
  rng: Rng,
): [number, number] {
  const homeRaw =
    home.possession * 0.62 + home.midfieldRating * 0.28 + home.chemistryRating * 0.1
  const awayRaw =
    away.possession * 0.62 + away.midfieldRating * 0.28 + away.chemistryRating * 0.1
  const noise = 0.94 + rng() * 0.12
  let homePct = Math.round((100 * homeRaw * noise) / (homeRaw * noise + awayRaw))
  homePct = clamp(homePct, 34, 72)
  return [homePct, 100 - homePct]
}
