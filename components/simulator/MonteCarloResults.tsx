import type { MonteCarloResult } from "@/types"

export function MonteCarloResults({ result }: { result: MonteCarloResult }) {
  const homeScorers = result.topScorers?.home ?? []
  const awayScorers = result.topScorers?.away ?? []

  return (
    <section className="result-panel">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-1.5">
        <h2 className="font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          {result.runs} matches
        </h2>
        <p className="ml-auto truncate font-mono text-[10px] tabular-nums text-muted">
          {result.avgHomeGoals}–{result.avgAwayGoals}
          <span className="mx-1.5 text-line-hi">·</span>
          {result.mostCommonScore.replace("-", "–")}
          <span className="mx-1.5 text-line-hi">·</span>
          BTTS {result.bttsPct ?? 0}%
          <span className="mx-1.5 text-line-hi">·</span>
          2.5+ {result.over25Pct ?? 0}%
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1 px-3 pt-2 pb-1 text-center">
        <Pct value={result.homeWinPct} name={result.homeClub ?? result.homeTeam} tone="gold" />
        <Pct value={result.drawPct} name="Draw" />
        <Pct value={result.awayWinPct} name={result.awayClub ?? result.awayTeam} tone="danger" />
      </div>
      <div className="mc-bar mx-3 mb-1.5">
        <i className="bg-gold" style={{ width: `${Math.max(1, result.homeWinPct)}%` }} />
        <i className="bg-white/25" style={{ width: `${Math.max(1, result.drawPct)}%` }} />
        <i className="bg-danger" style={{ width: `${Math.max(1, result.awayWinPct)}%` }} />
      </div>

      <p className="flex flex-wrap gap-x-2 gap-y-0.5 border-t border-white/10 px-3 py-1.5 font-mono text-[11px] leading-4 text-text">
        {result.scorelines.map((line) => (
          <span key={line.score} className="whitespace-nowrap">
            <span className="tabular-nums">{line.score.replace("-", "–")}</span>
            <span className="ml-1 text-muted">{line.pct}%</span>
          </span>
        ))}
      </p>

      <p className="border-t border-white/10 px-3 py-1.5 font-mono text-[11px] leading-4 tabular-nums text-muted">
        xG {result.avgHomeXg ?? 0}–{result.avgAwayXg ?? 0}
        <span className="mx-1.5 text-line-hi">·</span>
        shots {result.avgHomeShots ?? 0}–{result.avgAwayShots ?? 0}
        <span className="mx-1.5 text-line-hi">·</span>
        poss {result.avgHomePoss ?? 0}–{result.avgAwayPoss ?? 0}%
        <span className="mx-1.5 text-line-hi">·</span>
        CS {result.homeCleanPct ?? 0}–{result.awayCleanPct ?? 0}%
      </p>

      {homeScorers.length > 0 || awayScorers.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 border-t border-white/10 px-3 py-1.5">
          <Scorers rows={homeScorers} tone="gold" />
          <Scorers rows={awayScorers} tone="danger" />
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
      <div className={`font-mono text-sm font-semibold tabular-nums leading-none ${color}`}>{value}%</div>
      <div className="mt-0.5 truncate font-mono text-[10px] leading-none text-muted">{name}</div>
    </div>
  )
}

function Scorers({
  rows,
  tone,
}: {
  rows: Array<{ player: string; goals: number }>
  tone: "gold" | "danger"
}) {
  if (rows.length === 0) return <p className="font-mono text-[11px] text-muted">—</p>
  const color = tone === "gold" ? "text-gold" : "text-danger"
  return (
    <p className="font-mono text-[11px] leading-4">
      {rows.map((row, index) => (
        <span key={row.player} className="whitespace-nowrap">
          {index > 0 ? <span className="mx-1.5 text-line-hi">·</span> : null}
          <span className="text-text">{surname(row.player)}</span>{" "}
          <span className={`tabular-nums ${color}`}>{row.goals}</span>
        </span>
      ))}
    </p>
  )
}

function surname(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts[parts.length - 1] ?? name).toUpperCase()
}
