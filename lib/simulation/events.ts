import type { HistoricalTeam, MatchEvent } from "@/types"
import { displayMinute } from "@/lib/format"
import { chance, pickWeighted, poisson, randInt, type Rng } from "@/lib/simulation/random"
import { assistWeight, bench, penaltyTaker, scoringWeight, starters } from "@/lib/simulation/ratings"

function uniqueMinute(rng: Rng, used: Set<number>): number {
  for (let attempt = 0; attempt < 24; attempt++) {
    const extra = chance(rng, 0.05)
    const minute = extra ? 90 + randInt(rng, 1, 5) : randInt(rng, 1, 90)
    if (!used.has(minute)) {
      used.add(minute)
      return minute
    }
  }
  const fallback = randInt(rng, 1, 90)
  used.add(fallback)
  return fallback
}

function event(
  minute: number,
  type: MatchEvent["type"],
  team: "home" | "away",
  player: string,
  extra: Partial<MatchEvent> = {},
): MatchEvent {
  return {
    minute,
    displayMinute: displayMinute(minute),
    type,
    team,
    player,
    ...extra,
  }
}

export function assignGoals(
  team: HistoricalTeam,
  goalCount: number,
  side: "home" | "away",
  rng: Rng,
  usedMinutes: Set<number>,
): MatchEvent[] {
  if (goalCount <= 0) return []
  const xi = starters(team)
  const taker = penaltyTaker(xi)
  const events: MatchEvent[] = []

  for (let i = 0; i < goalCount; i++) {
    const minute = uniqueMinute(rng, usedMinutes)
    const isPenalty = chance(rng, 0.08)
    const scorer = isPenalty ? taker : pickWeighted(rng, xi, scoringWeight)
    let assist: string | undefined
    if (!isPenalty && chance(rng, 0.74)) {
      const candidates = xi.filter((player) => player.id !== scorer.id)
      const creator = pickWeighted(rng, candidates, assistWeight)
      assist = creator.name
    }
    events.push(
      event(minute, "goal", side, scorer.name, {
        assist,
        detail: isPenalty ? "Penalty" : undefined,
      }),
    )
  }

  return events
}

export function assignCards(
  team: HistoricalTeam,
  side: "home" | "away",
  yellows: number,
  reds: number,
  rng: Rng,
  usedMinutes: Set<number>,
): MatchEvent[] {
  const xi = starters(team)
  const events: MatchEvent[] = []
  const usedPlayers = new Set<string>()

  const pickDefender = () => {
    const pool = xi.filter((player) => !usedPlayers.has(player.id))
    const weighted = pool.length > 0 ? pool : xi
    return pickWeighted(rng, weighted, (player) => {
      if (player.position === "GK") return 0.15
      if (["CB", "LCB", "RCB", "CDM", "LDM", "RDM"].includes(player.position)) return 1.4
      return 0.7
    })
  }

  for (let i = 0; i < yellows; i++) {
    const player = pickDefender()
    usedPlayers.add(player.id)
    events.push(event(uniqueMinute(rng, usedMinutes), "yellow", side, player.name))
  }

  for (let i = 0; i < reds; i++) {
    const player = pickDefender()
    events.push(event(uniqueMinute(rng, usedMinutes), "red", side, player.name, { detail: "Sent off" }))
  }

  return events
}

export function assignSubstitutions(
  team: HistoricalTeam,
  side: "home" | "away",
  rng: Rng,
  usedMinutes: Set<number>,
): MatchEvent[] {
  const xi = starters(team).filter((player) => player.position !== "GK")
  const available = bench(team)
  if (xi.length === 0 || available.length === 0) return []

  const count = Math.min(3, available.length)
  const outgoing = [...xi].sort((a, b) => a.overall - b.overall)
  const incoming = [...available].sort((a, b) => b.overall - a.overall)
  const events: MatchEvent[] = []

  for (let i = 0; i < count; i++) {
    const playerOut = outgoing[i]
    const playerIn = incoming[i]
    if (!playerOut || !playerIn) break
    const minute = 55 + randInt(rng, 0, 32)
    usedMinutes.add(minute)
    events.push(
      event(minute, "sub", side, playerIn.name, {
        playerIn: playerIn.name,
        playerOut: playerOut.name,
        detail: `${playerOut.name} → ${playerIn.name}`,
      }),
    )
  }

  return events
}

export function assignChancesAndSaves(
  team: HistoricalTeam,
  opponent: HistoricalTeam,
  side: "home" | "away",
  rng: Rng,
  usedMinutes: Set<number>,
): MatchEvent[] {
  const events: MatchEvent[] = []
  const xi = starters(team)
  const oppGk = starters(opponent).find((player) => player.position === "GK") ?? opponent.players[0]

  if (chance(rng, 0.55) && xi.length > 0) {
    const attacker = pickWeighted(rng, xi, scoringWeight)
    events.push(
      event(uniqueMinute(rng, usedMinutes), "chance", side, attacker.name, {
        detail: "Big chance missed",
      }),
    )
  }

  if (oppGk && chance(rng, 0.45)) {
    events.push(
      event(uniqueMinute(rng, usedMinutes), "save", side === "home" ? "away" : "home", oppGk.name, {
        detail: "Important save",
      }),
    )
  }

  return events
}

export function shotProfile(
  xg: number,
  goals: number,
  finishingQuality: number,
  rng: Rng,
): { shots: number; shotsOnTarget: number } {
  const conversion = 0.09 + (finishingQuality / 100) * 0.05
  let shots = Math.max(goals, Math.round(xg / conversion + randInt(rng, -2, 3)))
  shots = Math.max(goals, Math.min(28, shots))
  const extraOnTarget = poisson(Math.max(0.4, xg * 1.05), rng, 8)
  const shotsOnTarget = Math.max(goals, Math.min(shots, goals + extraOnTarget))
  return { shots, shotsOnTarget }
}

export function cornersFromShots(shots: number, width: number, rng: Rng): number {
  const base = shots * (0.32 + width / 500)
  return Math.max(0, Math.round(base + randInt(rng, -2, 2)))
}

export function foulsFromPressing(pressing: number, rng: Rng): number {
  return Math.max(6, Math.min(18, Math.round(pressing / 8 + randInt(rng, 2, 8))))
}

export function yellowsFromFouls(fouls: number, rng: Rng): number {
  return Math.min(5, poisson(fouls / 9, rng, 5))
}

export function maybeRed(rng: Rng): number {
  return chance(rng, 0.035) ? 1 : 0
}

export function passesFromPossession(possession: number, tempo: number, rng: Rng): number {
  const base = 280 + possession * 4.2 + tempo * 0.8
  return Math.round(base + randInt(rng, -25, 25))
}

