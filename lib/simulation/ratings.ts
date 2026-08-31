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

const QUALITY_FLOOR = 48
const QUALITY_SPAN = 46
const QUALITY_EXPONENT = 2.4
const ATTACKING_FINISH = new Set(["ST", "CF", "SS", "LW", "RW", "CAM", "LAM", "RAM", "LM", "RM"])

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

export function attackingFinishing(team: HistoricalTeam): number {
  const xi = starters(team)
  const attackers = xi.filter((player) => ATTACKING_FINISH.has(player.position))
  const pool = attackers.length > 0 ? attackers : xi.filter((player) => player.position !== "GK")
  if (pool.length === 0) return 70
  return pool.reduce((sum, player) => sum + (player.finishing ?? player.attack ?? player.overall), 0) / pool.length
}

/**
 * Superlinear so a 94 finisher is clearly more likely to score than an 82,
 * instead of the old linear scale where position multipliers dominated.
 */
export function qualityCurve(rating: number): number {
  return Math.pow(Math.max(0, rating - QUALITY_FLOOR) / QUALITY_SPAN, QUALITY_EXPONENT)
}

export function scoringWeight(player: Player, aerialThreat = 70): number {
  const finishing = player.finishing ?? player.attack ?? player.overall
  const openPlay = qualityCurve(finishing) * positionMultiplier(player.position, "score")
  const setPiece =
    setPieceMultiplier(player.position) * (aerialThreat / 100) * ((player.physical ?? player.overall) / 100)
  return Math.max(0.002, openPlay + setPiece)
}

export function assistWeight(player: Player): number {
  const creation = player.chanceCreation ?? player.creativity ?? player.passing ?? player.overall
  const multiplier = positionMultiplier(player.position, "assist")
  return Math.max(0.002, qualityCurve(creation) * multiplier)
}

function setPieceMultiplier(position: string): number {
  if (["CB", "LCB", "RCB"].includes(position)) return 0.09
  if (["ST", "CF"].includes(position)) return 0.03
  if (["CDM", "LDM", "RDM"].includes(position)) return 0.02
  if (["LB", "RB", "LWB", "RWB"].includes(position)) return 0.008
  return 0
}

function positionMultiplier(position: string, kind: "score" | "assist"): number {
  const score: Record<string, number> = {
    ST: 1.3,
    CF: 1.28,
    SS: 1.22,
    LW: 1.15,
    RW: 1.15,
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
    LB: 0.62,
    RB: 0.65,
    LWB: 0.72,
    RWB: 0.72,
    CB: 0.25,
    LCB: 0.22,
    RCB: 0.22,
    GK: 0.04,
  }

  const table = kind === "score" ? score : assist
  return table[position] ?? (kind === "score" ? 0.5 : 0.7)
}

function penaltyTakerScore(player: Player): number {
  const finishing = player.finishing ?? player.attack ?? player.overall
  return player.overall * 0.6 + finishing * 0.4
}

export function penaltyTaker(team: HistoricalTeam, players: Player[]): Player {
  const outfield = players.filter((player) => player.position !== "GK")
  const pool = outfield.length > 0 ? outfield : players
  const designated = team.penaltyTakerId
    ? pool.find((player) => player.id === team.penaltyTakerId)
    : undefined
  if (designated) return designated
  return [...pool].sort((a, b) => penaltyTakerScore(b) - penaltyTakerScore(a))[0] ?? pool[0]!
}
