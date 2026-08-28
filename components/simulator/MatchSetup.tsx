"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ClubPicker } from "@/components/simulator/ClubPicker"
import { AiAnalysisLoading, AiAnalysisResult } from "@/components/simulator/AiAnalysisResult"
import { EraSelect } from "@/components/simulator/EraSelect"
import { MatchResult } from "@/components/simulator/MatchResult"
import { MatchStats } from "@/components/simulator/MatchStats"
import { MatchTimeline } from "@/components/simulator/MatchTimeline"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { SimulationPlay } from "@/components/simulator/SimulationPlay"
import { FaceOffSquad } from "@/components/teams/SquadPanel"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { eraGlow } from "@/data/trophies"
import { isCurrentSquad } from "@/lib/seo"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { track } from "@/lib/analytics"
import { absoluteUrl } from "@/lib/site"
import { createSeed } from "@/lib/match-id"
import { simulateMany, simulateMatch } from "@/lib/simulation"
import type { PreMatchAnalysis } from "@/lib/ai/analysis"
import { teamSquad, type SquadMember } from "@/lib/stars"
import type { HistoricalTeam, MonteCarloResult, SimulatedMatch, TeamKind } from "@/types"
import type { Locale } from "@/lib/i18n"

const AI_DAILY_LIMIT = 10
const AI_USAGE_KEY = "lm-ai-daily-usage"

function localDayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export interface TeamOption {
  id: string
  clubId: string
  clubName: string
  clubCode: string
  season: string
  displaySeason: string
  kind: TeamKind
  overallRating: number
  manager: string
  formation: string
  styleTags: string[]
  team: HistoricalTeam
}

export function MatchSetup({
  teams,
  defaultHome,
  defaultAway,
  locale,
}: {
  teams: TeamOption[]
  defaultHome?: string
  defaultAway?: string
  locale?: Locale
}) {
  const ui = locale === "es" ? {
    home: "Local", away: "Visitante", legendary: "Leyendas", now: "Recientes", swap: "Cambiar", different: "Elige dos equipos distintos.", simulate: "Simular", playing: "Jugando…", hundred: "100 partidos", running: "Calculando…", expert: "Análisis experto IA", analysing: "Analizando…", daily: "Hoy", change: "Cambiar equipo ▾", simulateAgain: "Simular de nuevo", back: "Volver a equipos", copy: "Copiar enlace", copied: "Copiado", runAgain: "Repetir 100", expertAgain: "Repetir análisis IA",
  } : locale === "pt-br" ? {
    home: "Casa", away: "Visitante", legendary: "Lendas", now: "Recentes", swap: "Trocar", different: "Escolha dois times diferentes.", simulate: "Simular", playing: "Jogando…", hundred: "100 partidas", running: "Calculando…", expert: "Análise especializada IA", analysing: "Analisando…", daily: "Hoje", change: "Trocar time ▾", simulateAgain: "Simular novamente", back: "Voltar aos times", copy: "Copiar link", copied: "Copiado", runAgain: "Repetir 100", expertAgain: "Repetir análise IA",
  } : {
    home: "Home", away: "Away", legendary: "Legendary", now: "Recent", swap: "Swap", different: "Pick two different teams.", simulate: "Simulate", playing: "Playing…", hundred: "100 Matches", running: "Running…", expert: "Expert AI Analysis", analysing: "Analysing…", daily: "Daily", change: "Change team ▾", simulateAgain: "Simulate again", back: "Back to teams", copy: "Copy link", copied: "Copied", runAgain: "Run 100 again", expertAgain: "Expert AI again",
  }
  const homeDefault = teams.find((team) => team.id === defaultHome) ?? teams[0]!
  const awayDefault =
    teams.find((team) => team.id === defaultAway) ??
    teams.find((team) => team.id !== homeDefault.id) ??
    teams[1] ??
    teams[0]!
  const [includeCurrent, setIncludeCurrent] = useState(
    () => isCurrentSquad(homeDefault.team) || isCurrentSquad(awayDefault.team),
  )
  const clubs = useMemo(() => uniqueOrgs(teams, "club", includeCurrent), [teams, includeCurrent])
  const nations = useMemo(() => uniqueOrgs(teams, "nation", includeCurrent), [teams, includeCurrent])

  const [homeClub, setHomeClub] = useState(homeDefault.clubId)
  const [awayClub, setAwayClub] = useState(awayDefault.clubId)
  const [homeId, setHomeId] = useState(homeDefault.id)
  const [awayId, setAwayId] = useState(awayDefault.id)
  const [picker, setPicker] = useState<"home" | "away" | null>(null)
  const [running, setRunning] = useState(false)
  const [match, setMatch] = useState<SimulatedMatch | null>(null)
  const [batch, setBatch] = useState<MonteCarloResult | null>(null)
  const [play, setPlay] = useState<
    | { kind: "match"; match: SimulatedMatch }
    | { kind: "batch"; result: MonteCarloResult }
    | null
  >(null)
  const [analysis, setAnalysis] = useState<PreMatchAnalysis | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [aiUsesToday, setAiUsesToday] = useState(0)
  const [copied, setCopied] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const scrollTarget = useRef<"match" | "batch" | "analysis">("match")
  const legendHomeId = useRef(homeDefault.id)
  const legendAwayId = useRef(awayDefault.id)
  const [scrollKey, setScrollKey] = useState(0)

  useEffect(() => {
    const hydration = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(AI_USAGE_KEY) ?? "null") as { date?: string; count?: number } | null
        if (saved?.date === localDayKey() && Number.isFinite(saved.count)) {
          setAiUsesToday(Math.min(AI_DAILY_LIMIT, Math.max(0, saved.count ?? 0)))
        } else {
          window.localStorage.setItem(AI_USAGE_KEY, JSON.stringify({ date: localDayKey(), count: 0 }))
        }
      } catch {
        /* ignore */
      }
    }, 0)
    return () => window.clearTimeout(hydration)
  }, [])

  useEffect(() => {
    const now = new Date()
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const timer = window.setTimeout(() => {
      setAiUsesToday(0)
      try {
        window.localStorage.setItem(AI_USAGE_KEY, JSON.stringify({ date: localDayKey(), count: 0 }))
      } catch {
        /* ignore */
      }
    }, nextMidnight.getTime() - now.getTime() + 250)
    return () => window.clearTimeout(timer)
  }, [aiUsesToday])

  useEffect(() => {
    if (scrollKey === 0) return
    const timer = window.setTimeout(() => {
      const node = document.getElementById(`result-${scrollTarget.current}`) ?? resultRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const top = window.scrollY + rect.top - Math.max(76, (window.innerHeight - rect.height) / 2)
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [scrollKey])

  function showResults(target: "match" | "batch" | "analysis") {
    scrollTarget.current = target
    setScrollKey((key) => key + 1)
  }

  function resetOutputs() {
    setMatch(null)
    setBatch(null)
    setPlay(null)
    setAnalysis(null)
    setAnalysisError(null)
  }

  const homeSeasons = seasonsForClub(teams, homeClub, includeCurrent)
  const awaySeasons = seasonsForClub(teams, awayClub, includeCurrent)
  const home =
    homeSeasons.find((team) => team.id === homeId) ??
    preferredSeason(homeSeasons, includeCurrent) ??
    homeSeasons[0]!
  const away =
    awaySeasons.find((team) => team.id === awayId) ??
    preferredSeason(awaySeasons, includeCurrent) ??
    awaySeasons[0]!
  const sameTeam = home.id === away.id
  const aiRemaining = Math.max(0, AI_DAILY_LIMIT - aiUsesToday)
  const homeSquad = teamSquad(home.team)
  const awaySquad = teamSquad(away.team)

  function changeClub(side: "home" | "away", clubId: string) {
    if (clubId === (side === "home" ? homeClub : awayClub)) {
      setPicker(null)
      return
    }
    const seasons = seasonsForClub(teams, clubId, includeCurrent)
    const preferred = preferredSeason(seasons, includeCurrent)
    if (!preferred) return
    track("team_selected", { clubId, side })
    if (side === "home") {
      setHomeClub(clubId)
      setHomeId(preferred.id)
      if (!includeCurrent) legendHomeId.current = preferred.id
    } else {
      setAwayClub(clubId)
      setAwayId(preferred.id)
      if (!includeCurrent) legendAwayId.current = preferred.id
    }
    setPicker(null)
    resetOutputs()
  }

  function applyEra(clubId: string, includeNow: boolean, rememberedId?: string) {
    const seasons = seasonsForClub(teams, clubId, includeNow)
    if (rememberedId) {
      const remembered = seasons.find((season) => season.id === rememberedId)
      if (remembered) return remembered.id
    }
    return preferredSeason(seasons, includeNow)?.id
  }

  function setCurrentSquads(next: boolean) {
    if (next === includeCurrent) return
    setIncludeCurrent(next)
    if (next) {
      legendHomeId.current = homeId
      legendAwayId.current = awayId
      const nextHome = applyEra(homeClub, true)
      const nextAway = applyEra(awayClub, true)
      if (nextHome) setHomeId(nextHome)
      if (nextAway) setAwayId(nextAway)
    } else {
      const nextHome = applyEra(homeClub, false, legendHomeId.current)
      const nextAway = applyEra(awayClub, false, legendAwayId.current)
      if (nextHome) setHomeId(nextHome)
      if (nextAway) setAwayId(nextAway)
    }
    resetOutputs()
  }

  function changeSeason(side: "home" | "away", teamId: string) {
    track("season_selected", { teamId, side })
    if (side === "home") {
      setHomeId(teamId)
      if (!includeCurrent) legendHomeId.current = teamId
    } else {
      setAwayId(teamId)
      if (!includeCurrent) legendAwayId.current = teamId
    }
    resetOutputs()
  }

  function swapSides() {
    const nextHomeClub = awayClub
    const nextHomeId = awayId
    const nextLegendHome = legendAwayId.current
    legendAwayId.current = legendHomeId.current
    legendHomeId.current = nextLegendHome
    setAwayClub(homeClub)
    setAwayId(homeId)
    setHomeClub(nextHomeClub)
    setHomeId(nextHomeId)
    resetOutputs()
  }

  function simulateOnce() {
    if (sameTeam || play) return
    track("simulator_started", { home: home.id, away: away.id })
    const next = simulateMatch(home.team, away.team, createSeed())
    setMatch(null)
    setBatch(null)
    setAnalysis(null)
    setAnalysisError(null)
    setAnalysisLoading(false)
    setPlay({ kind: "match", match: next })
    showResults("match")
  }

  function simulateHundred() {
    if (sameTeam || play) return
    setRunning(true)
    track("simulate_100", { home: home.id, away: away.id })
    const result = simulateMany(home.team, away.team, 100, createSeed())
    setMatch(null)
    setBatch(null)
    setAnalysis(null)
    setAnalysisError(null)
    setAnalysisLoading(false)
    setPlay({ kind: "batch", result })
    setRunning(false)
    showResults("batch")
  }

  function finishPlay() {
    if (play?.kind === "match") setMatch(play.match)
    if (play?.kind === "batch") setBatch(play.result)
    setPlay(null)
  }

  function scrollToSetup() {
    document.getElementById("setup")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  async function shareMatch() {
    if (!match) return
    const url = absoluteUrl(`/match/${match.id}`)
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt("Copy this match URL", url)
    }
  }

  async function runAnalysis() {
    if (sameTeam) return
    setMatch(null)
    setBatch(null)
    setPlay(null)
    if (aiRemaining <= 0) {
      setAnalysis(null)
      setAnalysisError("You have used today’s 10 free AI analyses. Your quota resets at midnight.")
      showResults("analysis")
      return
    }
    setAnalysisLoading(true)
    setAnalysis(null)
    setAnalysisError(null)
    showResults("analysis")
    track("ai_analysis", { home: home.id, away: away.id })
    try {
      const request = fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeId: home.id, awayId: away.id }),
      })
      const [response] = await Promise.all([
        request,
        new Promise<void>((resolve) => window.setTimeout(resolve, 2400)),
      ])
      const data = (await response.json()) as {
        analysis?: PreMatchAnalysis
        source?: "ai" | "template"
        error?: string
      }
      if (!response.ok || !data.analysis) {
        throw new Error(data.error ?? "Could not generate analysis")
      }
      setAnalysis(data.analysis)
      const nextCount = Math.min(AI_DAILY_LIMIT, aiUsesToday + 1)
      setAiUsesToday(nextCount)
      try {
        window.localStorage.setItem(AI_USAGE_KEY, JSON.stringify({ date: localDayKey(), count: nextCount }))
      } catch {
        /* ignore */
      }
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : "Could not generate analysis")
    } finally {
      setAnalysisLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="grid gap-3">
        <div id="setup" className="faceoff-board result-anchor">
          <TeamColumn
            label={ui.home}
            side="home"
            seasons={homeSeasons}
            team={home}
            squad={homeSquad}
            onOpenPicker={() => setPicker("home")}
            onSeason={(value) => changeSeason("home", value)}
            name="home"
            changeLabel={ui.change}
          />

          <div className="faceoff-rail">
            <div className="faceoff-rail-inner">
              <div className="faceoff-vs">VS</div>
              <div className="era-mode" role="radiogroup" aria-label="Squad era">
                <button
                  type="button"
                  role="radio"
                  aria-checked={!includeCurrent}
                  className={!includeCurrent ? "is-on" : ""}
                  onClick={() => setCurrentSquads(false)}
                >
                  {ui.legendary}
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={includeCurrent}
                  className={includeCurrent ? "is-on" : ""}
                  onClick={() => setCurrentSquads(true)}
                >
                  {ui.now}
                </button>
              </div>
              <button type="button" onClick={swapSides} className="rail-swap">
                {ui.swap}
              </button>
              {sameTeam ? (
                <p className="text-center font-mono text-[11px] leading-4 text-danger">{ui.different}</p>
              ) : null}
              <button
                type="button"
                disabled={sameTeam || Boolean(play)}
                className="rail-btn rail-btn-primary"
                onClick={simulateOnce}
              >
                {play?.kind === "match" ? ui.playing : ui.simulate}
              </button>
              <button
                type="button"
                disabled={sameTeam || running || Boolean(play)}
                className="rail-btn"
                onClick={simulateHundred}
              >
                {play?.kind === "batch" ? ui.running : ui.hundred}
              </button>
              <button
                type="button"
                disabled={sameTeam || analysisLoading}
                className="rail-btn"
                onClick={runAnalysis}
              >
                <span className="flex flex-col items-center gap-0.5">
                  <span>{analysisLoading ? ui.analysing : ui.expert}</span>
                  <span className="font-mono text-[8px] normal-case tracking-normal opacity-70">{ui.daily} {aiRemaining}/{AI_DAILY_LIMIT}</span>
                </span>
              </button>
              <p className="rail-hint">
                <span className="md:hidden">Tap a player for PAC SHO PAS DRI DEF PHY</span>
                <span className="hidden md:inline">Hover a player for PAC SHO PAS DRI DEF PHY</span>
              </p>
            </div>
          </div>

          <TeamColumn
            label={ui.away}
            side="away"
            seasons={awaySeasons}
            team={away}
            squad={awaySquad}
            onOpenPicker={() => setPicker("away")}
            onSeason={(value) => changeSeason("away", value)}
            name="away"
            changeLabel={ui.change}
          />
        </div>
      </div>

      {play || match || batch || analysis || analysisLoading || analysisError ? (
      <div ref={resultRef} className="mt-6 mb-10 grid scroll-mt-20 gap-4">
        {play?.kind === "match" ? (
          <div id="result-match">
            <SimulationPlay
              kind="match"
              home={home.team}
              away={away.team}
              match={play.match}
              onDone={finishPlay}
            />
          </div>
        ) : match ? (
          <div id="result-match" className="grid gap-4">
            <MatchResult match={match} home={home.team} away={away.team} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>
                {ui.simulateAgain}
              </button>
              <button
                type="button"
                className="rail-btn rail-btn-inline"
                disabled={running}
                onClick={simulateHundred}
              >
                {running ? ui.running : ui.hundred}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>
                {ui.back}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={shareMatch}>
                {copied ? ui.copied : ui.copy}
              </button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <MatchStats match={match} />
              <MatchTimeline match={match} home={home.team} away={away.team} />
            </div>
          </div>
        ) : null}

        {play?.kind === "batch" ? (
          <div id="result-batch">
            <SimulationPlay
              kind="batch"
              home={home.team}
              away={away.team}
              batch={play.result}
              onDone={finishPlay}
            />
          </div>
        ) : batch ? (
          <div id="result-batch" className="grid gap-2">
            <MonteCarloResults result={batch} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>
                {ui.simulate}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={simulateHundred}>
                {ui.runAgain}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>
                {ui.back}
              </button>
            </div>
          </div>
        ) : null}

        {analysisError ? (
          <section id="result-analysis" className="result-panel border-2 border-gold/40 px-5 py-6 shadow-[8px_8px_0_#000]">
            <p className="font-display text-[8px] uppercase tracking-[0.24em] text-gold">Expert AI Analysis</p>
            <h2 className="mt-2 font-brand text-xl font-semibold text-text">{aiRemaining <= 0 ? "Daily free quota used" : "Analysis unavailable"}</h2>
            <p className="mt-2 font-mono text-sm leading-6 text-text/80">{analysisError}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>{ui.simulate}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={simulateHundred}>{ui.hundred}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>{ui.back}</button>
            </div>
          </section>
        ) : null}

        {analysisLoading ? (
          <AiAnalysisLoading home={home.team} away={away.team} />
        ) : analysis ? (
          <div className="grid gap-3">
            <AiAnalysisResult analysis={analysis} home={home.team} away={away.team} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>{ui.simulate}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={simulateHundred}>{ui.hundred}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={runAnalysis}>{ui.expertAgain} · {aiRemaining}/{AI_DAILY_LIMIT}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>{ui.back}</button>
            </div>
          </div>
        ) : null}
      </div>
      ) : null}

      {picker ? (
        <ClubPicker
          clubs={clubs}
          nations={nations}
          currentId={picker === "home" ? homeClub : awayClub}
          onSelect={(clubId) => changeClub(picker, clubId)}
          onClose={() => setPicker(null)}
        />
      ) : null}
    </div>
  )
}

function seasonsForClub(teams: TeamOption[], clubId: string, includeCurrent: boolean) {
  return teams
    .filter((team) => team.clubId === clubId && (includeCurrent || !isCurrentSquad(team.team)))
    .sort((a, b) => b.team.eraYear - a.team.eraYear)
}

function preferredSeason(seasons: TeamOption[], includeCurrent: boolean) {
  if (seasons.length === 0) return undefined
  if (includeCurrent) return seasons[0]
  return [...seasons].sort(
    (a, b) => b.overallRating - a.overallRating || b.team.eraYear - a.team.eraYear,
  )[0]
}

function uniqueOrgs(teams: TeamOption[], kind: TeamKind, includeCurrent: boolean) {
  const map = new Map<string, TeamOption>()
  for (const team of teams) {
    if (team.kind !== kind) continue
    if (!includeCurrent && isCurrentSquad(team.team)) continue
    const prev = map.get(team.clubId)
    if (!prev) {
      map.set(team.clubId, team)
      continue
    }
    const better = includeCurrent
      ? team.team.eraYear > prev.team.eraYear
      : team.overallRating > prev.overallRating ||
        (team.overallRating === prev.overallRating && team.team.eraYear > prev.team.eraYear)
    if (better) map.set(team.clubId, team)
  }
  return [...map.values()]
}

function TeamColumn({
  label,
  side,
  seasons,
  team,
  squad,
  onOpenPicker,
  onSeason,
  name,
  changeLabel,
}: {
  label: string
  side: "home" | "away"
  seasons: TeamOption[]
  team: TeamOption
  squad: SquadMember[]
  onOpenPicker: () => void
  onSeason: (teamId: string) => void
  name: "home" | "away"
  changeLabel: string
}) {
  const away = side === "away"
  const accent = away ? "text-danger" : "text-gold"
  const glow = eraGlow(team.team.trophies)

  return (
    <article
      className={`faceoff-card ${away ? "away faceoff-away" : "home faceoff-home"} ${glow ? "era-shine" : ""}`}
    >
      <div className={`faceoff-identity-wrap ${away ? "text-right" : ""} ${glow ? "era-sheen" : ""}`}>
        <button
          type="button"
          onClick={onOpenPicker}
          className={`faceoff-identity group w-full border-0 bg-transparent text-left outline-none hover:bg-white/5 ${
            away ? "flex-row-reverse text-right" : ""
          }`}
        >
          <PixelCrest clubId={team.clubId} size={40} />
          <span className="min-w-0 flex-1">
            <span className={`block font-display text-[8px] tracking-[0.2em] ${accent}`}>{label}</span>
            <span className="mt-0.5 block truncate font-mono text-[15px] font-semibold leading-5 tracking-tight text-text sm:text-lg sm:leading-6">
              {team.clubName}
            </span>
            <span className="mt-0.5 block truncate font-mono text-[11px] text-muted sm:text-xs">
              {team.manager}
              <span className="mx-1.5 text-line-hi">·</span>
              {team.formation}
            </span>
          </span>
          <OvrStamp value={team.overallRating} size="sm" align={away ? "left" : "right"} />
        </button>
      </div>

      <button type="button" onClick={onOpenPicker} className="faceoff-change">
        {changeLabel}
      </button>

      <div className="faceoff-seasons">
        <EraSelect
          seasons={seasons}
          value={team}
          align={away ? "right" : "left"}
          onChange={onSeason}
        />
      </div>

      <div className="faceoff-squad">
        <FaceOffSquad squad={squad} />
      </div>
      <input type="hidden" name={name} value={team.id} />
    </article>
  )
}
