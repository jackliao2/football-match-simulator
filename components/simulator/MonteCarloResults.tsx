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
    <section className="result-panel isolate overflow-hidden border-2 border-gold/45 shadow-[8px_8px_0_#000,0_0_0_1px_rgba(212,180,90,0.15)]">
      <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-[radial-gradient(circle_at_75%_0%,rgba(212,180,90,0.18),transparent_48%)] px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold">
            {result.runs} alternate nights
          </p>
          <h2 className="mt-1 font-brand text-lg font-semibold tracking-wide text-text sm:text-2xl">
            {result.homeClub} <span className="text-muted">vs</span> {result.awayClub}
          </h2>
          <p className="mt-1 font-mono text-[11px] text-text/70">{lean}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-[8px] uppercase tracking-[0.16em] text-gold">Signature score</p>
          <p className="result-score mt-1 text-4xl leading-none sm:text-5xl">
            {result.mostCommonScore.replace("-", "–")}
          </p>
          <p className="mt-1 font-mono text-[9px] tabular-nums text-muted">
            average goals {formatXg(result.avgHomeGoals)}–{formatXg(result.avgAwayGoals)}
          </p>
        </div>
      </header>

      <div className="grid gap-4 border-b border-white/10 bg-gold/[0.035] px-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center sm:px-6">
        <DistributionGrid home={result.homeWinPct} draw={result.drawPct} away={result.awayWinPct} />
        <div className="grid grid-cols-3 gap-2">
          <Pct value={result.homeWinPct} name={result.homeClub ?? result.homeTeam} tone="gold" />
          <Pct value={result.drawPct} name="Draw" />
          <Pct value={result.awayWinPct} name={result.awayClub ?? result.awayTeam} tone="danger" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <section className="px-4 py-4 sm:px-6 lg:border-r lg:border-white/10">
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

        <section className="border-t border-white/10 px-4 py-4 sm:px-6 lg:border-t-0">
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
      </div>

      {homeScorers.length > 0 || awayScorers.length > 0 ? (
        <section className="border-t border-white/10 px-4 py-4 sm:px-6">
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
    <div className="min-w-0 border border-white/10 bg-black/25 px-2 py-3 text-center">
      <div className={`font-mono text-2xl font-semibold tabular-nums leading-none sm:text-3xl ${color}`}>{value}%</div>
      <div className="mt-1 truncate font-mono text-[11px] text-muted" title={name}>
        {name}
      </div>
    </div>
  )
}

function DistributionGrid({ home, draw, away }: { home: number; draw: number; away: number }) {
  const homeCells = Math.max(0, Math.min(100, Math.round(home)))
  const drawCells = Math.max(0, Math.min(100 - homeCells, Math.round(draw)))
  const awayCells = 100 - homeCells - drawCells
  const cells = [
    ...Array.from({ length: homeCells }, () => "bg-gold"),
    ...Array.from({ length: drawCells }, () => "bg-white/30"),
    ...Array.from({ length: awayCells }, () => "bg-danger"),
  ]
  return (
    <div
      className="mx-auto grid w-full max-w-[7rem] grid-cols-10 gap-[2px]"
      role="img"
      aria-label={`${home}% home wins, ${draw}% draws, ${away}% away wins`}
    >
      {cells.map((tone, index) => (
        <span key={index} className={`aspect-square ${tone}`} />
      ))}
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
