import type { MonteCarloResult } from "@/types"

export function MonteCarloResults({ result }: { result: MonteCarloResult }) {
  const maxPct = Math.max(...result.scorelines.map((line) => line.pct), 1)
  const homeScorers = result.topScorers?.home ?? []
  const awayScorers = result.topScorers?.away ?? []

  return (
    <section className="result-panel">
      <h2 className="border-b border-white/10 px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
        {result.runs} matches
      </h2>

      <div className="grid grid-cols-3 items-end gap-1 px-3 pt-2 pb-1 text-center">
        <Pct value={result.homeWinPct} name={result.homeClub ?? result.homeTeam} tone="gold" />
        <Pct value={result.drawPct} name="Draw" />
        <Pct value={result.awayWinPct} name={result.awayClub ?? result.awayTeam} tone="danger" />
      </div>

      <div className="mc-bar mx-3 mb-2">
        <i className="bg-gold" style={{ width: `${Math.max(1, result.homeWinPct)}%` }} />
        <i className="bg-white/25" style={{ width: `${Math.max(1, result.drawPct)}%` }} />
        <i className="bg-danger" style={{ width: `${Math.max(1, result.awayWinPct)}%` }} />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-1.5 font-mono text-[11px]">
        <span className="tabular-nums text-text">
          {result.avgHomeGoals}–{result.avgAwayGoals} avg
        </span>
        <span className="text-gold">
          most {result.mostCommonScore.replace("-", "–")}
        </span>
      </div>

      {result.scorelines.length > 0 ? (
        <div className="grid gap-0.5 border-t border-white/10 px-3 py-1.5">
          {result.scorelines.map((line) => (
            <div key={line.score} className="mc-line">
              <span className="w-8 shrink-0 tabular-nums text-text">{line.score.replace("-", "–")}</span>
              <span className="mc-bar min-w-0 flex-1">
                <i className="bg-gold/80" style={{ width: `${(line.pct / maxPct) * 100}%` }} />
              </span>
              <span className="w-8 shrink-0 text-right tabular-nums text-muted">{line.pct}%</span>
            </div>
          ))}
        </div>
      ) : null}

      {homeScorers.length > 0 || awayScorers.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 border-t border-white/10 px-3 py-1.5">
          <ScorerCol rows={homeScorers} tone="gold" />
          <ScorerCol rows={awayScorers} tone="danger" align="right" />
        </div>
      ) : null}
    </section>
  )
}

function Pct({
  value,
  name,
  tone,
}: {
  value: number
  name: string
  tone?: "gold" | "danger"
}) {
  const color = tone === "gold" ? "text-gold" : tone === "danger" ? "text-danger" : "text-text"
  return (
    <div className="min-w-0">
      <div className={`font-mono text-base font-semibold tabular-nums leading-none ${color}`}>{value}%</div>
      <div className="mt-1 truncate font-mono text-[10px] leading-none text-muted">{name}</div>
    </div>
  )
}

function ScorerCol({
  rows,
  tone,
  align,
}: {
  rows: Array<{ player: string; goals: number }>
  tone: "gold" | "danger"
  align?: "right"
}) {
  if (rows.length === 0) {
    return <p className="font-mono text-[11px] text-muted">No goals</p>
  }
  const color = tone === "gold" ? "text-gold" : "text-danger"
  return (
    <ol>
      {rows.map((row) => (
        <li
          key={row.player}
          className={`flex items-baseline gap-2 font-mono text-[11px] leading-4 ${
            align === "right" ? "justify-end" : "justify-between"
          }`}
        >
          <span className="min-w-0 truncate text-text">{surname(row.player)}</span>
          <span className={`shrink-0 tabular-nums ${color}`}>{row.goals}</span>
        </li>
      ))}
    </ol>
  )
}

function surname(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts[parts.length - 1] ?? name).toUpperCase()
}
