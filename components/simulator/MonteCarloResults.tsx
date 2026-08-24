import { formatXg } from "@/lib/format"
import type { MonteCarloResult } from "@/types"

export function MonteCarloResults({ result }: { result: MonteCarloResult }) {
  const homeScorers = result.topScorers?.home ?? []
  const awayScorers = result.topScorers?.away ?? []
  const topScorePct = Math.max(1, result.scorelines[0]?.pct ?? 1)
  const topGoals = Math.max(
    1,
    ...homeScorers.map((row) => row.goals),
    ...awayScorers.map((row) => row.goals),
  )
  const lean =
    result.homeWinPct === result.awayWinPct
      ? "Model lean: draw"
      : result.homeWinPct > result.awayWinPct
        ? `Model lean: ${result.homeClub}`
        : `Model lean: ${result.awayClub}`

  return (
    <section className="result-panel">
      <header className="flex items-end justify-between gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4">
        <div className="min-w-0">
          <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold">
            {result.runs} match model
          </p>
          <p className="mt-1 truncate font-mono text-[11px] text-muted">{lean}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-[8px] uppercase tracking-[0.16em] text-muted">Most likely</p>
          <p className="result-score mt-0.5 text-2xl leading-none">
            {result.mostCommonScore.replace("-", "–")}
          </p>
          <p className="mt-1 font-mono text-[10px] tabular-nums text-muted">
            avg {formatXg(result.avgHomeGoals)}–{formatXg(result.avgAwayGoals)}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-2 px-3 pt-3 sm:px-4">
        <Pct value={result.homeWinPct} name={result.homeClub ?? result.homeTeam} tone="gold" />
        <Pct value={result.drawPct} name="Draw" />
        <Pct value={result.awayWinPct} name={result.awayClub ?? result.awayTeam} tone="danger" />
      </div>
      <div className="mc-bar mx-3 mt-2 mb-3 h-2 sm:mx-4" role="img" aria-label="Win split">
        <i className="bg-gold" style={{ width: `${Math.max(1, result.homeWinPct)}%` }} />
        <i className="bg-white/30" style={{ width: `${Math.max(1, result.drawPct)}%` }} />
        <i className="bg-danger" style={{ width: `${Math.max(1, result.awayWinPct)}%` }} />
      </div>

      <section className="border-t border-white/10 px-3 py-3 sm:px-4">
        <h3 className="mb-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Most likely scores
        </h3>
        <ol className="grid gap-1.5 sm:grid-cols-2">
          {result.scorelines.map((line) => (
            <li key={line.score} className="mc-score">
              <span className="tabular-nums text-text">{line.score.replace("-", "–")}</span>
              <span className="mc-score-bar" aria-hidden>
                <i style={{ width: `${Math.max(6, (line.pct / topScorePct) * 100)}%` }} />
              </span>
              <span className="tabular-nums text-muted">{line.pct}%</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-white/10 px-3 py-3 sm:px-4">
        <h3 className="mb-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Match profile
        </h3>
        <Split label="xG" home={formatXg(result.avgHomeXg ?? 0)} away={formatXg(result.avgAwayXg ?? 0)} homeN={result.avgHomeXg ?? 0} awayN={result.avgAwayXg ?? 0} />
        <Split label="Shots" home={String(result.avgHomeShots ?? 0)} away={String(result.avgAwayShots ?? 0)} homeN={result.avgHomeShots ?? 0} awayN={result.avgAwayShots ?? 0} />
        <Split label="Poss" home={`${result.avgHomePoss ?? 0}%`} away={`${result.avgAwayPoss ?? 0}%`} homeN={result.avgHomePoss ?? 0} awayN={result.avgAwayPoss ?? 0} />
        <Split label="CS" home={`${result.homeCleanPct ?? 0}%`} away={`${result.awayCleanPct ?? 0}%`} homeN={result.homeCleanPct ?? 0} awayN={result.awayCleanPct ?? 0} />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Chip label="BTTS" value={result.bttsPct ?? 0} />
          <Chip label="Over 2.5" value={result.over25Pct ?? 0} />
        </div>
      </section>

      {homeScorers.length > 0 || awayScorers.length > 0 ? (
        <section className="border-t border-white/10 px-3 py-3 sm:px-4">
          <h3 className="mb-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
            Goals in {result.runs} matches
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Scorers
              label={result.homeClub}
              rows={homeScorers}
              max={topGoals}
              runs={result.runs}
              tone="gold"
            />
            <Scorers
              label={result.awayClub}
              rows={awayScorers}
              max={topGoals}
              runs={result.runs}
              tone="danger"
            />
          </div>
        </section>
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
    <div className="min-w-0 text-center">
      <div className={`font-mono text-2xl font-semibold tabular-nums leading-none ${color}`}>{value}%</div>
      <div className="mt-1 truncate font-mono text-[11px] text-muted" title={name}>
        {name}
      </div>
    </div>
  )
}

function Split({
  label,
  home,
  away,
  homeN,
  awayN,
}: {
  label: string
  home: string
  away: string
  homeN: number
  awayN: number
}) {
  const total = homeN + awayN
  const left = total <= 0 ? 50 : (homeN / total) * 100
  const right = 100 - left
  return (
    <div className="mc-split">
      <span className="text-muted">{label}</span>
      <span className="text-right tabular-nums text-gold">{home}</span>
      <span className="mc-split-bar" aria-hidden>
        <i className="bg-gold" style={{ width: `${Math.max(2, left)}%` }} />
        <i className="bg-danger" style={{ width: `${Math.max(2, right)}%` }} />
      </span>
      <span className="tabular-nums text-danger">{away}</span>
    </div>
  )
}

function Chip({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-white/10 bg-black/20 px-2 py-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display text-[8px] uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className="font-mono text-[13px] font-semibold tabular-nums text-text">{value}%</span>
      </div>
      <span className="mc-chip-bar mt-1" aria-hidden>
        <i style={{ width: `${Math.max(4, value)}%` }} />
      </span>
    </div>
  )
}

function Scorers({
  label,
  rows,
  max,
  runs,
  tone,
}: {
  label?: string
  rows: Array<{ player: string; goals: number }>
  max: number
  runs: number
  tone: "gold" | "danger"
}) {
  if (rows.length === 0) {
    return <p className="font-mono text-[11px] text-muted">No goals</p>
  }
  const bar = tone === "gold" ? "bg-gold" : "bg-danger"
  const num = tone === "gold" ? "text-gold" : "text-danger"
  return (
    <ol className="grid gap-1">
      {label ? (
        <li className="mc-scorer mb-0.5 font-display text-[8px] uppercase tracking-[0.12em] text-muted">
          <span className="truncate">{label}</span>
          <span />
          <span>G</span>
          <span>/m</span>
        </li>
      ) : null}
      {rows.map((row) => (
        <li key={row.player} className="mc-scorer">
          <span className="truncate text-text" title={row.player}>
            {shortName(row.player)}
          </span>
          <span className="mc-scorer-bar" aria-hidden>
            <i className={bar} style={{ width: `${Math.max(6, (row.goals / max) * 100)}%` }} />
          </span>
          <span className={`tabular-nums ${num}`}>{row.goals}</span>
          <span className="tabular-nums text-muted">{(row.goals / runs).toFixed(2)}</span>
        </li>
      ))}
    </ol>
  )
}

function shortName(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0] ?? name
  return parts[parts.length - 1] ?? name
}
