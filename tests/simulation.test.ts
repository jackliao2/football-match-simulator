import { describe, expect, it } from "vitest"
import { getTeam, teams } from "@/data/teams"
import { simulateMany, simulateMatch } from "@/lib/simulation"
import { penaltyTaker, scoringWeight, starters } from "@/lib/simulation/ratings"

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

  it("lets finishing quality beat a lower-rated centre-forward role", () => {
    const france = getTeam("france-1998")!
    const argentina = getTeam("argentina-2022")!
    const named = (team: typeof france, name: string) => team.players.find((player) => player.name === name)!

    expect(scoringWeight(named(france, "Thierry Henry"), france.aerialThreat)).toBeGreaterThan(
      scoringWeight(named(france, "Stéphane Guivarc'h"), france.aerialThreat),
    )
    expect(scoringWeight(named(argentina, "Lionel Messi"), argentina.aerialThreat)).toBeGreaterThan(
      scoringWeight(named(argentina, "Julián Álvarez"), argentina.aerialThreat),
    )
    expect(penaltyTaker(france, starters(france)).name).toBe("Zinedine Zidane")
    expect(penaltyTaker(argentina, starters(argentina)).name).toBe("Lionel Messi")

    const franceTotal = starters(france).reduce((sum, player) => sum + scoringWeight(player, france.aerialThreat), 0)
    const franceCbShare =
      starters(france)
        .filter((player) => ["CB", "LCB", "RCB"].includes(player.position))
        .reduce((sum, player) => sum + scoringWeight(player, france.aerialThreat), 0) / franceTotal
    expect(franceCbShare).toBeGreaterThanOrEqual(0.03)
    expect(franceCbShare).toBeLessThanOrEqual(0.08)
  })

  it("does not make Guivarc'h France's leading scorer against Argentina 2022", () => {
    const france = getTeam("france-1998")!
    const argentina = getTeam("argentina-2022")!
    const result = simulateMany(france, argentina, 2_000, "golden-boot-calibration")

    expect(result.topScorers.away[0]?.player).toBe("Lionel Messi")
    expect(result.topScorers.home[0]?.player).not.toBe("Stéphane Guivarc'h")
  })

  it("never credits a goal to a player who is already off the pitch", () => {
    const home = getTeam("france-1998")!
    const away = getTeam("argentina-2022")!

    for (let index = 0; index < 80; index += 1) {
      const match = simulateMatch(home, away, `window:${index}`)
      const offAt = new Map<string, number>()
      const onFrom = new Map<string, number>()

      for (const event of match.events) {
        if (event.type === "red") offAt.set(`${event.team}:${event.player}`, event.minute)
        if (event.type === "sub" && event.playerOut) {
          offAt.set(`${event.team}:${event.playerOut}`, event.minute + 1)
        }
        if (event.type === "sub" && event.playerIn) {
          onFrom.set(`${event.team}:${event.playerIn}`, event.minute)
        }
      }

      for (const goal of match.scorers) {
        const key = `${goal.team}:${goal.player}`
        expect(goal.minute).toBeLessThan(offAt.get(key) ?? 200)
        expect(goal.minute).toBeGreaterThanOrEqual(onFrom.get(key) ?? 0)
      }
    }
  })

  it("places more goals in the second half than the first", () => {
    const home = getTeam("france-1998")!
    const away = getTeam("argentina-2022")!
    let first = 0
    let second = 0

    for (let index = 0; index < 200; index += 1) {
      const match = simulateMatch(home, away, `minutes:${index}`)
      for (const goal of match.scorers) {
        if (goal.minute <= 45) first += 1
        else second += 1
      }
    }

    expect(second).toBeGreaterThan(first)
  })
})
