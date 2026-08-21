import type { HistoricalTeam, MatchEvent, SimulatedMatch } from "@/types"
import { round1, round2 } from "@/lib/format"
import { buildMatchId } from "@/lib/match-id"
import { poisson, rngFromSeed } from "@/lib/simulation/random"
import { effectiveRatings, starters } from "@/lib/simulation/ratings"
import { calculateExpectedGoals, derivePossession } from "@/lib/simulation/xg"
import {
  assignCards,
  assignChancesAndSaves,
  assignGoals,
  assignSubstitutions,
  cornersFromShots,
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
  const homeXG = calculateExpectedGoals(home, away, true, rng)
  const awayXG = calculateExpectedGoals(away, home, false, rng)
  const homeGoals = poisson(homeXG, rng)
  const awayGoals = poisson(awayXG, rng)

  const usedMinutes = new Set<number>()
  const events: MatchEvent[] = [
    ...assignGoals(home, homeGoals, "home", rng, usedMinutes),
    ...assignGoals(away, awayGoals, "away", rng, usedMinutes),
  ]

  const possession = derivePossession(home, away, rng)
  const homeShots = shotProfile(
    homeXG,
    homeGoals,
    starters(home).reduce((sum, player) => sum + (player.finishing ?? player.overall), 0) /
      Math.max(1, starters(home).length),
    rng,
  )
  const awayShots = shotProfile(
    awayXG,
    awayGoals,
    starters(away).reduce((sum, player) => sum + (player.finishing ?? player.overall), 0) /
      Math.max(1, starters(away).length),
    rng,
  )

  const homeFouls = foulsFromPressing(away.pressing * 0.35 + home.pressing * 0.65, rng)
  const awayFouls = foulsFromPressing(home.pressing * 0.35 + away.pressing * 0.65, rng)
  const homeYellows = yellowsFromFouls(homeFouls, rng)
  const awayYellows = yellowsFromFouls(awayFouls, rng)
  const homeReds = maybeRed(rng)
  const awayReds = maybeRed(rng)

  events.push(
    ...assignCards(home, "home", homeYellows, homeReds, rng, usedMinutes),
    ...assignCards(away, "away", awayYellows, awayReds, rng, usedMinutes),
    ...assignSubstitutions(home, "home", rng, usedMinutes),
    ...assignSubstitutions(away, "away", rng, usedMinutes),
    ...assignChancesAndSaves(home, away, "home", rng, usedMinutes),
    ...assignChancesAndSaves(away, home, "away", rng, usedMinutes),
  )

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

export function simulateMany(
  home: HistoricalTeam,
  away: HistoricalTeam,
  runs: number,
  baseSeed: string,
) {
  let homeWins = 0
  let draws = 0
  let awayWins = 0
  let homeGoals = 0
  let awayGoals = 0
  const scoreCounts = new Map<string, number>()

  for (let i = 0; i < runs; i++) {
    const match = simulateMatch(home, away, `${baseSeed}:${i}`)
    homeGoals += match.score.home
    awayGoals += match.score.away
    if (match.score.home > match.score.away) homeWins += 1
    else if (match.score.home < match.score.away) awayWins += 1
    else draws += 1
    const key = `${match.score.home}-${match.score.away}`
    scoreCounts.set(key, (scoreCounts.get(key) ?? 0) + 1)
  }

  let mostCommonScore = "0-0"
  let most = -1
  for (const [score, count] of scoreCounts) {
    if (count > most) {
      most = count
      mostCommonScore = score
    }
  }

  return {
    runs,
    homeTeam: `${home.clubName} ${home.displaySeason}`,
    awayTeam: `${away.clubName} ${away.displaySeason}`,
    homeWins,
    draws,
    awayWins,
    homeWinPct: round1((homeWins / runs) * 100),
    drawPct: round1((draws / runs) * 100),
    awayWinPct: round1((awayWins / runs) * 100),
    avgHomeGoals: round2(homeGoals / runs),
    avgAwayGoals: round2(awayGoals / runs),
    mostCommonScore,
  }
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
