import type { HistoricalTeam, Player } from "@/types"

export interface StarPlayer {
  id: string
  name: string
  shortName: string
  position: string
  overall: number
}

export function teamStars(team: HistoricalTeam, count = 6): StarPlayer[] {
  const starting = new Set(team.startingXI)
  return [...team.players]
    .sort((a, b) => {
      if (b.overall !== a.overall) return b.overall - a.overall
      return Number(starting.has(b.id)) - Number(starting.has(a.id))
    })
    .slice(0, count)
    .map((player) => ({
      id: player.id,
      name: player.name,
      shortName: player.shortName,
      position: player.position,
      overall: player.overall,
    }))
}

export function toStarPlayer(player: Player): StarPlayer {
  return {
    id: player.id,
    name: player.name,
    shortName: player.shortName,
    position: player.position,
    overall: player.overall,
  }
}
