import { ResultPanel } from "@/components/ui/ResultPanel"
import type { MonteCarloResult } from "@/types"

function ProbabilityBar({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "home" | "draw" | "away"
}) {
  const color = tone === "away" ? "bg-danger" : "bg-gold"
  return (
    <div className="grid gap-2">
      <div className="flex justify-between font-mono text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-semibold text-gold">{value}%</span>
      </div>
      <span className="relative h-[5px] bg-white/10">
        <span className={`absolute inset-y-0 left-0 ${color}`} style={{ width: `${Math.max(2, value)}%` }} />
      </span>
    </div>
  )
}

export function MonteCarloResults({ result }: { result: MonteCarloResult }) {
  return (
    <ResultPanel
      kicker={`${result.runs} matches`}
      title={`${result.homeWinPct}% · ${result.drawPct}% · ${result.awayWinPct}%`}
    >
      <div className="grid gap-5 p-4 sm:p-5">
        <p className="font-mono text-sm text-muted">
          {result.homeTeam} {result.homeWins} wins · {result.draws} draws · {result.awayTeam} {result.awayWins} wins
        </p>
        <ProbabilityBar label={`${result.homeTeam} win`} value={result.homeWinPct} tone="home" />
        <ProbabilityBar label="Draw" value={result.drawPct} tone="draw" />
        <ProbabilityBar label={`${result.awayTeam} win`} value={result.awayWinPct} tone="away" />
        <div className="grid gap-1 border-t border-white/10 pt-4 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Average score</span>
            <span>
              {result.avgHomeGoals} – {result.avgAwayGoals}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Most common</span>
            <span>{result.mostCommonScore.replace("-", "–")}</span>
          </div>
        </div>
        {result.scorelines.length > 1 ? (
          <div className="border-t border-white/10 pt-4">
            <p className="mb-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">Common scorelines</p>
            <ul className="grid gap-1 font-mono text-sm">
              {result.scorelines.map((line) => (
                <li key={line.score} className="flex justify-between">
                  <span>{line.score.replace("-", "–")}</span>
                  <span className="text-muted">{line.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </ResultPanel>
  )
}
