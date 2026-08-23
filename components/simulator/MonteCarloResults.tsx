import type { MonteCarloResult } from "@/types"

function Row({
  label,
  value,
  gold,
}: {
  label: string
  value: string
  gold?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-1 font-mono text-[12px] leading-5">
      <span className="min-w-0 truncate text-muted">{label}</span>
      <span className={`shrink-0 tabular-nums ${gold ? "text-gold" : "text-text"}`}>{value}</span>
    </div>
  )
}

export function MonteCarloResults({ result }: { result: MonteCarloResult }) {
  return (
    <section className="result-panel">
      <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
        {result.runs} matches
      </h2>

      <div className="grid grid-cols-3 px-3 py-2 text-center">
        <div className="min-w-0">
          <div className="font-mono text-lg font-semibold tabular-nums text-gold">{result.homeWinPct}%</div>
          <div className="truncate font-mono text-[10px] text-muted">{result.homeTeam}</div>
        </div>
        <div className="min-w-0">
          <div className="font-mono text-lg font-semibold tabular-nums text-text">{result.drawPct}%</div>
          <div className="font-mono text-[10px] text-muted">Draw</div>
        </div>
        <div className="min-w-0">
          <div className="font-mono text-lg font-semibold tabular-nums text-danger">{result.awayWinPct}%</div>
          <div className="truncate font-mono text-[10px] text-muted">{result.awayTeam}</div>
        </div>
      </div>

      <div className="mx-3 mb-1 flex h-[4px] overflow-hidden bg-white/10">
        <span className="h-full bg-gold" style={{ width: `${Math.max(1, result.homeWinPct)}%` }} />
        <span className="h-full bg-white/25" style={{ width: `${Math.max(1, result.drawPct)}%` }} />
        <span className="h-full bg-danger" style={{ width: `${Math.max(1, result.awayWinPct)}%` }} />
      </div>

      <Row label={`${result.homeTeam} wins`} value={String(result.homeWins)} gold />
      <Row label="Draws" value={String(result.draws)} />
      <Row label={`${result.awayTeam} wins`} value={String(result.awayWins)} />
      <Row label="Average" value={`${result.avgHomeGoals}–${result.avgAwayGoals}`} />
      <Row label="Most common" value={result.mostCommonScore.replace("-", "–")} gold />

      {result.scorelines.length > 1
        ? result.scorelines.map((line) => (
            <Row key={line.score} label={line.score.replace("-", "–")} value={`${line.pct}%`} />
          ))
        : null}
    </section>
  )
}
