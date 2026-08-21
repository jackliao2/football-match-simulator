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
  return (
    <section className="border-2 border-gold bg-panel pixel-border">
      <div className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.18em] text-gold">
        Simulated Result · Seed {match.seed}
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
        <ol className="border-t-2 border-line px-4 py-3 font-mono text-sm">
          {match.scorers.map((goal) => (
            <li key={`${goal.team}-${goal.minute}-${goal.player}`} className="py-1">
              <span className="text-gold">{goal.displayMinute}</span>{" "}
              <span>{goal.player}</span>
              {goal.assist ? <span className="text-muted"> ({goal.assist})</span> : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="border-t-2 border-line px-4 py-3 text-sm text-muted">No goals in this simulation.</p>
      )}
    </section>
  )
}
