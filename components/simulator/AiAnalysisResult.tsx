import { PixelCrest } from "@/components/teams/PixelCrest"
import { formatXg } from "@/lib/format"
import type { PreMatchAnalysis } from "@/lib/ai/analysis"
import type { HistoricalTeam } from "@/types"

export function AiAnalysisLoading({ home, away }: { home: HistoricalTeam; away: HistoricalTeam }) {
  return (
    <section id="result-analysis" className="result-panel isolate overflow-hidden border-2 border-gold/50 shadow-[8px_8px_0_#000]" aria-live="polite">
      <div className="grid min-h-64 place-items-center bg-[radial-gradient(circle_at_50%_42%,rgba(212,180,90,0.12),transparent_40%)] px-5 py-8 text-center">
        <div>
          <div className="mx-auto flex items-center justify-center gap-5" aria-hidden="true">
            <PixelCrest clubId={home.clubId} size={52} className="animate-pulse" />
            <div className="relative grid h-14 w-14 place-items-center">
              <div className="absolute inset-0 animate-spin rounded-full border border-dashed border-gold/70" />
              <span className="font-display text-[9px] tracking-[0.18em] text-gold">VS</span>
            </div>
            <PixelCrest clubId={away.clubId} size={52} className="animate-pulse" />
          </div>
          <p className="mt-6 font-display text-[9px] uppercase tracking-[0.28em] text-gold">Building the matchup</p>
          <h2 className="mt-2 font-brand text-xl font-semibold tracking-wide text-text">Two eras enter the match lab</h2>
          <p className="mx-auto mt-2 max-w-md font-mono text-xs leading-5 text-muted">{home.clubName} {home.displaySeason} vs {away.clubName} {away.displaySeason}. Building the match call, decisive sequence and 100 alternate nights.</p>
          <div className="mx-auto mt-6 h-px w-56 overflow-hidden bg-white/10"><span className="block h-full w-1/2 animate-pulse bg-gold" /></div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Usually 5–15 seconds</p>
        </div>
      </div>
    </section>
  )
}

export function AiAnalysisResult({ analysis, home, away }: { analysis: PreMatchAnalysis; home: HistoricalTeam; away: HistoricalTeam }) {
  const { copy, simulation: sim } = analysis
  const score = sim.mostCommonScore.replace("-", "–")

  return (
    <section id="result-analysis" className="result-panel isolate overflow-hidden border-2 border-gold/50 shadow-[8px_8px_0_#000,0_0_0_1px_rgba(212,180,90,0.18)]">
      <header className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(212,180,90,0.15),transparent_50%)] px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-[8px] uppercase tracking-[0.28em] text-gold">Expert AI Analysis</p>
          <p className="font-display text-[8px] uppercase tracking-[0.2em] text-muted">Era collision</p>
        </div>
        <h2 className="mx-auto mt-2 max-w-3xl text-center font-brand text-lg leading-snug font-semibold tracking-wide text-text sm:text-2xl">{copy.headline}</h2>

        <div className="mx-auto mt-3 grid max-w-3xl grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] sm:gap-4">
          <TeamMark team={home} />
          <div className="text-center">
            <p className="font-display text-[7px] uppercase tracking-[0.18em] text-muted">Most seen</p>
            <p className="result-score mt-1 text-4xl leading-none sm:text-5xl">{score}</p>
            <p className="mt-1 font-mono text-[9px] text-muted">in 100 runs</p>
          </div>
          <TeamMark team={away} away />
        </div>

        <p className="mx-auto mt-3 max-w-3xl border-t border-white/10 pt-3 text-center text-sm leading-5 text-text">{copy.matchupStory}</p>
      </header>

      <section className="border-b border-white/10">
        <div className="relative bg-gold/[0.045] px-4 py-3 sm:px-6 sm:py-4">
          <div className="absolute inset-y-0 left-0 w-0.5 bg-gold" />
          <p className="font-display text-[8px] uppercase tracking-[0.24em] text-gold">The call</p>
          <h3 className="mt-1 font-brand text-lg font-semibold tracking-wide text-text sm:text-xl">{copy.callTitle}</h3>
          <p className="mt-2 max-w-4xl text-sm leading-5 text-text">{copy.callBody}</p>
        </div>
        <div className="grid border-t border-white/10 md:grid-cols-[1.25fr_0.75fr]">
          <AnalysisBeat label="The deciding sequence" text={copy.decidingSequence} />
          <AnalysisBeat label="Pressure point" text={copy.pressurePoint} border />
        </div>
      </section>

      <section className="px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-[8px] uppercase tracking-[0.24em] text-gold">100 alternate nights</p>
            <h3 className="mt-1 font-brand text-lg font-semibold tracking-wide text-text">The evidence behind the call</h3>
          </div>
          <p className="font-mono text-[10px] text-text/70">Same squads. A different bounce of the ball.</p>
        </div>

        <div className="mt-3 grid items-center gap-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
          <UniverseGrid homeWins={sim.homeWins} draws={sim.draws} awayWins={sim.awayWins} />
          <div className="grid grid-cols-3 gap-2">
            <Outcome label={`${home.clubName} wins`} value={sim.homeWins} tone="gold" />
            <Outcome label="Level" value={sim.draws} />
            <Outcome label={`${away.clubName} wins`} value={sim.awayWins} tone="danger" />
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-display text-[8px] uppercase tracking-[0.18em] text-muted">Recurring scorelines</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {sim.scorelines.slice(0, 4).map((line) => (
                <div key={line.score} className="border border-white/10 bg-black/20 px-3 py-2 font-mono">
                  <span className="text-sm font-semibold text-text">{line.score.replace("-", "–")}</span>
                  <span className="ml-2 text-[10px] text-muted">{line.count} worlds</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-[8px] uppercase tracking-[0.18em] text-muted">Match fingerprint</p>
            <div className="mt-2 grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/10">
              <Metric label="Avg goals" value={`${formatXg(sim.avgHomeGoals)}–${formatXg(sim.avgAwayGoals)}`} />
              <Metric label="Avg xG" value={`${formatXg(sim.avgHomeXg ?? 0)}–${formatXg(sim.avgAwayXg ?? 0)}`} />
              <Metric label="Possession" value={`${sim.avgHomePoss ?? 0}–${sim.avgAwayPoss ?? 0}%`} />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

function TeamMark({ team, away = false }: { team: HistoricalTeam; away?: boolean }) {
  const core = [...team.players].filter((player) => team.startingXI.includes(player.id)).sort((a, b) => b.overall - a.overall).slice(0, 3).map((player) => player.shortName || player.name)
  return (
    <div className={`min-w-0 ${away ? "text-right" : "text-left"}`}>
      <div className={`flex items-center gap-2.5 sm:gap-4 ${away ? "flex-row-reverse" : ""}`}>
        <PixelCrest clubId={team.clubId} size={48} className="hidden sm:grid" />
        <div className="min-w-0">
          <p className="truncate font-brand text-sm font-semibold tracking-wide text-text sm:text-xl">{team.clubName}</p>
          <p className="mt-0.5 font-mono text-[10px] text-gold sm:text-xs">{team.displaySeason}</p>
        </div>
      </div>
      <p className="mt-3 truncate font-mono text-[9px] text-text/70 sm:text-[11px]">{team.manager} · {team.formation}</p>
      <p className="mt-1 truncate font-mono text-[9px] text-text sm:text-[10px]" title={core.join(" · ")}>{core.join(" · ")}</p>
    </div>
  )
}

function AnalysisBeat({ label, text, border = false }: { label: string; text: string; border?: boolean }) {
  return (
    <article className={`px-4 py-3 sm:px-6 sm:py-4 ${border ? "border-t border-white/10 md:border-t-0 md:border-l" : ""}`}>
      <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold">{label}</p>
      <p className="mt-2 text-sm leading-6 text-text sm:text-[15px]">{text}</p>
    </article>
  )
}

function Outcome({ label, value, tone }: { label: string; value: number; tone?: "gold" | "danger" }) {
  const color = tone === "gold" ? "text-gold" : tone === "danger" ? "text-danger" : "text-text"
  return <div className="min-w-0 text-center"><p className={`font-mono text-3xl font-semibold tabular-nums sm:text-4xl ${color}`}>{value}</p><p className="mt-1 truncate font-mono text-[9px] text-muted sm:text-[10px]" title={label}>{label}</p></div>
}

function UniverseGrid({ homeWins, draws, awayWins }: { homeWins: number; draws: number; awayWins: number }) {
  const cells = [
    ...Array.from({ length: homeWins }, () => "bg-gold"),
    ...Array.from({ length: draws }, () => "bg-white/30"),
    ...Array.from({ length: awayWins }, () => "bg-danger"),
  ]
  return (
    <div className="mx-auto grid w-full max-w-[7rem] grid-cols-10 gap-[2px]" role="img" aria-label={`${homeWins} home wins, ${draws} draws and ${awayWins} away wins`}>
      {cells.map((tone, index) => <span key={index} className={`aspect-square ${tone}`} />)}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="bg-[#0b100b] p-3"><p className="font-display text-[7px] uppercase tracking-[0.14em] text-muted">{label}</p><p className="mt-1.5 font-mono text-base font-semibold tabular-nums text-text">{value}</p></div>
}
