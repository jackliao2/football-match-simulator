"use client"

import { useEffect, useState } from "react"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { SimulationStage } from "@/components/simulator/SimulationPlay"
import { formatXg } from "@/lib/format"
import type { PreMatchAnalysis } from "@/lib/ai/analysis"
import type { HistoricalTeam } from "@/types"

export function AiAnalysisLoading({ home, away }: { home: HistoricalTeam; away: HistoricalTeam }) {
  const [progress, setProgress] = useState(6)
  const phases = [
    "Reading era, manager and starting XI…",
    "Mapping tactical pressure points…",
    "Comparing 100 alternate match worlds…",
    "Writing the expert verdict…",
  ]

  useEffect(() => {
    const id = window.setInterval(() => setProgress((value) => Math.min(94, value + (value < 55 ? 7 : 3))), 360)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div id="result-analysis">
      <SimulationStage
        mode="ai"
        home={home}
        away={away}
        progress={progress}
        primary="AI"
        secondary={phases[Math.min(phases.length - 1, Math.floor(progress / 25))]!}
      />
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Expert analysis usually takes 5–15 seconds</p>
    </div>
  )
}

export function AiAnalysisResult({ analysis, home, away }: { analysis: PreMatchAnalysis; home: HistoricalTeam; away: HistoricalTeam }) {
  const { copy, featuredMatch, simulation: sim } = analysis
  const score = `${featuredMatch.score.home}–${featuredMatch.score.away}`

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
            <p className="font-display text-[7px] uppercase tracking-[0.18em] text-muted">Match forecast</p>
            <p className="result-score mt-1 text-4xl leading-none sm:text-5xl">{score}</p>
            <p className="mt-1 font-mono text-[9px] text-muted">one simulated night</p>
          </div>
          <TeamMark team={away} away />
        </div>

        <ForecastGoals match={featuredMatch} home={home} away={away} />

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

      <section className="border-b border-white/10 bg-black/10 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-display text-[8px] uppercase tracking-[0.24em] text-gold">Expert dossier</p>
            <h3 className="mt-1 font-brand text-lg font-semibold tracking-wide text-text">How the match develops</h3>
          </div>
          <p className="font-mono text-[9px] text-muted">Tactics · personnel · game state</p>
        </div>
        <div className="mt-3 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
          <DossierCard number="01" label="The opening 20" text={copy.openingPhase} />
          <DossierCard number="02" label="The duel to watch" text={copy.keyDuel} />
          <DossierCard number="03" label="The manager's move" text={copy.coachingMove} />
          <DossierCard number="04" label="The chaos factor" text={copy.chaosFactor} />
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

        <Leaderboards sim={sim} home={home} away={away} />
      </section>

      <footer className="border-t border-gold/25 bg-[linear-gradient(90deg,rgba(212,180,90,0.09),transparent)] px-4 py-4 sm:px-6">
        <p className="font-display text-[8px] uppercase tracking-[0.24em] text-gold">Final word</p>
        <p className="mt-2 max-w-4xl font-brand text-base leading-7 font-semibold tracking-wide text-text sm:text-lg">{copy.finalWord}</p>
      </footer>
    </section>
  )
}

function ForecastGoals({ match, home, away }: { match: PreMatchAnalysis["featuredMatch"]; home: HistoricalTeam; away: HistoricalTeam }) {
  if (match.scorers.length === 0) {
    return <p className="mx-auto mt-3 max-w-xl text-center font-mono text-[10px] text-text/70">No scorer in this forecast · both goalkeepers hold the line</p>
  }
  const homeGoals = match.scorers.filter((goal) => goal.team === "home")
  const awayGoals = match.scorers.filter((goal) => goal.team === "away")
  return (
    <div className="mx-auto mt-3 grid max-w-3xl grid-cols-2 border-y border-white/10 py-2.5">
      <GoalColumn team={home.clubName} goals={homeGoals} />
      <GoalColumn team={away.clubName} goals={awayGoals} away />
    </div>
  )
}

function GoalColumn({ team, goals, away = false }: { team: string; goals: PreMatchAnalysis["featuredMatch"]["scorers"]; away?: boolean }) {
  return (
    <div className={`min-w-0 px-3 ${away ? "border-l border-white/10 text-right" : ""}`}>
      <p className="truncate font-display text-[7px] uppercase tracking-[0.16em] text-muted">{team} scorers</p>
      {goals.length > 0 ? (
        <ul className="mt-1.5 grid list-none gap-1 p-0">
          {goals.map((goal, index) => (
            <li
              key={`${goal.displayMinute}-${goal.player}-${index}`}
              className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[9px] leading-4 text-text sm:text-[10px]"
              title={`${goal.displayMinute} ${goal.player}${goal.assist ? ` · assist ${goal.assist}` : ""}`}
            >
              <span className={away ? "text-danger" : "text-gold"}>{goal.displayMinute}</span>{" "}
              {goal.player}
              {goal.assist ? <span className="text-[8px] text-muted sm:text-[9px]"> · assist {goal.assist}</span> : null}
            </li>
          ))}
        </ul>
      ) : <p className="mt-1.5 font-mono text-[9px] text-muted">No goals</p>}
    </div>
  )
}

function Leaderboards({ sim, home, away }: { sim: PreMatchAnalysis["simulation"]; home: HistoricalTeam; away: HistoricalTeam }) {
  const scorers = [
    ...sim.topScorers.home.map((row) => ({ player: row.player, value: row.goals, club: home.clubName, tone: "text-gold" })),
    ...sim.topScorers.away.map((row) => ({ player: row.player, value: row.goals, club: away.clubName, tone: "text-danger" })),
  ].sort((a, b) => b.value - a.value).slice(0, 5)
  const assists = [
    ...(sim.topAssists?.home ?? []).map((row) => ({ player: row.player, value: row.assists, club: home.clubName, tone: "text-gold" })),
    ...(sim.topAssists?.away ?? []).map((row) => ({ player: row.player, value: row.assists, club: away.clubName, tone: "text-danger" })),
  ].sort((a, b) => b.value - a.value).slice(0, 5)
  return (
    <div className="mt-4 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
      <Ranking title="Golden boot race" suffix="goals / 100" rows={scorers} />
      <Ranking title="Top creators" suffix="assists / 100" rows={assists} />
    </div>
  )
}

function Ranking({ title, suffix, rows }: { title: string; suffix: string; rows: Array<{ player: string; value: number; club: string; tone: string }> }) {
  return (
    <div className="bg-[#0b100b] p-4">
      <div className="flex items-center justify-between gap-3"><h4 className="font-display text-[8px] uppercase tracking-[0.18em] text-gold">{title}</h4><span className="font-mono text-[8px] text-muted">{suffix}</span></div>
      <ol className="mt-2 grid gap-1.5">
        {rows.map((row, index) => <li key={`${title}-${row.player}`} className="grid grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-2 font-mono text-[10px]"><span className="text-muted">{index + 1}</span><span className="truncate text-text" title={`${row.player} · ${row.club}`}>{row.player} <span className="text-muted">· {row.club}</span></span><strong className={`tabular-nums ${row.tone}`}>{row.value}</strong></li>)}
      </ol>
    </div>
  )
}

function DossierCard({ number, label, text }: { number: string; label: string; text: string }) {
  return <article className="relative bg-[#0b100b] px-4 py-4 sm:px-5"><span className="absolute top-3 right-3 font-display text-[7px] tracking-[0.14em] text-gold/45">{number}</span><p className="pr-8 font-display text-[8px] uppercase tracking-[0.2em] text-gold">{label}</p><p className="mt-2 text-sm leading-6 text-text/90">{text}</p></article>
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
