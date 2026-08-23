import { PixelCrest } from "@/components/teams/PixelCrest"
import { ResultPanel } from "@/components/ui/ResultPanel"
import { OvrStamp } from "@/components/ui/OvrStamp"
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
    <ResultPanel kicker="Simulated result" aside={`Seed ${match.seed}`}>
      <div className="grid gap-6 px-4 py-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:px-5">
        <ResultTeam team={home} />
        <div className="text-center">
          <div className="result-score text-4xl sm:text-5xl">
            {match.score.home}–{match.score.away}
          </div>
          <div className="mt-2 font-mono text-xs tracking-[0.16em] text-muted uppercase">{resultLabel}</div>
        </div>
        <div className="sm:justify-self-end">
          <ResultTeam team={away} align="right" />
        </div>
      </div>
      {match.scorers.length > 0 ? (
        <div className="grid gap-4 border-t border-white/10 px-4 py-3 font-mono text-sm sm:grid-cols-2 sm:px-5">
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
        <p className="border-t border-white/10 px-4 py-3 font-mono text-sm text-muted sm:px-5">
          No goals in this simulation.
        </p>
      )}
    </ResultPanel>
  )
}

function ResultTeam({
  team,
  align = "left",
}: {
  team: HistoricalTeam
  align?: "left" | "right"
}) {
  return (
    <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <PixelCrest clubId={team.clubId} size={44} />
      <div className="min-w-0">
        <div className="truncate font-mono text-base font-semibold tracking-tight sm:text-lg">{team.clubName}</div>
        <div className="font-mono text-sm text-gold">{team.displaySeason}</div>
        <div className="font-mono text-xs text-muted">{team.manager}</div>
      </div>
      <OvrStamp value={team.overallRating} size="md" align={align === "right" ? "left" : "right"} />
    </div>
  )
}
