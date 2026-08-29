import { describe, expect, it } from "vitest"
import { getTeam, teams } from "@/data/teams"
import { simulateMany, simulateMatch } from "@/lib/simulation"

const home = getTeam("barcelona-2008-09")!
const away = getTeam("real-madrid-2016-17")!

describe("team catalogue", () => {
  it("contains valid unique starting elevens", () => {
    expect(teams.length).toBeGreaterThan(100)

    for (const team of teams) {
      expect(team.startingXI, team.id).toHaveLength(11)
      expect(new Set(team.startingXI).size, team.id).toBe(11)
      const playerIds = new Set(team.players.map((player) => player.id))
      for (const starter of team.startingXI) expect(playerIds.has(starter), team.id).toBe(true)
    }
  })
})

describe("simulation engine", () => {
  it("replays the same seed exactly", () => {
    const first = simulateMatch(home, away, "a71d92")
    const replay = simulateMatch(home, away, "a71d92")

    expect(replay).toEqual(first)
  })

  it("keeps score, events and statistics internally consistent", () => {
    const match = simulateMatch(home, away, "36c168")
    const homePlayers = new Set(home.players.map((player) => player.name))
    const awayPlayers = new Set(away.players.map((player) => player.name))

    expect(match.stats.possession[0] + match.stats.possession[1]).toBe(100)
    expect(match.scorers.filter((goal) => goal.team === "home")).toHaveLength(match.score.home)
    expect(match.scorers.filter((goal) => goal.team === "away")).toHaveLength(match.score.away)
    expect(match.stats.shotsOnTarget[0]).toBeLessThanOrEqual(match.stats.shots[0])
    expect(match.stats.shotsOnTarget[1]).toBeLessThanOrEqual(match.stats.shots[1])
    expect(match.events.map((event) => event.minute)).toEqual(
      [...match.events].map((event) => event.minute).sort((a, b) => a - b),
    )
    for (const goal of match.scorers) {
      const roster = goal.team === "home" ? homePlayers : awayPlayers
      expect(roster.has(goal.player), goal.player).toBe(true)
    }
  })

  it("returns a complete 100-match distribution", () => {
    const result = simulateMany(home, away, 100, "batch1")

    expect(result.homeWins + result.draws + result.awayWins).toBe(100)
    expect(result.homeWinPct + result.drawPct + result.awayWinPct).toBe(100)
    expect(result.avgHomeGoals).toBeGreaterThanOrEqual(0)
    expect(result.avgAwayGoals).toBeGreaterThanOrEqual(0)
    expect(result.scorelines.length).toBeGreaterThan(0)
  })

  it("makes a ten-point overall gap meaningful without removing upsets", () => {
    const usa = getTeam("usa-2002")!
    const madrid = getTeam("real-madrid-2013-14")!
    const result = simulateMany(usa, madrid, 2_000, "quality-gap-calibration")

    expect(madrid.overallRating - usa.overallRating).toBeGreaterThanOrEqual(10)
    expect(result.awayWinPct).toBeGreaterThanOrEqual(60)
    expect(result.homeWinPct).toBeLessThanOrEqual(20)
    expect(result.homeWinPct).toBeGreaterThan(0)
  })
})
