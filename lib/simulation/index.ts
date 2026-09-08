import type { HistoricalTeam, MatchEvent, MonteCarloResult, SimulatedMatch } from "@/types"
import { round1, round2 } from "@/lib/format"
import { buildMatchId } from "@/lib/match-id"
import { poisson, rngFromSeed } from "@/lib/simulation/random"
import { attackingFinishing, effectiveRatings } from "@/lib/simulation/ratings"
import { calculateExpectedGoals, derivePossession } from "@/lib/simulation/xg"
import {
  assignCards,
  assignChancesAndSaves,
  assignGoals,
  assignSubstitutions,
  buildPitchWindows,
  cornersFromShots,
  dropSubsAfterReds,
  foulsFromPressing,
  maybeRed,
  passesFromPossession,
  shotProfile,
  yellowsFromFouls,
} from "@/lib/simulation/events"

function tacticalNotes(home: HistoricalTeam, away: HistoricalTeam): string[] {
  const notes: string[] = []
  if (home.possession >= away.possession + 8) {
    notes.push(`${home.clubName} expected to control possession`)
  } else if (away.possession >= home.possession + 8) {
    notes.push(`${away.clubName} expected to control possession`)
  } else {
    notes.push("Both sides capable of controlling the tempo")
  }
  if (home.formation !== away.formation) {
    notes.push(`${home.clubName}'s ${home.formation} is matched against ${away.clubName}'s ${away.formation}`)
  }

  if (home.counterAttack >= 80) notes.push(`${home.clubName} dangerous in transition`)
  if (away.counterAttack >= 80) notes.push(`${away.clubName} dangerous in transition`)
  if (home.midfieldRating >= away.midfieldRating + 4) {
    notes.push(`${home.clubName} midfield quality is a decisive edge`)
  } else if (away.midfieldRating >= home.midfieldRating + 4) {
    notes.push(`${away.clubName} midfield quality is a decisive edge`)
  }
  if (Math.abs(home.overallRating - away.overallRating) <= 2) {
    notes.push("These sides are closely matched — the result should stay uncertain")
  }
  return notes.slice(0, 6)
}

export function simulateMatch(
  home: HistoricalTeam,
  away: HistoricalTeam,
  seed: string,
): SimulatedMatch {
  const rng = rngFromSeed(`${home.id}|${away.id}|${seed}`)
  const neutral = home.kind === "nation" && away.kind === "nation"
  const homeXG = calculateExpectedGoals(home, away, true, rng, { neutral })
  const awayXG = calculateExpectedGoals(away, home, false, rng, { neutral })
  const homeGoals = poisson(homeXG, rng)
  const awayGoals = poisson(awayXG, rng)

  const possession = derivePossession(home, away, rng)
  const homeShots = shotProfile(homeXG, homeGoals, attackingFinishing(home), rng)
  const awayShots = shotProfile(awayXG, awayGoals, attackingFinishing(away), rng)

  const homeFouls = foulsFromPressing(away.pressing * 0.35 + home.pressing * 0.65, rng)
  const awayFouls = foulsFromPressing(home.pressing * 0.35 + away.pressing * 0.65, rng)
  const homeYellows = yellowsFromFouls(homeFouls, rng)
  const awayYellows = yellowsFromFouls(awayFouls, rng)
  const homeReds = maybeRed(rng)
  const awayReds = maybeRed(rng)

  const usedMinutes = new Set<number>()
  const homeSubs = assignSubstitutions(home, "home", rng, usedMinutes)
  const awaySubs = assignSubstitutions(away, "away", rng, usedMinutes)
  const homeWindowsAfterSubs = buildPitchWindows(home, [], homeSubs)
  const awayWindowsAfterSubs = buildPitchWindows(away, [], awaySubs)
  const homeCards = assignCards(home, "home", homeYellows, homeReds, rng, usedMinutes, homeWindowsAfterSubs)
  const awayCards = assignCards(away, "away", awayYellows, awayReds, rng, usedMinutes, awayWindowsAfterSubs)
  const homeRedsEvents = homeCards.filter((item) => item.type === "red")
  const awayRedsEvents = awayCards.filter((item) => item.type === "red")
  const homeSubsLive = dropSubsAfterReds(homeSubs, homeRedsEvents)
  const awaySubsLive = dropSubsAfterReds(awaySubs, awayRedsEvents)
  const homeWindows = buildPitchWindows(home, homeRedsEvents, homeSubsLive)
  const awayWindows = buildPitchWindows(away, awayRedsEvents, awaySubsLive)

  const events: MatchEvent[] = [
    ...assignGoals(home, homeGoals, "home", rng, usedMinutes, homeWindows),
    ...assignGoals(away, awayGoals, "away", rng, usedMinutes, awayWindows),
    ...homeCards,
    ...awayCards,
    ...homeSubsLive,
    ...awaySubsLive,
    ...assignChancesAndSaves(home, away, "home", rng, usedMinutes, homeWindows),
    ...assignChancesAndSaves(away, home, "away", rng, usedMinutes, awayWindows),
  ]

  events.sort((a, b) => a.minute - b.minute || a.type.localeCompare(b.type))

  const scorers = events
    .filter((item) => item.type === "goal")
    .map((item) => ({
      minute: item.minute,
      displayMinute: item.displayMinute,
      player: item.player,
      assist: item.assist,
      team: item.team,
    }))

  return {
    id: buildMatchId(home.id, away.id, seed),
    seed,
    homeTeamId: home.id,
    awayTeamId: away.id,
    homeTeam: `${home.clubName} ${home.displaySeason}`,
    awayTeam: `${away.clubName} ${away.displaySeason}`,
    score: { home: homeGoals, away: awayGoals },
    events,
    scorers,
    tacticalNotes: tacticalNotes(home, away),
    stats: {
      possession,
      shots: [homeShots.shots, awayShots.shots],
      shotsOnTarget: [homeShots.shotsOnTarget, awayShots.shotsOnTarget],
      xg: [homeXG, awayXG],
      corners: [
        cornersFromShots(homeShots.shots, home.width, rng),
        cornersFromShots(awayShots.shots, away.width, rng),
      ],
      fouls: [homeFouls, awayFouls],
      yellowCards: [homeYellows, awayYellows],
      redCards: [homeReds, awayReds],
      passes: [
        passesFromPossession(possession[0], home.tempo, rng),
        passesFromPossession(possession[1], away.tempo, rng),
      ],
    },
  }
}

function topFromMap(map: Map<string, number>, limit: number) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([player, goals]) => ({ player, goals }))
}

function topAssistsFromMap(map: Map<string, number>, limit: number) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([player, assists]) => ({ player, assists }))
}

export const BATCH_RUNS = 1000
const ASYNC_CHUNK = 40

type BatchAcc = {
  homeWins: number
  draws: number
  awayWins: number
  homeGoals: number
  awayGoals: number
  homeXg: number
  awayXg: number
  homeShots: number
  awayShots: number
  homePoss: number
  awayPoss: number
  btts: number
  over25: number
  homeClean: number
  awayClean: number
  scoreCounts: Map<string, number>
  homeScorers: Map<string, number>
  awayScorers: Map<string, number>
  homeAssists: Map<string, number>
  awayAssists: Map<string, number>
  samples: Array<{ home: number; away: number }>
  matches: SimulatedMatch[]
}

function emptyBatch(): BatchAcc {
  return {
    homeWins: 0,
    draws: 0,
    awayWins: 0,
    homeGoals: 0,
    awayGoals: 0,
    homeXg: 0,
    awayXg: 0,
    homeShots: 0,
    awayShots: 0,
    homePoss: 0,
    awayPoss: 0,
    btts: 0,
    over25: 0,
    homeClean: 0,
    awayClean: 0,
    scoreCounts: new Map(),
    homeScorers: new Map(),
    awayScorers: new Map(),
    homeAssists: new Map(),
    awayAssists: new Map(),
    samples: [],
    matches: [],
  }
}

function addMatch(acc: BatchAcc, match: SimulatedMatch, retain: boolean) {
  if (retain) acc.matches.push(match)
  acc.homeGoals += match.score.home
  acc.awayGoals += match.score.away
  acc.homeXg += match.stats.xg[0]
  acc.awayXg += match.stats.xg[1]
  acc.homeShots += match.stats.shots[0]
  acc.awayShots += match.stats.shots[1]
  acc.homePoss += match.stats.possession[0]
  acc.awayPoss += match.stats.possession[1]
  if (match.score.home > 0 && match.score.away > 0) acc.btts += 1
  if (match.score.home + match.score.away >= 3) acc.over25 += 1
  if (match.score.away === 0) acc.homeClean += 1
  if (match.score.home === 0) acc.awayClean += 1
  if (match.score.home > match.score.away) acc.homeWins += 1
  else if (match.score.home < match.score.away) acc.awayWins += 1
  else acc.draws += 1
  const key = `${match.score.home}-${match.score.away}`
  acc.scoreCounts.set(key, (acc.scoreCounts.get(key) ?? 0) + 1)
  if (acc.samples.length < 24) acc.samples.push({ home: match.score.home, away: match.score.away })
  for (const scorer of match.scorers) {
    const bucket = scorer.team === "home" ? acc.homeScorers : acc.awayScorers
    bucket.set(scorer.player, (bucket.get(scorer.player) ?? 0) + 1)
    if (scorer.assist) {
      const assistBucket = scorer.team === "home" ? acc.homeAssists : acc.awayAssists
      assistBucket.set(scorer.assist, (assistBucket.get(scorer.assist) ?? 0) + 1)
    }
  }
}

function finalizeBatch(
  acc: BatchAcc,
  home: HistoricalTeam,
  away: HistoricalTeam,
  runs: number,
  retain: boolean,
): MonteCarloResult & { matches?: SimulatedMatch[] } {
  const scorelines = [...acc.scoreCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([score, count]) => ({
      score,
      count,
      pct: round1((count / runs) * 100),
    }))
  const result: MonteCarloResult = {
    runs,
    homeTeam: `${home.clubName} ${home.displaySeason}`,
    awayTeam: `${away.clubName} ${away.displaySeason}`,
    homeClub: home.clubName,
    awayClub: away.clubName,
    homeWins: acc.homeWins,
    draws: acc.draws,
    awayWins: acc.awayWins,
    homeWinPct: round1((acc.homeWins / runs) * 100),
    drawPct: round1((acc.draws / runs) * 100),
    awayWinPct: round1((acc.awayWins / runs) * 100),
    avgHomeGoals: round2(acc.homeGoals / runs),
    avgAwayGoals: round2(acc.awayGoals / runs),
    mostCommonScore: scorelines[0]?.score ?? "0-0",
    scorelines,
    topScorers: {
      home: topFromMap(acc.homeScorers, 4),
      away: topFromMap(acc.awayScorers, 4),
    },
    topAssists: {
      home: topAssistsFromMap(acc.homeAssists, 4),
      away: topAssistsFromMap(acc.awayAssists, 4),
    },
    samples: acc.samples,
    avgHomeXg: round2(acc.homeXg / runs),
    avgAwayXg: round2(acc.awayXg / runs),
    avgHomeShots: round1(acc.homeShots / runs),
    avgAwayShots: round1(acc.awayShots / runs),
    avgHomePoss: Math.round(acc.homePoss / runs),
    avgAwayPoss: Math.round(acc.awayPoss / runs),
    bttsPct: round1((acc.btts / runs) * 100),
    over25Pct: round1((acc.over25 / runs) * 100),
    homeCleanPct: round1((acc.homeClean / runs) * 100),
    awayCleanPct: round1((acc.awayClean / runs) * 100),
  }
  if (retain) return { ...result, matches: acc.matches }
  return result
}

export function simulateMany(
  home: HistoricalTeam,
  away: HistoricalTeam,
  runs: number,
  baseSeed: string,
  options: { retainMatches: true },
): MonteCarloResult & { matches: SimulatedMatch[] }
export function simulateMany(
  home: HistoricalTeam,
  away: HistoricalTeam,
  runs: number,
  baseSeed: string,
  options?: { retainMatches?: boolean },
): MonteCarloResult
export function simulateMany(
  home: HistoricalTeam,
  away: HistoricalTeam,
  runs: number,
  baseSeed: string,
  options?: { retainMatches?: boolean },
): MonteCarloResult & { matches?: SimulatedMatch[] } {
  const acc = emptyBatch()
  const retain = Boolean(options?.retainMatches)
  for (let i = 0; i < runs; i += 1) {
    addMatch(acc, simulateMatch(home, away, `${baseSeed}:${i}`), retain)
  }
  return finalizeBatch(acc, home, away, runs, retain)
}

export async function simulateManyAsync(
  home: HistoricalTeam,
  away: HistoricalTeam,
  runs: number,
  baseSeed: string,
  onProgress?: (done: number, total: number) => void,
): Promise<MonteCarloResult> {
  const acc = emptyBatch()
  for (let i = 0; i < runs; i += 1) {
    addMatch(acc, simulateMatch(home, away, `${baseSeed}:${i}`), false)
    if ((i + 1) % ASYNC_CHUNK === 0 || i + 1 === runs) {
      onProgress?.(i + 1, runs)
      await new Promise<void>((resolve) => setTimeout(resolve, 0))
    }
  }
  return finalizeBatch(acc, home, away, runs, false)
}

export function toCommentaryPayload(match: SimulatedMatch, home: HistoricalTeam, away: HistoricalTeam) {
  return {
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    score: match.score,
    events: match.events
      .filter((event) => event.type === "goal" || event.type === "red")
      .map((event) => ({
        minute: event.minute,
        type: event.type,
        player: event.player,
        team: event.team === "home" ? home.clubName : away.clubName,
        assist: event.assist,
      })),
    stats: {
      possession: match.stats.possession,
      shots: match.stats.shots,
      xg: match.stats.xg,
    },
    squads: {
      home: home.players.map((player) => player.name),
      away: away.players.map((player) => player.name),
    },
  }
}

export { effectiveRatings }
