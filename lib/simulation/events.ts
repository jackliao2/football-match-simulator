import type { HistoricalTeam, MatchEvent, Player } from "@/types"
import { displayMinute } from "@/lib/format"
import { chance, pickWeighted, poisson, randInt, type Rng } from "@/lib/simulation/random"
import { assistWeight, bench, penaltyTaker, scoringWeight, starters } from "@/lib/simulation/ratings"

export interface PitchWindow {
  player: Player
  onFrom: number
  offAt: number
}

function sampleMinute(rng: Rng, min: number, max: number, skew: "goal" | "uniform"): number {
  if (skew === "goal") {
    if (max >= 90 && chance(rng, 0.05)) return 90 + randInt(rng, 1, 5)
    const raw = Math.ceil(90 * Math.pow(rng(), 0.85))
    return Math.max(min, Math.min(Math.min(90, max), raw))
  }
  if (max >= 90 && min <= 90 && chance(rng, 0.05)) return 90 + randInt(rng, 1, 5)
  return randInt(rng, min, Math.min(90, max))
}

function uniqueMinute(
  rng: Rng,
  used: Set<number>,
  min = 1,
  max = 90,
  skew: "goal" | "uniform" = "uniform",
): number {
  for (let attempt = 0; attempt < 24; attempt++) {
    const minute = sampleMinute(rng, min, max, skew)
    if (!used.has(minute)) {
      used.add(minute)
      return minute
    }
  }
  const fallback = randInt(rng, min, Math.min(90, max))
  used.add(fallback)
  return fallback
}

function positionGroup(position: string): string {
  if (position === "GK") return "gk"
  if (["CB", "LCB", "RCB"].includes(position)) return "cb"
  if (["LB", "RB", "LWB", "RWB"].includes(position)) return "fb"
  if (["ST", "CF", "SS"].includes(position)) return "st"
  if (["LW", "RW", "LAM", "RAM", "LM", "RM"].includes(position)) return "wing"
  if (position === "CAM") return "cam"
  return "mid"
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

export function playersOnPitch(windows: PitchWindow[], minute: number): Player[] {
  return windows
    .filter((item) => item.onFrom <= minute && minute < item.offAt)
    .map((item) => item.player)
}

export function buildPitchWindows(
  team: HistoricalTeam,
  reds: MatchEvent[],
  subs: MatchEvent[],
): PitchWindow[] {
  const windows: PitchWindow[] = starters(team).map((player) => ({
    player,
    onFrom: 0,
    offAt: 96,
  }))

  for (const sub of subs) {
    const outgoing = windows.find((item) => item.player.name === sub.playerOut)
    if (outgoing) outgoing.offAt = Math.min(outgoing.offAt, sub.minute + 1)
    const incoming = team.players.find((player) => player.name === sub.playerIn)
    if (incoming) windows.push({ player: incoming, onFrom: sub.minute, offAt: 96 })
  }

  for (const red of reds) {
    const window = windows.find(
      (item) => item.player.name === red.player && item.onFrom <= red.minute && red.minute < item.offAt,
    )
    if (window) window.offAt = Math.min(window.offAt, red.minute)
  }

  return windows
}

export function dropSubsAfterReds(subs: MatchEvent[], reds: MatchEvent[]): MatchEvent[] {
  return subs.filter((sub) => {
    const sendingOff = reds.find((red) => red.player === sub.playerOut && red.team === sub.team)
    return !sendingOff || sendingOff.minute > sub.minute
  })
}

function poolAt(team: HistoricalTeam, windows: PitchWindow[] | undefined, minute: number): Player[] {
  if (!windows) return starters(team)
  const onPitch = playersOnPitch(windows, minute)
  return onPitch.length > 0 ? onPitch : starters(team)
}

export function assignGoals(
  team: HistoricalTeam,
  goalCount: number,
  side: "home" | "away",
  rng: Rng,
  usedMinutes: Set<number>,
  windows?: PitchWindow[],
): MatchEvent[] {
  if (goalCount <= 0) return []
  const events: MatchEvent[] = []
  const weight = (player: Player) => scoringWeight(player, team.aerialThreat)

  for (let i = 0; i < goalCount; i++) {
    const minute = uniqueMinute(rng, usedMinutes, 1, 90, "goal")
    const available = poolAt(team, windows, minute)
    const isPenalty = chance(rng, 0.08)
    const scorer = isPenalty ? penaltyTaker(team, available) : pickWeighted(rng, available, weight)
    let assist: string | undefined
    if (!isPenalty && chance(rng, 0.74)) {
      const candidates = available.filter((player) => player.id !== scorer.id)
      if (candidates.length > 0) {
        const creator = pickWeighted(rng, candidates, assistWeight)
        assist = creator.name
      }
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
  windows?: PitchWindow[],
): MatchEvent[] {
  const events: MatchEvent[] = []
  const usedPlayers = new Set<string>()

  const pickDefender = (minute: number) => {
    const available = poolAt(team, windows, minute)
    const unused = available.filter((player) => !usedPlayers.has(player.id))
    const weighted = unused.length > 0 ? unused : available
    return pickWeighted(rng, weighted, (player) => {
      if (player.position === "GK") return 0.15
      if (["CB", "LCB", "RCB", "CDM", "LDM", "RDM"].includes(player.position)) return 1.4
      return 0.7
    })
  }

  for (let i = 0; i < yellows; i++) {
    const minute = uniqueMinute(rng, usedMinutes)
    const player = pickDefender(minute)
    usedPlayers.add(player.id)
    events.push(event(minute, "yellow", side, player.name))
  }

  for (let i = 0; i < reds; i++) {
    const minute = uniqueMinute(rng, usedMinutes)
    const player = pickDefender(minute)
    events.push(event(minute, "red", side, player.name, { detail: "Sent off" }))
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
  const available = [...bench(team)]
  if (xi.length === 0 || available.length === 0) return []

  const count = Math.min(3, available.length)
  const events: MatchEvent[] = []
  const usedOut = new Set<string>()
  const usedIn = new Set<string>()

  for (let i = 0; i < count; i++) {
    const remaining = xi.filter((player) => !usedOut.has(player.id))
    if (remaining.length === 0) break
    const playerOut = pickWeighted(rng, remaining, (player) => Math.max(4, 102 - player.overall))
    usedOut.add(playerOut.id)
    const group = positionGroup(playerOut.position)
    const sameGroup = available.filter(
      (player) => !usedIn.has(player.id) && positionGroup(player.position) === group,
    )
    const pool =
      sameGroup.length > 0
        ? sameGroup
        : available.filter((player) => !usedIn.has(player.id))
    if (pool.length === 0) break
    const playerIn = pickWeighted(rng, pool, (player) => Math.max(4, player.overall - 58))
    usedIn.add(playerIn.id)
    const minute = uniqueMinute(rng, usedMinutes, 55, 88)
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
  windows?: PitchWindow[],
): MatchEvent[] {
  const events: MatchEvent[] = []
  const oppGk = starters(opponent).find((player) => player.position === "GK") ?? opponent.players[0]

  if (chance(rng, 0.55)) {
    const minute = uniqueMinute(rng, usedMinutes)
    const available = poolAt(team, windows, minute)
    if (available.length > 0) {
      const attacker = pickWeighted(rng, available, (player) => scoringWeight(player, team.aerialThreat))
      events.push(
        event(minute, "chance", side, attacker.name, {
          detail: "Big chance missed",
        }),
      )
    }
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
  let shots = Math.max(goals + 2, Math.round(xg / conversion + randInt(rng, -1, 3)))
  shots = Math.max(goals, Math.min(28, shots))
  const extraOnTarget = 1 + poisson(Math.max(0.6, xg * 0.85), rng, 6)
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
