import { faceStats, type FaceStats } from "@/lib/player-stats"
import { nationOf } from "@/lib/nationality"
import type { HistoricalTeam, Player } from "@/types"

export interface StarPlayer {
  id: string
  name: string
  shortName: string
  position: string
  overall: number
  nation: string
  stats: FaceStats
}

export function toStarPlayer(player: Player, team?: HistoricalTeam): StarPlayer {
  return {
    id: player.id,
    name: player.name,
    shortName: player.shortName,
    position: player.position,
    overall: player.overall,
    nation: player.nation ?? nationOf(player.name, team),
    stats: faceStats(player),
  }
}

export function teamStars(team: HistoricalTeam, count = 6): StarPlayer[] {
  const starting = new Set(team.startingXI)
  return [...team.players]
    .sort((a, b) => {
      if (b.overall !== a.overall) return b.overall - a.overall
      return Number(starting.has(b.id)) - Number(starting.has(a.id))
    })
    .slice(0, count)
    .map((player) => toStarPlayer(player, team))
}

export interface SquadMember extends StarPlayer {
  starter: boolean
}

export function teamSquad(team: HistoricalTeam): SquadMember[] {
  const starting = new Set(team.startingXI)
  const xi = team.startingXI
    .map((id) => team.players.find((player) => player.id === id))
    .filter((player): player is Player => Boolean(player))
    .map((player) => ({ ...toStarPlayer(player, team), starter: true }))
  const bench = team.players
    .filter((player) => !starting.has(player.id))
    .sort((a, b) => b.overall - a.overall)
    .map((player) => ({ ...toStarPlayer(player, team), starter: false }))
  return [...xi, ...bench]
}

export function ovrTone(overall: number): string {
  if (overall >= 94) return "text-gold-2"
  if (overall >= 88) return "text-gold"
  if (overall >= 82) return "text-text"
  return "text-muted"
}
