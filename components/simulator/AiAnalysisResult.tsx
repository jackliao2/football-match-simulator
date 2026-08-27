import { formatXg } from "@/lib/format"
import type { PreMatchAnalysis } from "@/lib/ai/analysis"

export function AiAnalysisLoading({ home, away }: { home: string; away: string }) {
  return (
    <section id="result-analysis" className="result-panel overflow-hidden" aria-live="polite">
      <div className="grid min-h-72 place-items-center px-5 py-10 text-center">
        <div>
          <div className="relative mx-auto h-20 w-20" aria-hidden="true">
            <div className="absolute inset-0 animate-spin rounded-full border border-dashed border-gold/60" />
            <div className="absolute inset-3 grid place-items-center rounded-full border border-white/10 bg-black/30 text-3xl shadow-[0_0_30px_rgba(212,175,55,0.16)]">
              ⚽
            </div>
            <span className="absolute -right-1 top-1/2 h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
          </div>
          <p className="mt-5 font-display text-[9px] uppercase tracking-[0.24em] text-gold">AI match lab</p>
          <h2 className="mt-2 font-mono text-lg font-semibold text-text">Running 100 simulations</h2>
          <p className="mx-auto mt-2 max-w-md font-mono text-xs leading-5 text-muted">
            {home} vs {away}. Comparing styles, danger men and the most likely score.
          </p>
          <div className="mx-auto mt-5 h-1.5 w-52 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-1/2 animate-pulse rounded-full bg-gold" />
          </div>
          <p className="mt-3 font-mono text-[11px] text-muted">Usually ready in 5–15 seconds</p>
        </div>
      </div>
    </section>
  )
}

export function AiAnalysisResult({
  analysis,
  source,
}: {
  analysis: PreMatchAnalysis
  source: "ai" | "template" | null
}) {
  const { copy, simulation: sim } = analysis
  const prediction = sim.mostCommonScore.replace("-", "–")

  return (
    <section id="result-analysis" className="result-panel overflow-hidden">
      <header className="border-b border-white/10 px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold">AI verdict</p>
          <p className="font-mono text-[10px] text-muted">{source === "ai" ? "Seed 2.0 Mini" : "Local fallback"}</p>
        </div>
        <h2 className="mt-2 max-w-3xl font-mono text-xl font-semibold leading-snug text-text sm:text-2xl">
          {copy.hook}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{copy.verdict}</p>
      </header>

      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <section className="border-b border-white/10 p-4 lg:border-r lg:border-b-0 sm:p-5">
          <p className="font-display text-[8px] uppercase tracking-[0.2em] text-muted">Predicted score</p>
          <p className="result-score mt-2 text-6xl leading-none text-text">{prediction}</p>
          <p className="mt-2 font-mono text-xs text-muted">
            Average goals {formatXg(sim.avgHomeGoals)}–{formatXg(sim.avgAwayGoals)}
          </p>
          <div className="mt-5 grid gap-3 border-t border-white/10 pt-4">
            <Brief label="Key battle" text={copy.keyBattle} />
            <Brief label="Danger man" text={copy.dangerMan} />
          </div>
        </section>

        <section className="p-4 sm:p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-[8px] uppercase tracking-[0.2em] text-gold">100 simulations</p>
              <p className="mt-1 font-mono text-xs text-muted">How often each outcome appeared</p>
            </div>
            <span className="font-mono text-[10px] text-muted">Engine model</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Outcome label={sim.homeClub ?? sim.homeTeam} value={sim.homeWinPct} tone="gold" />
            <Outcome label="Draw" value={sim.drawPct} />
            <Outcome label={sim.awayClub ?? sim.awayTeam} value={sim.awayWinPct} tone="danger" />
          </div>
          <div className="mc-bar mt-3 h-2" aria-label="Win probability split">
            <i className="bg-gold" style={{ width: `${sim.homeWinPct}%` }} />
            <i className="bg-white/30" style={{ width: `${sim.drawPct}%` }} />
            <i className="bg-danger" style={{ width: `${sim.awayWinPct}%` }} />
          </div>

          <p className="mt-6 font-display text-[8px] uppercase tracking-[0.2em] text-muted">Match numbers</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Metric label="Avg xG" value={`${formatXg(sim.avgHomeXg ?? 0)}–${formatXg(sim.avgAwayXg ?? 0)}`} />
            <Metric label="Shots" value={`${sim.avgHomeShots ?? 0}–${sim.avgAwayShots ?? 0}`} />
            <Metric label="Possession" value={`${sim.avgHomePoss ?? 0}–${sim.avgAwayPoss ?? 0}`} suffix="%" />
            <Metric label="Both score" value={`${sim.bttsPct ?? 0}`} suffix="%" />
          </div>
        </section>
      </div>
    </section>
  )
}

function Brief({ label, text }: { label: string; text: string }) {
  return <div><p className="font-display text-[8px] uppercase tracking-[0.16em] text-gold">{label}</p><p className="mt-1 text-sm leading-5 text-text">{text}</p></div>
}

function Outcome({ label, value, tone }: { label: string; value: number; tone?: "gold" | "danger" }) {
  const color = tone === "gold" ? "text-gold" : tone === "danger" ? "text-danger" : "text-text"
  return <div className="min-w-0 text-center"><p className={`font-mono text-2xl font-semibold tabular-nums ${color}`}>{value}%</p><p className="mt-1 truncate font-mono text-[10px] text-muted" title={label}>{label}</p></div>
}

function Metric({ label, value, suffix = "" }: { label: string; value: string; suffix?: string }) {
  return <div className="border border-white/10 bg-black/20 p-2.5"><p className="font-display text-[7px] uppercase tracking-[0.14em] text-muted">{label}</p><p className="mt-1 font-mono text-base font-semibold tabular-nums text-text">{value}{suffix}</p></div>
}
