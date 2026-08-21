import { TeamBadge } from "@/components/teams/TeamCard"
import type { HistoricalTeam, SimulatedMatch } from "@/types"

export function MatchResult({
  match,
  home,
  away,
}: {
  match: SimulatedMatch
  home: HistoricalTeam
  away: HistoricalTeam
}) {
  const homeGoals = match.scorers.filter((goal) => goal.team === "home")
  const awayGoals = match.scorers.filter((goal) => goal.team === "away")
  const resultLabel =
    match.score.home > match.score.away
      ? `${home.clubName} win`
      : match.score.away > match.score.home
        ? `${away.clubName} win`
        : "Draw"

  return (
    <section className="border-2 border-gold bg-panel pixel-border">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-line bg-panel-2 px-4 py-3">
        <span className="font-display text-[10px] uppercase tracking-[0.18em] text-gold">
          Simulated Result · Seed {match.seed}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-muted">{resultLabel}</span>
      </div>
      <div className="grid gap-6 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:p-6">
        <TeamBadge code={home.clubCode} name={home.clubName} season={home.displaySeason} />
        <div className="text-center">
          <div className="font-display text-3xl tracking-[0.2em] text-gold sm:text-4xl">
            {match.score.home} – {match.score.away}
          </div>
          <div className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">Final</div>
        </div>
        <div className="sm:justify-self-end">
          <TeamBadge code={away.clubCode} name={away.clubName} season={away.displaySeason} />
        </div>
      </div>
      {match.scorers.length > 0 ? (
        <div className="grid gap-4 border-t-2 border-line px-4 py-3 font-mono text-sm sm:grid-cols-2">
          <ol>
            {homeGoals.length === 0 ? (
              <li className="text-muted">No goals</li>
            ) : (
              homeGoals.map((goal) => (
                <li key={`h-${goal.minute}-${goal.player}`} className="py-1">
                  <span className="text-gold">{goal.displayMinute}</span> {goal.player}
                  {goal.assist ? <span className="text-muted"> ({goal.assist})</span> : null}
                </li>
              ))
            )}
          </ol>
          <ol className="sm:text-right">
            {awayGoals.length === 0 ? (
              <li className="text-muted">No goals</li>
            ) : (
              awayGoals.map((goal) => (
                <li key={`a-${goal.minute}-${goal.player}`} className="py-1">
                  {goal.assist ? <span className="text-muted">({goal.assist}) </span> : null}
                  {goal.player} <span className="text-gold">{goal.displayMinute}</span>
                </li>
              ))
            )}
          </ol>
        </div>
      ) : (
        <p className="border-t-2 border-line px-4 py-3 text-sm text-muted">No goals in this simulation.</p>
      )}
    </section>
  )
}
