import { PixelCard, PixelCardHeader } from "@/components/ui/PixelCard"
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
  const color = tone === "home" ? "bg-home" : tone === "away" ? "bg-danger" : "bg-gold"
  return (
    <div className="grid gap-2">
      <div className="flex justify-between font-mono text-sm">
        <span className="text-muted">{label}</span>
        <span className="text-gold">{value}%</span>
      </div>
      <div className="flex h-3 gap-[3px] bg-line">
        <span className={`${color} h-full`} style={{ width: `${Math.max(2, value)}%` }} />
      </div>
    </div>
  )
}

export function MonteCarloResults({ result }: { result: MonteCarloResult }) {
  return (
    <PixelCard>
      <PixelCardHeader>{result.runs} Match Simulation</PixelCardHeader>
      <div className="grid gap-5 p-4">
        <p className="font-mono text-sm text-muted">
          {result.homeTeam}: {result.homeWins} wins · Draws: {result.draws} · {result.awayTeam}: {result.awayWins} wins
        </p>
        <ProbabilityBar label={`${result.homeTeam} win`} value={result.homeWinPct} tone="home" />
        <ProbabilityBar label="Draw" value={result.drawPct} tone="draw" />
        <ProbabilityBar label={`${result.awayTeam} win`} value={result.awayWinPct} tone="away" />
        <div className="grid gap-1 border-t-2 border-line pt-4 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Average score</span>
            <span>
              {result.avgHomeGoals} – {result.avgAwayGoals}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Most common score</span>
            <span>{result.mostCommonScore.replace("-", "–")}</span>
          </div>
        </div>
        {result.scorelines.length > 1 ? (
          <div className="border-t-2 border-line pt-4">
            <p className="mb-2 font-display text-[10px] uppercase tracking-[0.16em] text-muted">
              Common scorelines
            </p>
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
    </PixelCard>
  )
}
