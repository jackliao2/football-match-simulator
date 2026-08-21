import type { HistoricalTeam, Player } from "@/types"
import { clamp } from "@/lib/format"

export interface EffectiveRatings {
  attack: number
  midfield: number
  defense: number
  goalkeeper: number
  chemistry: number
  tempo: number
  pressing: number
  possession: number
  counterAttack: number
  width: number
  aerialThreat: number
  overall: number
  eraFactor: number
}

/**
 * Era normalization.
 *
 * Ratings measure greatness relative to a team's own era, not modern
 * athleticism. A 1970 side authored at 95 attack is treated as equal
 * to a 2022 side authored at 95 attack. We never multiply strength by
 * season year.
 *
 * The only era-aware term is chemistry: legendary high-cohesion sides
 * get a tiny cohesion bump, which older great teams typically have.
 */
export function eraAdjustment(team: HistoricalTeam): number {
  return 0.985 + (team.chemistryRating / 100) * 0.03
}

export function effectiveRatings(team: HistoricalTeam): EffectiveRatings {
  const eraFactor = eraAdjustment(team)
  const scale = (value: number) => clamp(value * eraFactor, 70, 99)

  return {
    attack: scale(team.attackRating),
    midfield: scale(team.midfieldRating),
    defense: scale(team.defenseRating),
    goalkeeper: scale(team.goalkeeperRating),
    chemistry: scale(team.chemistryRating),
    tempo: team.tempo,
    pressing: team.pressing,
    possession: team.possession,
    counterAttack: team.counterAttack,
    width: team.width,
    aerialThreat: team.aerialThreat,
    overall: scale(team.overallRating),
    eraFactor,
  }
}

export function offensiveStrength(team: EffectiveRatings, tacticalModifier: number): number {
  return (
    team.attack * 0.5 +
    team.midfield * 0.25 +
    team.chemistry * 0.15 +
    tacticalModifier * 0.1
  )
}

export function defensiveStrength(team: EffectiveRatings): number {
  return team.defense * 0.65 + team.goalkeeper * 0.25 + team.chemistry * 0.1
}

export function tacticalModifier(attacking: EffectiveRatings, defending: EffectiveRatings): number {
  const counterVsPossession =
    ((attacking.counterAttack - 50) / 800) * ((100 - defending.possession) / 50)
  const widthGap = (attacking.width - defending.width) / 1200
  const aerial = (attacking.aerialThreat - defending.defense) / 1800
  const press = (attacking.pressing - defending.tempo) / 1600
  const midfieldControl = (attacking.midfield - defending.midfield) / 900

  return clamp(1 + counterVsPossession + widthGap + aerial + press + midfieldControl, 0.88, 1.14)
}

export function starters(team: HistoricalTeam): Player[] {
  const byId = new Map(team.players.map((player) => [player.id, player]))
  return team.startingXI
    .map((id) => byId.get(id))
    .filter((player): player is Player => Boolean(player))
}

export function bench(team: HistoricalTeam): Player[] {
  const starting = new Set(team.startingXI)
  return team.players.filter((player) => !starting.has(player.id) && player.position !== "GK")
}

export function scoringWeight(player: Player): number {
  const finishing = player.finishing ?? player.attack ?? player.overall
  const multiplier = positionMultiplier(player.position, "score")
  return Math.max(0.5, finishing * multiplier)
}

export function assistWeight(player: Player): number {
  const creation = player.chanceCreation ?? player.creativity ?? player.passing ?? player.overall
  const multiplier = positionMultiplier(player.position, "assist")
  return Math.max(0.2, creation * multiplier)
}

function positionMultiplier(position: string, kind: "score" | "assist"): number {
  const score: Record<string, number> = {
    ST: 1.45,
    CF: 1.4,
    SS: 1.28,
    LW: 1.18,
    RW: 1.18,
    CAM: 0.86,
    LAM: 0.9,
    RAM: 0.9,
    LM: 0.72,
    RM: 0.72,
    CM: 0.48,
    LCM: 0.5,
    RCM: 0.5,
    CDM: 0.22,
    LDM: 0.2,
    RDM: 0.2,
    LB: 0.28,
    RB: 0.3,
    LWB: 0.34,
    RWB: 0.34,
    CB: 0.12,
    LCB: 0.12,
    RCB: 0.12,
    GK: 0.008,
  }

  const assist: Record<string, number> = {
    ST: 0.7,
    CF: 0.75,
    SS: 1.05,
    LW: 1.15,
    RW: 1.18,
    CAM: 1.35,
    LAM: 1.25,
    RAM: 1.25,
    LM: 1.1,
    RM: 1.1,
    CM: 1.2,
    LCM: 1.18,
    RCM: 1.18,
    CDM: 0.7,
    LDM: 0.65,
    RDM: 0.65,
    LB: 0.85,
    RB: 0.9,
    LWB: 1.0,
    RWB: 1.0,
    CB: 0.25,
    LCB: 0.22,
    RCB: 0.22,
    GK: 0.04,
  }

  const table = kind === "score" ? score : assist
  return table[position] ?? (kind === "score" ? 0.5 : 0.7)
}

export function penaltyTaker(players: Player[]): Player {
  return [...players].sort((a, b) => scoringWeight(b) - scoringWeight(a))[0] ?? players[0]!
}
