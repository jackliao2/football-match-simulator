import { simulateMany } from "@/lib/simulation"
import type { HistoricalTeam, MonteCarloResult } from "@/types"

const cache = new Map<string, MonteCarloResult>()

export function cachedMatchupModel(
  home: HistoricalTeam,
  away: HistoricalTeam,
  runs: number,
  seedPrefix = "vs",
) {
  const key = `${home.id}|${away.id}|${runs}`
  const hit = cache.get(key)
  if (hit) return hit
  const result = simulateMany(home, away, runs, `${seedPrefix}:${home.id}|${away.id}`)
  cache.set(key, result)
  return result
}
