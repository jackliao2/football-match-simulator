import type { SimulatedMatch } from "@/types"

function winnerLine(match: SimulatedMatch): string {
  if (match.score.home > match.score.away) {
    return `${match.homeTeam} won a simulated contest ${match.score.home}–${match.score.away} against ${match.awayTeam}.`
  }
  if (match.score.away > match.score.home) {
    return `${match.awayTeam} won a simulated contest ${match.score.away}–${match.score.home} against ${match.homeTeam}.`
  }
  return `${match.homeTeam} and ${match.awayTeam} drew ${match.score.home}–${match.score.away} in this simulation.`
}

function goalParagraph(match: SimulatedMatch): string {
  const goals = match.scorers
  if (goals.length === 0) {
    return "Neither side could force the ball over the line. The simulation produced a tense, goalless night rather than a shootout."
  }
  return goals
    .map((goal) => {
      const side = goal.team === "home" ? match.homeTeam : match.awayTeam
      const assist = goal.assist ? `, created by ${goal.assist}` : ""
      return `${goal.displayMinute} ${goal.player} (${side}${assist}).`
    })
    .join(" ")
}

export function templateMatchReport(match: SimulatedMatch): string {
  const [homePoss, awayPoss] = match.stats.possession
  const [homeShots, awayShots] = match.stats.shots
  const [homeXg, awayXg] = match.stats.xg
  const notes = match.tacticalNotes.join(" ")
  const closer =
    match.score.home === match.score.away
      ? "On another seed the result could swing. That is the point of a historical simulator: the debate stays alive."
      : "Replay the fixture and the scoreline can move. These teams are close enough that one seed should never pretend to settle football history."

  return [
    winnerLine(match),
    "This was not a real historical match. It is a model result generated from squad quality, style ratings and a random seed — written up here as a match report.",
    notes,
    `The engine gave ${match.homeTeam} ${homeXg.toFixed(2)} expected goals and ${match.awayTeam} ${awayXg.toFixed(2)}. Possession landed ${homePoss}% to ${awayPoss}%, with shots at ${homeShots}–${awayShots}.`,
    `Scorers in this run: ${goalParagraph(match)}`,
    closer,
  ].join("\n\n")
}
