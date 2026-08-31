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
  return notes.slice(0, 4)
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

  const homeSubs = assignSubstitutions(home, "home", rng, new Set())
  const awaySubs = assignSubstitutions(away, "away", rng, new Set())
  const homeWindowsAfterSubs = buildPitchWindows(home, [], homeSubs)
  const awayWindowsAfterSubs = buildPitchWindows(away, [], awaySubs)
  const homeCards = assignCards(home, "home", homeYellows, homeReds, rng, new Set(), homeWindowsAfterSubs)
  const awayCards = assignCards(away, "away", awayYellows, awayReds, rng, new Set(), awayWindowsAfterSubs)
  const homeRedsEvents = homeCards.filter((item) => item.type === "red")
  const awayRedsEvents = awayCards.filter((item) => item.type === "red")
  const homeSubsLive = dropSubsAfterReds(homeSubs, homeRedsEvents)
  const awaySubsLive = dropSubsAfterReds(awaySubs, awayRedsEvents)
  const homeWindows = buildPitchWindows(home, homeRedsEvents, homeSubsLive)
  const awayWindows = buildPitchWindows(away, awayRedsEvents, awaySubsLive)

  const events: MatchEvent[] = [
    ...assignGoals(home, homeGoals, "home", rng, new Set(), homeWindows),
    ...assignGoals(away, awayGoals, "away", rng, new Set(), awayWindows),
    ...homeCards,
    ...awayCards,
    ...homeSubsLive,
    ...awaySubsLive,
    ...assignChancesAndSaves(home, away, "home", rng, new Set(), homeWindows),
    ...assignChancesAndSaves(away, home, "away", rng, new Set(), awayWindows),
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
  let homeWins = 0
  let draws = 0
  let awayWins = 0
  let homeGoals = 0
  let awayGoals = 0
  let homeXg = 0
  let awayXg = 0
  let homeShots = 0
  let awayShots = 0
  let homePoss = 0
  let awayPoss = 0
  let btts = 0
  let over25 = 0
  let homeClean = 0
  let awayClean = 0
  const scoreCounts = new Map<string, number>()
  const homeScorers = new Map<string, number>()
  const awayScorers = new Map<string, number>()
  const homeAssists = new Map<string, number>()
  const awayAssists = new Map<string, number>()
  const samples: Array<{ home: number; away: number }> = []
  const matches: SimulatedMatch[] = []

  for (let i = 0; i < runs; i++) {
    const match = simulateMatch(home, away, `${baseSeed}:${i}`)
    if (options?.retainMatches) matches.push(match)
    homeGoals += match.score.home
    awayGoals += match.score.away
    homeXg += match.stats.xg[0]
    awayXg += match.stats.xg[1]
    homeShots += match.stats.shots[0]
    awayShots += match.stats.shots[1]
    homePoss += match.stats.possession[0]
    awayPoss += match.stats.possession[1]
    if (match.score.home > 0 && match.score.away > 0) btts += 1
    if (match.score.home + match.score.away >= 3) over25 += 1
    if (match.score.away === 0) homeClean += 1
    if (match.score.home === 0) awayClean += 1
    if (match.score.home > match.score.away) homeWins += 1
    else if (match.score.home < match.score.away) awayWins += 1
    else draws += 1
    const key = `${match.score.home}-${match.score.away}`
    scoreCounts.set(key, (scoreCounts.get(key) ?? 0) + 1)
    if (samples.length < 24) samples.push({ home: match.score.home, away: match.score.away })
    for (const scorer of match.scorers) {
      const bucket = scorer.team === "home" ? homeScorers : awayScorers
      bucket.set(scorer.player, (bucket.get(scorer.player) ?? 0) + 1)
      if (scorer.assist) {
        const assistBucket = scorer.team === "home" ? homeAssists : awayAssists
        assistBucket.set(scorer.assist, (assistBucket.get(scorer.assist) ?? 0) + 1)
      }
    }
  }

  const scorelines = [...scoreCounts.entries()]
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
    homeWins,
    draws,
    awayWins,
    homeWinPct: round1((homeWins / runs) * 100),
    drawPct: round1((draws / runs) * 100),
    awayWinPct: round1((awayWins / runs) * 100),
    avgHomeGoals: round2(homeGoals / runs),
    avgAwayGoals: round2(awayGoals / runs),
    mostCommonScore: scorelines[0]?.score ?? "0-0",
    scorelines,
    topScorers: {
      home: topFromMap(homeScorers, 4),
      away: topFromMap(awayScorers, 4),
    },
    topAssists: {
      home: topAssistsFromMap(homeAssists, 4),
      away: topAssistsFromMap(awayAssists, 4),
    },
    samples,
    avgHomeXg: round2(homeXg / runs),
    avgAwayXg: round2(awayXg / runs),
    avgHomeShots: round1(homeShots / runs),
    avgAwayShots: round1(awayShots / runs),
    avgHomePoss: Math.round(homePoss / runs),
    avgAwayPoss: Math.round(awayPoss / runs),
    bttsPct: round1((btts / runs) * 100),
    over25Pct: round1((over25 / runs) * 100),
    homeCleanPct: round1((homeClean / runs) * 100),
    awayCleanPct: round1((awayClean / runs) * 100),
  }

  if (options?.retainMatches) return { ...result, matches }
  return result
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
