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
import { FEATURED_MATCHUPS, pickRandomDreamPair } from "@/data/matchups"
import { teams as historicalTeams, toTeamOption } from "@/data/teams"
import { isCurrentSquad } from "@/lib/seo"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { track } from "@/lib/analytics"
import { absoluteUrl } from "@/lib/site"
import { copyOrShare, matchShareCopy } from "@/lib/share"
import { createSeed } from "@/lib/match-id"
import { loadLastMatchup, loadMatchHistory, pushMatchHistory, saveLastMatchup, type StoredMatch } from "@/lib/play-memory"
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

function scrollToNode(node: HTMLElement) {
  const top = window.scrollY + node.getBoundingClientRect().top - 72
  window.scrollTo({ top: Math.max(0, top), behavior: "auto" })
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
  defaultHome,
  defaultAway,
  locale,
  restoreLast = false,
}: {
  defaultHome?: string
  defaultAway?: string
  locale?: Locale
  restoreLast?: boolean
}) {
  const teams = useMemo(() => historicalTeams.map(toTeamOption), [])
  const ui = locale === "es" ? {
    home: "Local", away: "Visitante", legendary: "Leyendas", now: "Recientes", swap: "Cambiar", different: "Elige dos equipos distintos.", simulate: "Simular", playing: "Jugando…", expert: "Análisis experto IA", analysing: "Analizando…", daily: "Hoy", change: "Cambiar equipo ▾", simulateAgain: "Simular de nuevo", back: "Cambiar duelo", copy: "Copiar enlace", copied: "Copiado", shared: "Compartido", expertAgain: "Repetir análisis IA", next: "Siguiente duelo soñado", season: "Temporada", latest: "Plantilla reciente", bench: "Suplentes", dream: "¿Dream?", separateAi: "Pronóstico independiente de 100 partidos. Tu partido anterior sigue disponible en la pestaña Match result.", matchTab: "Resultado", aiTab: "IA experta", batchTab: "100 partidos", hundred: "100 partidos", hundredPlaying: "Calculando 100…", quotaUsed: "Cupo diario agotado", quotaBody: "Has usado los 10 análisis IA gratis de hoy. El cupo se reinicia a medianoche. Sigue pudiendo simular y correr 100 partidos gratis.", lastMatches: "Tus últimos partidos",
  } : locale === "pt-br" ? {
    home: "Casa", away: "Visitante", legendary: "Lendas", now: "Recentes", swap: "Trocar", different: "Escolha dois times diferentes.", simulate: "Simular", playing: "Jogando…", expert: "Análise especializada IA", analysing: "Analisando…", daily: "Hoje", change: "Trocar time ▾", simulateAgain: "Simular novamente", back: "Trocar confronto", copy: "Copiar link", copied: "Copiado", shared: "Compartilhado", expertAgain: "Repetir análise IA", next: "Próximo jogo dos sonhos", season: "Temporada", latest: "Elenco recente", bench: "Banco", dream: "Dream?", separateAi: "Previsão independente de 100 partidas. Seu jogo anterior continua disponível na aba Match result.", matchTab: "Resultado", aiTab: "IA expert", batchTab: "100 jogos", hundred: "100 jogos", hundredPlaying: "Calculando 100…", quotaUsed: "Cota diária esgotada", quotaBody: "Você usou as 10 análises de IA grátis de hoje. A cota zera à meia-noite. Ainda pode simular e rodar 100 jogos de graça.", lastMatches: "Suas últimas partidas",
  } : {
    home: "Home", away: "Away", legendary: "Legendary", now: "Recent", swap: "Swap", different: "Pick two different teams.", simulate: "Simulate", playing: "Playing…", expert: "Expert AI Analysis", analysing: "Analysing…", daily: "Daily", change: "Change team ▾", simulateAgain: "Simulate again", back: "Change matchup", copy: "Copy link", copied: "Copied", shared: "Shared", expertAgain: "Expert AI again", next: "Next dream match", season: "Season", latest: "Latest squad", bench: "Bench", dream: "Dream?", separateAi: "A separate 100-match forecast. Your previous match remains available under Match result.", matchTab: "Match result", aiTab: "Expert AI", batchTab: "100 matches", hundred: "100 matches", hundredPlaying: "Running 100…", quotaUsed: "Daily free quota used", quotaBody: "You have used today’s 10 free AI analyses. Your quota resets at midnight. You can still simulate matches and run 100-match probabilities for free.", lastMatches: "Your last matches",
  }
  const homeDefault = teams.find((team) => team.id === defaultHome) ?? teams[0]!
  const awayDefault =
    teams.find((team) => team.id === defaultAway) ??
    teams.find((team) => team.id !== homeDefault.id) ??
    teams[1] ??
    teams[0]!
  const clubs = useMemo(() => uniqueOrgs(teams, "club"), [teams])
  const nations = useMemo(() => uniqueOrgs(teams, "nation"), [teams])

  const [homeClub, setHomeClub] = useState(homeDefault.clubId)
  const [awayClub, setAwayClub] = useState(awayDefault.clubId)
  const [homeId, setHomeId] = useState(homeDefault.id)
  const [awayId, setAwayId] = useState(awayDefault.id)
  const [picker, setPicker] = useState<"home" | "away" | null>(null)
  const [match, setMatch] = useState<SimulatedMatch | null>(null)
  const [play, setPlay] = useState<
    | { kind: "match"; match: SimulatedMatch }
    | { kind: "batch"; batch: MonteCarloResult }
    | null
  >(null)
  const [batch, setBatch] = useState<MonteCarloResult | null>(null)
  const [analysis, setAnalysis] = useState<PreMatchAnalysis | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [aiUsesToday, setAiUsesToday] = useState(0)
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared">("idle")
  const [resultMode, setResultMode] = useState<"match" | "analysis" | "batch">("match")
  const [history, setHistory] = useState<StoredMatch[]>([])
  const resultRef = useRef<HTMLDivElement>(null)
  const analysisRequest = useRef<AbortController | null>(null)
  const reelTimer = useRef<number | null>(null)
  const scrollTarget = useRef<"match" | "analysis" | "batch">("match")
  const [scrollKey, setScrollKey] = useState(0)
  const [reel, setReel] = useState<{ home: TeamOption; away: TeamOption } | null>(null)
  const [rolling, setRolling] = useState(false)

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
      setHistory(loadMatchHistory())
      if (!restoreLast) return
      const last = loadLastMatchup()
      if (!last) return
      const nextHome = teams.find((team) => team.id === last.homeId)
      const nextAway = teams.find((team) => team.id === last.awayId)
      if (!nextHome || !nextAway || nextHome.id === nextAway.id) return
      setHomeClub(nextHome.clubId)
      setHomeId(nextHome.id)
      setAwayClub(nextAway.clubId)
      setAwayId(nextAway.id)
    }, 0)
    return () => window.clearTimeout(hydration)
  }, [restoreLast, teams])

  useEffect(() => {
    return () => {
      if (reelTimer.current) window.clearTimeout(reelTimer.current)
    }
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

  useEffect(() => () => analysisRequest.current?.abort(), [])

  useEffect(() => {
    if (scrollKey === 0) return
    const timer = window.setTimeout(() => {
      const node = resultRef.current ?? document.getElementById(`result-${scrollTarget.current}`)
      if (!node) return
      scrollToNode(node)
    }, 260)
    return () => window.clearTimeout(timer)
  }, [scrollKey])

  function showResults(target: "match" | "analysis" | "batch") {
    scrollTarget.current = target
    setResultMode(target)
    setScrollKey((key) => key + 1)
  }

  function resetOutputs() {
    analysisRequest.current?.abort()
    analysisRequest.current = null
    setMatch(null)
    setPlay(null)
    setBatch(null)
    setAnalysis(null)
    setAnalysisLoading(false)
    setAnalysisError(null)
  }

  function rememberPair(nextHomeId: string, nextAwayId: string) {
    saveLastMatchup(nextHomeId, nextAwayId)
  }

  function applyPair(nextHomeId: string, nextAwayId: string) {
    const nextHome = teams.find((team) => team.id === nextHomeId)
    const nextAway = teams.find((team) => team.id === nextAwayId)
    if (!nextHome || !nextAway || nextHome.id === nextAway.id) return
    setHomeClub(nextHome.clubId)
    setHomeId(nextHome.id)
    setAwayClub(nextAway.clubId)
    setAwayId(nextAway.id)
    resetOutputs()
  }

  const homeSeasons = useMemo(() => seasonsForClub(teams, homeClub), [teams, homeClub])
  const awaySeasons = useMemo(() => seasonsForClub(teams, awayClub), [teams, awayClub])
  const home = useMemo(() =>
    homeSeasons.find((team) => team.id === homeId) ?? preferredSeason(homeSeasons) ?? homeSeasons[0]!,
  [homeSeasons, homeId])
  const away = useMemo(() =>
    awaySeasons.find((team) => team.id === awayId) ?? preferredSeason(awaySeasons) ?? awaySeasons[0]!,
  [awaySeasons, awayId])
  const sameTeam = home.id === away.id
  const aiRemaining = Math.max(0, AI_DAILY_LIMIT - aiUsesToday)
  const shownHome = reel?.home ?? home
  const shownAway = reel?.away ?? away
  const homeSquad = useMemo(() => teamSquad(shownHome.team), [shownHome.team])
  const awaySquad = useMemo(() => teamSquad(shownAway.team), [shownAway.team])

  function changeClub(side: "home" | "away", clubId: string) {
    if (clubId === (side === "home" ? homeClub : awayClub)) {
      setPicker(null)
      return
    }
    const seasons = seasonsForClub(teams, clubId)
    const preferred = preferredSeason(seasons)
    if (!preferred) return
    track("team_selected", { clubId, side })
    if (side === "home") {
      setHomeClub(clubId)
      setHomeId(preferred.id)
    } else {
      setAwayClub(clubId)
      setAwayId(preferred.id)
    }
    setPicker(null)
    resetOutputs()
    rememberPair(
      side === "home" ? preferred.id : homeId,
      side === "away" ? preferred.id : awayId,
    )
  }

  function changeSeason(side: "home" | "away", teamId: string) {
    track("season_selected", { teamId, side })
    if (side === "home") {
      setHomeId(teamId)
    } else {
      setAwayId(teamId)
    }
    resetOutputs()
    rememberPair(side === "home" ? teamId : homeId, side === "away" ? teamId : awayId)
  }

  function swapSides() {
    const nextHomeClub = awayClub
    const nextHomeId = awayId
    setAwayClub(homeClub)
    setAwayId(homeId)
    setHomeClub(nextHomeClub)
    setHomeId(nextHomeId)
    resetOutputs()
    rememberPair(nextHomeId, homeId)
  }

  function simulateOnce() {
    if (sameTeam || play || analysisLoading) return
    track("simulator_started", { home: home.id, away: away.id })
    const next = simulateMatch(home.team, away.team, createSeed())
    setMatch(null)
    setAnalysis(null)
    setAnalysisError(null)
    setAnalysisLoading(false)
    setPlay({ kind: "match", match: next })
    rememberPair(home.id, away.id)
    showResults("match")
  }

  function runHundred() {
    if (sameTeam || play || analysisLoading) return
    track("simulate_100", { home: home.id, away: away.id, runs: 100 })
    const next = simulateMany(home.team, away.team, 100, `batch:${home.id}|${away.id}|${Date.now()}`)
    setAnalysis(null)
    setAnalysisError(null)
    setAnalysisLoading(false)
    setPlay({ kind: "batch", batch: next })
    rememberPair(home.id, away.id)
    showResults("batch")
  }

  function finishPlay() {
    if (play?.kind === "match") {
      setMatch(play.match)
      rememberPair(home.id, away.id)
      pushMatchHistory({
        id: play.match.id,
        homeId: home.id,
        awayId: away.id,
        homeName: home.clubName,
        awayName: away.clubName,
        homeSeason: home.displaySeason,
        awaySeason: away.displaySeason,
        homeScore: play.match.score.home,
        awayScore: play.match.score.away,
        seed: play.match.seed,
        at: Date.now(),
      })
      setHistory(loadMatchHistory())
      track("simulation_completed", { mode: "single", home: home.id, away: away.id })
      showResults("match")
    } else if (play?.kind === "batch") {
      setBatch(play.batch)
      track("simulation_completed", { mode: "batch", home: home.id, away: away.id })
      showResults("batch")
    }
    setPlay(null)
  }

  function scrollToSetup() {
    const setup = document.getElementById("setup")
    if (setup) scrollToNode(setup)
  }

  async function shareMatch() {
    if (!match) return
    const url = absoluteUrl(`/match/${match.id}`)
    const copy = matchShareCopy(
      home.clubName,
      home.displaySeason,
      match.score.home,
      away.clubName,
      away.displaySeason,
      match.score.away,
    )
    const result = await copyOrShare({ url, ...copy })
    track("match_shared", { method: result, home: home.id, away: away.id })
    if (result === "copied" || result === "shared") {
      setShareStatus(result)
      setTimeout(() => setShareStatus("idle"), 1600)
    }
  }

  async function runAnalysis() {
    if (sameTeam || play || analysisLoading) return
    setPlay(null)
    if (aiRemaining <= 0) {
      setAnalysis(null)
      setAnalysisError(ui.quotaBody)
      showResults("analysis")
      return
    }
    setAnalysisLoading(true)
    setAnalysis(null)
    setAnalysisError(null)
    showResults("analysis")
    track("ai_analysis", { home: home.id, away: away.id })
    analysisRequest.current?.abort()
    const controller = new AbortController()
    analysisRequest.current = controller
    try {
      const request = fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeId: home.id, awayId: away.id }),
        signal: controller.signal,
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
      if (controller.signal.aborted) return
      setAnalysis(data.analysis)
      track("ai_analysis_completed", { home: home.id, away: away.id, source: data.source ?? "unknown" })
      const nextCount = Math.min(AI_DAILY_LIMIT, aiUsesToday + 1)
      setAiUsesToday(nextCount)
      try {
        window.localStorage.setItem(AI_USAGE_KEY, JSON.stringify({ date: localDayKey(), count: nextCount }))
      } catch {
        /* ignore */
      }
    } catch (err) {
      if (controller.signal.aborted) return
      track("ai_analysis_failed", { home: home.id, away: away.id })
      setAnalysisError(err instanceof Error ? err.message : "Could not generate analysis")
    } finally {
      if (analysisRequest.current === controller) {
        analysisRequest.current = null
        setAnalysisLoading(false)
      }
    }
  }

  function rollDreamMatchup() {
    if (play || analysisLoading || rolling) return
    const legendary = teams.filter((team) => !isCurrentSquad(team.team))
    const pool = (legendary.length >= 8 ? legendary : teams).map((team) => team.id)
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const [finalHomeId, finalAwayId] = pickRandomDreamPair(pool, { homeId: home.id, awayId: away.id })
    const settle = () => {
      if (reelTimer.current) {
        window.clearTimeout(reelTimer.current)
        reelTimer.current = null
      }
      setReel(null)
      setRolling(false)
      applyPair(finalHomeId, finalAwayId)
      rememberPair(finalHomeId, finalAwayId)
      track("random_dream_matchup", { home: finalHomeId, away: finalAwayId })
    }
    if (reduced) {
      settle()
      return
    }
    setRolling(true)
    const started = performance.now()
    const tick = () => {
      const elapsed = performance.now() - started
      const [nextHomeId, nextAwayId] = pickRandomDreamPair(pool)
      const nextHome = teams.find((team) => team.id === nextHomeId)
      const nextAway = teams.find((team) => team.id === nextAwayId)
      if (nextHome && nextAway) setReel({ home: nextHome, away: nextAway })
      if (elapsed >= 1500) {
        settle()
        return
      }
      const delay = elapsed < 850 ? 50 : 50 + (elapsed - 850) * 0.2
      reelTimer.current = window.setTimeout(tick, delay)
    }
    tick()
  }

  function playNextDreamMatch() {
    if (play || analysisLoading) return
    const currentIndex = FEATURED_MATCHUPS.findIndex(([left, right]) =>
      (left === home.id && right === away.id) || (left === away.id && right === home.id),
    )
    const [nextHomeId, nextAwayId] = FEATURED_MATCHUPS[(currentIndex + 1) % FEATURED_MATCHUPS.length]!
    const nextHome = teams.find((team) => team.id === nextHomeId)
    const nextAway = teams.find((team) => team.id === nextAwayId)
    if (!nextHome || !nextAway) return
    analysisRequest.current?.abort()
    analysisRequest.current = null
    setHomeClub(nextHome.clubId)
    setHomeId(nextHome.id)
    setAwayClub(nextAway.clubId)
    setAwayId(nextAway.id)
    setMatch(null)
    setBatch(null)
    setAnalysis(null)
    setAnalysisError(null)
    setAnalysisLoading(false)
    const next = simulateMatch(nextHome.team, nextAway.team, createSeed())
    setPlay({ kind: "match", match: next })
    track("next_dream_match_started", { home: nextHome.id, away: nextAway.id })
    showResults("match")
  }

  return (
    <div className="w-full">
      <div className="grid gap-3">
        <div id="setup" className="faceoff-board result-anchor">
          <TeamColumn
            label={ui.home}
            side="home"
            seasons={homeSeasons}
            team={shownHome}
            squad={homeSquad}
            spinning={Boolean(reel)}
            onOpenPicker={() => setPicker("home")}
            onSeason={(value) => changeSeason("home", value)}
            name="home"
            changeLabel={ui.change}
            seasonLabels={{ latest: ui.latest, season: ui.season }}
            benchLabel={ui.bench}
          />

          <div className="faceoff-rail">
            <div className="faceoff-rail-inner">
              <div className="faceoff-vs">VS</div>
              <button type="button" onClick={swapSides} className="rail-swap" disabled={rolling}>
                {ui.swap}
              </button>
              {sameTeam ? (
                <p className="text-center font-mono text-[11px] leading-4 text-danger">{ui.different}</p>
              ) : null}
              <button
                type="button"
                disabled={sameTeam || Boolean(play) || analysisLoading || rolling}
                className="rail-btn rail-btn-primary"
                onClick={simulateOnce}
              >
                {play?.kind === "match" ? ui.playing : ui.simulate}
              </button>
              <button
                type="button"
                disabled={sameTeam || Boolean(play) || analysisLoading || rolling}
                className="rail-btn"
                onClick={runHundred}
              >
                {play?.kind === "batch" ? ui.hundredPlaying : ui.hundred}
              </button>
              <button
                type="button"
                disabled={sameTeam || analysisLoading || Boolean(play) || rolling}
                className="rail-btn rail-btn-ai"
                onClick={runAnalysis}
              >
                <span className="flex flex-col items-center gap-0.5">
                  <span>{analysisLoading ? ui.analysing : ui.expert}</span>
                  <span className="font-mono text-[8px] normal-case tracking-normal opacity-70">{ui.daily} {aiRemaining}/{AI_DAILY_LIMIT}</span>
                </span>
              </button>
              <button
                type="button"
                className="dream-dice"
                disabled={Boolean(play) || analysisLoading || rolling}
                onClick={rollDreamMatchup}
                aria-label="Roll a random dream matchup"
              >
                <span className={`dream-die${rolling ? " is-rolling" : ""}`} aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </span>
                <span>{ui.dream}</span>
              </button>
            </div>
          </div>

          <TeamColumn
            label={ui.away}
            side="away"
            seasons={awaySeasons}
            team={shownAway}
            squad={awaySquad}
            spinning={Boolean(reel)}
            onOpenPicker={() => setPicker("away")}
            onSeason={(value) => changeSeason("away", value)}
            name="away"
            changeLabel={ui.change}
            seasonLabels={{ latest: ui.latest, season: ui.season }}
            benchLabel={ui.bench}
          />
        </div>
      </div>

      {history.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="font-display text-[8px] uppercase tracking-[0.16em] text-muted">{ui.lastMatches}</p>
          {history.slice(0, 5).map((item) => (
            <button
              key={item.id}
              type="button"
              className="border border-white/15 bg-black/20 px-2 py-1 font-mono text-[10px] text-text hover:border-gold hover:text-gold"
              onClick={() => applyPair(item.homeId, item.awayId)}
            >
              {item.homeName} {item.homeScore}–{item.awayScore} {item.awayName}
            </button>
          ))}
        </div>
      ) : null}

      {play || match || batch || analysis || analysisLoading || analysisError ? (
      <div ref={resultRef} className="mt-6 mb-10 grid scroll-mt-20 gap-4">
        {!play && [match, batch, analysis || analysisLoading || analysisError].filter(Boolean).length > 1 ? (
          <div className="inline-flex w-fit overflow-hidden border border-white/15 bg-black/25 p-1" role="tablist" aria-label="Result view">
            {match ? <button type="button" role="tab" aria-selected={resultMode === "match"} onClick={() => showResults("match")} className={`px-3 py-2 font-display text-[8px] uppercase tracking-[0.14em] ${resultMode === "match" ? "bg-gold text-ink" : "text-muted hover:text-text"}`}>{ui.matchTab}</button> : null}
            {batch ? <button type="button" role="tab" aria-selected={resultMode === "batch"} onClick={() => showResults("batch")} className={`px-3 py-2 font-display text-[8px] uppercase tracking-[0.14em] ${resultMode === "batch" ? "bg-gold text-ink" : "text-muted hover:text-text"}`}>{ui.batchTab}</button> : null}
            {analysis || analysisLoading || analysisError ? <button type="button" role="tab" aria-selected={resultMode === "analysis"} onClick={() => showResults("analysis")} className={`px-3 py-2 font-display text-[8px] uppercase tracking-[0.14em] ${resultMode === "analysis" ? "bg-gold text-ink" : "text-muted hover:text-text"}`}>{ui.aiTab}</button> : null}
          </div>
        ) : null}
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
        ) : play?.kind === "batch" ? (
          <div id="result-batch">
            <SimulationPlay
              kind="batch"
              home={home.team}
              away={away.team}
              batch={play.batch}
              onDone={finishPlay}
            />
          </div>
        ) : match && resultMode === "match" ? (
          <div id="result-match" className="grid gap-4">
            <MatchResult match={match} home={home.team} away={away.team} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>
                {ui.simulateAgain}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={runHundred}>
                {ui.hundred}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>
                {ui.back}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={shareMatch}>
                {shareStatus === "shared" ? ui.shared : shareStatus === "copied" ? ui.copied : ui.copy}
              </button>
              <button type="button" className="rail-btn rail-btn-ai rail-btn-inline" onClick={playNextDreamMatch}>
                {ui.next}
              </button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <MatchStats match={match} />
              <MatchTimeline match={match} home={home.team} away={away.team} />
            </div>
          </div>
        ) : batch && resultMode === "batch" ? (
          <div id="result-batch" className="grid gap-4">
            <MonteCarloResults result={batch} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>{ui.simulate}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={runHundred}>{ui.hundred}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>{ui.back}</button>
            </div>
          </div>
        ) : null}

        {resultMode === "analysis" && analysisError ? (
          <section id="result-analysis" className="result-panel border-2 border-gold/40 px-5 py-6 shadow-[8px_8px_0_#000]">
            <p className="font-display text-[8px] uppercase tracking-[0.24em] text-gold">{ui.expert}</p>
            <h2 className="mt-2 font-brand text-xl font-semibold text-text">{aiRemaining <= 0 ? ui.quotaUsed : "Analysis unavailable"}</h2>
            <p className="mt-2 font-mono text-sm leading-6 text-text/80">{analysisError}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>{ui.simulate}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={runHundred}>{ui.hundred}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>{ui.back}</button>
            </div>
          </section>
        ) : null}

        {resultMode === "analysis" && analysisLoading ? (
          <AiAnalysisLoading home={home.team} away={away.team} />
        ) : resultMode === "analysis" && analysis ? (
          <div className="grid gap-3">
            {match ? <p className="border-l-2 border-gold/60 px-3 font-mono text-[10px] leading-5 text-muted">{ui.separateAi}</p> : null}
            <AiAnalysisResult analysis={analysis} home={home.team} away={away.team} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>{ui.simulate}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={runHundred}>{ui.hundred}</button>
              <button type="button" className="rail-btn rail-btn-ai rail-btn-inline" onClick={runAnalysis}>{ui.expertAgain} · {aiRemaining}/{AI_DAILY_LIMIT}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>{ui.back}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={playNextDreamMatch}>{ui.next}</button>
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

function seasonsForClub(teams: TeamOption[], clubId: string) {
  return teams
    .filter((team) => team.clubId === clubId)
    .sort((a, b) => b.team.eraYear - a.team.eraYear)
}

function preferredSeason(seasons: TeamOption[]) {
  if (seasons.length === 0) return undefined
  const legendary = seasons.filter((season) => !isCurrentSquad(season.team))
  return [...(legendary.length > 0 ? legendary : seasons)].sort(
    (a, b) => b.overallRating - a.overallRating || b.team.eraYear - a.team.eraYear,
  )[0]
}

function uniqueOrgs(teams: TeamOption[], kind: TeamKind) {
  const map = new Map<string, TeamOption>()
  for (const team of teams) {
    if (team.kind !== kind) continue
    const prev = map.get(team.clubId)
    if (!prev) {
      map.set(team.clubId, team)
      continue
    }
    const teamLegend = !isCurrentSquad(team.team)
    const prevLegend = !isCurrentSquad(prev.team)
    const better = (teamLegend && !prevLegend) || (teamLegend === prevLegend && (team.overallRating > prev.overallRating ||
      (team.overallRating === prev.overallRating && team.team.eraYear > prev.team.eraYear)))
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
  spinning = false,
  onOpenPicker,
  onSeason,
  name,
  changeLabel,
  seasonLabels,
  benchLabel,
}: {
  label: string
  side: "home" | "away"
  seasons: TeamOption[]
  team: TeamOption
  squad: SquadMember[]
  spinning?: boolean
  onOpenPicker: () => void
  onSeason: (teamId: string) => void
  name: "home" | "away"
  changeLabel: string
  seasonLabels: { latest: string; season: string }
  benchLabel: string
}) {
  const away = side === "away"
  const accent = away ? "text-danger" : "text-gold"
  const glow = eraGlow(team.team.trophies)

  return (
    <article
      className={`faceoff-card ${away ? "away faceoff-away" : "home faceoff-home"} ${glow ? "era-shine" : ""} ${spinning ? "is-spinning" : ""}`}
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
          labels={seasonLabels}
          onChange={onSeason}
        />
      </div>

      <div className="faceoff-squad">
        <FaceOffSquad squad={squad} benchLabel={benchLabel} />
      </div>
      <input type="hidden" name={name} value={team.id} />
    </article>
  )
}
