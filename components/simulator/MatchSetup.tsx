"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ClubPicker } from "@/components/simulator/ClubPicker"
import { AiAnalysisLoading, AiAnalysisResult } from "@/components/simulator/AiAnalysisResult"
import { EraSelect } from "@/components/simulator/EraSelect"
import { MatchResult } from "@/components/simulator/MatchResult"
import { MatchStats } from "@/components/simulator/MatchStats"
import { MatchTimeline } from "@/components/simulator/MatchTimeline"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { SimulationPlay, SimulationStage } from "@/components/simulator/SimulationPlay"
import { FaceOffSquad } from "@/components/teams/SquadPanel"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { eraGlow } from "@/data/trophies"
import { FEATURED_MATCHUPS, pickRandomDreamPair } from "@/data/featured-pairs"
import { catalogStub, isCurrentEntry, type TeamCatalogEntry } from "@/data/team-catalog-types"
import { loadSimulatorTeam } from "@/app/actions"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { track } from "@/lib/analytics"
import { absoluteUrl } from "@/lib/site"
import { copyOrShare, matchShareCopy } from "@/lib/share"
import { createSeed } from "@/lib/match-id"
import { loadLastMatchup, loadMatchHistory, pushMatchHistory, saveLastMatchup, type StoredMatch } from "@/lib/play-memory"
import { BATCH_RUNS, simulateManyAsync, simulateMatch } from "@/lib/simulation"
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

function changeClubLabel(locale: Locale | undefined, clubName: string) {
  if (locale === "es") return `Cambiar ${clubName} ▾`
  if (locale === "pt-br") return `Trocar ${clubName} ▾`
  return `Change ${clubName} ▾`
}

type NamedSide = { clubName: string; displaySeason: string }

function namedRailCopy(locale: Locale | undefined, home: NamedSide, away: NamedSide) {
  const pair = `${home.clubName} vs ${away.clubName}`
  const sides = `${home.clubName} / ${away.clubName}`
  if (locale === "es") {
    return {
      swap: `Cambiar ${sides}`,
      different: `Elige otro rival, no dos ${home.clubName}.`,
      playing: `Jugando ${home.clubName}…`,
      expert: "Análisis experto IA",
      analysing: "Analizando…",
      simulateAgain: `Simular ${home.clubName} de nuevo`,
      back: `Cambiar ${pair}`,
      expertAgain: "Repetir análisis IA",
      next: `Siguiente noche, no ${pair}`,
      dream: "Duelo al azar",
      dreaming: "Eligiendo…",
      separateAi: `Pronóstico independiente de 100 partidos. Tu ${home.clubName} anterior sigue en Resultado ${home.clubName}.`,
      matchTab: `Resultado ${home.clubName}`,
      aiTab: `IA ${home.clubName}`,
      batchTab: `${BATCH_RUNS} noches ${home.clubName}`,
      hundred: `${BATCH_RUNS} noches ${home.clubName}`,
      hundredPlaying: `Calculando ${BATCH_RUNS} ${home.clubName}…`,
      quotaUsed: `Cupo de ${home.clubName} agotado`,
      quotaBody: `Has usado los 10 análisis IA gratis de ${home.clubName}. El cupo se reinicia a medianoche. Sigue pudiendo simular y correr ${BATCH_RUNS} partidos gratis.`,
      lastMatches: `Tus noches de ${home.clubName}`,
      analysisUnavailable: `IA ${home.clubName} no disponible`,
      resultAria: `Resultados ${pair}`,
      batchSecondary: `Probando otras noches de ${home.displaySeason}…`,
      copy: `Copiar ${home.clubName}`,
      copied: `Copiado ${home.clubName}`,
      shared: `Compartido ${home.clubName}`,
      daily: "Hoy",
    }
  }
  if (locale === "pt-br") {
    return {
      swap: `Trocar ${sides}`,
      different: `Escolha outro rival, não dois ${home.clubName}.`,
      playing: `Jogando ${home.clubName}…`,
      expert: "Análise especializada IA",
      analysing: "Analisando…",
      simulateAgain: `Simular ${home.clubName} de novo`,
      back: `Trocar ${pair}`,
      expertAgain: "Repetir análise IA",
      next: `Próxima noite, não ${pair}`,
      dream: "Sortear duelo",
      dreaming: "Sorteando…",
      separateAi: `Previsão independente de 100 partidas. Seu ${home.clubName} anterior continua em Placar ${home.clubName}.`,
      matchTab: `Placar ${home.clubName}`,
      aiTab: `IA ${home.clubName}`,
      batchTab: `${BATCH_RUNS} noites ${home.clubName}`,
      hundred: `${BATCH_RUNS} noites ${home.clubName}`,
      hundredPlaying: `Calculando ${BATCH_RUNS} ${home.clubName}…`,
      quotaUsed: `Cota do ${home.clubName} esgotada`,
      quotaBody: `Você usou as 10 análises de IA grátis de ${home.clubName}. A cota zera à meia-noite. Ainda pode simular e rodar ${BATCH_RUNS} jogos de graça.`,
      lastMatches: `Suas noites do ${home.clubName}`,
      analysisUnavailable: `IA ${home.clubName} indisponível`,
      resultAria: `Resultados ${pair}`,
      batchSecondary: `Testando outras noites de ${home.displaySeason}…`,
      copy: `Copiar ${home.clubName}`,
      copied: `Copiado ${home.clubName}`,
      shared: `Compartilhado ${home.clubName}`,
      daily: "Hoje",
    }
  }
  return {
    swap: `Swap ${sides}`,
    different: `Pick two sides other than ${home.clubName}.`,
    playing: `Playing ${home.clubName}…`,
    expert: "Expert AI Analysis",
    analysing: "Analysing…",
    simulateAgain: `Simulate ${home.clubName} again`,
    back: `Change ${pair}`,
    expertAgain: "Expert AI again",
    next: `Next night, not ${pair}`,
    dream: "Random matchup",
    dreaming: "Rolling…",
    separateAi: `A separate 100-match forecast. Your previous ${home.clubName} night remains under ${home.clubName} result.`,
    matchTab: `${home.clubName} result`,
    aiTab: `${home.clubName} AI`,
    batchTab: `${BATCH_RUNS} ${home.clubName} nights`,
    hundred: `${BATCH_RUNS} ${home.clubName} nights`,
    hundredPlaying: `Running ${BATCH_RUNS} ${home.clubName}…`,
    quotaUsed: `${home.clubName} quota used`,
    quotaBody: `You have used today’s 10 free ${home.clubName} AI analyses. Your quota resets at midnight. You can still simulate matches and run ${BATCH_RUNS}-match probabilities for free.`,
    lastMatches: `Your ${home.clubName} nights`,
    analysisUnavailable: `${home.clubName} analysis unavailable`,
    resultAria: `${pair} results`,
    batchSecondary: `Testing ${home.displaySeason} nights…`,
    copy: `Copy ${home.clubName}`,
    copied: `Copied ${home.clubName}`,
    shared: `Shared ${home.clubName}`,
    daily: "Daily",
  }
}

export function MatchSetup({
  catalog,
  initialSquads,
  defaultHome,
  defaultAway,
  locale,
  restoreLast = false,
}: {
  catalog: TeamCatalogEntry[]
  initialSquads: HistoricalTeam[]
  defaultHome?: string
  defaultAway?: string
  locale?: Locale
  restoreLast?: boolean
}) {
  const ui = locale === "es" ? {
    home: "Local", away: "Visitante", simulate: "Simular", bench: "Suplentes",
  } : locale === "pt-br" ? {
    home: "Casa", away: "Visitante", simulate: "Simular", bench: "Banco",
  } : {
    home: "Home", away: "Away", simulate: "Simulate", bench: "Bench",
  }
  const byId = useMemo(() => new Map(catalog.map((entry) => [entry.id, entry])), [catalog])
  const homeDefault = (defaultHome ? byId.get(defaultHome) : undefined) ?? catalog[0]!
  const awayDefault =
    (defaultAway ? byId.get(defaultAway) : undefined) ??
    catalog.find((entry) => entry.id !== homeDefault.id) ??
    catalog[1] ??
    catalog[0]!
  const clubs = useMemo(() => uniqueOrgs(catalog, "club"), [catalog])
  const nations = useMemo(() => uniqueOrgs(catalog, "nation"), [catalog])
  const [squads, setSquads] = useState<Record<string, HistoricalTeam>>(() =>
    Object.fromEntries(initialSquads.map((team) => [team.id, team])),
  )
  const squadsRef = useRef(squads)
  squadsRef.current = squads

  const [homeClub, setHomeClub] = useState(homeDefault.clubId)
  const [awayClub, setAwayClub] = useState(awayDefault.clubId)
  const [homeId, setHomeId] = useState(homeDefault.id)
  const [awayId, setAwayId] = useState(awayDefault.id)
  const [picker, setPicker] = useState<"home" | "away" | null>(null)
  const [match, setMatch] = useState<SimulatedMatch | null>(null)
  const [play, setPlay] = useState<
    | { kind: "match"; match: SimulatedMatch }
    | { kind: "batch"; batch: MonteCarloResult }
    | { kind: "batch-running"; done: number; total: number }
    | null
  >(null)
  const [batch, setBatch] = useState<MonteCarloResult | null>(null)
  const [analysis, setAnalysis] = useState<PreMatchAnalysis | null>(null)
  const [analysisSource, setAnalysisSource] = useState<"ai" | "template" | null>(null)
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
      const nextHome = byId.get(last.homeId)
      const nextAway = byId.get(last.awayId)
      if (!nextHome || !nextAway || nextHome.id === nextAway.id) return
      void ensureSquads([nextHome.id, nextAway.id]).then(() => {
        setHomeClub(nextHome.clubId)
        setHomeId(nextHome.id)
        setAwayClub(nextAway.clubId)
        setAwayId(nextAway.id)
      })
    }, 0)
    return () => window.clearTimeout(hydration)
  }, [restoreLast, byId])

  useEffect(() => {
    void ensureSquads([homeId, awayId])
  }, [homeId, awayId])

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

  async function ensureSquads(ids: string[]) {
    const current = squadsRef.current
    const missing = [...new Set(ids)].filter((id) => id && !current[id])
    if (missing.length === 0) return current
    const loaded = await Promise.all(missing.map((id) => loadSimulatorTeam(id)))
    const next = { ...squadsRef.current }
    for (const team of loaded) {
      if (team) next[team.id] = team
    }
    squadsRef.current = next
    setSquads(next)
    return next
  }

  function applyPair(nextHomeId: string, nextAwayId: string) {
    const nextHome = byId.get(nextHomeId)
    const nextAway = byId.get(nextAwayId)
    if (!nextHome || !nextAway || nextHome.id === nextAway.id) return
    void ensureSquads([nextHome.id, nextAway.id])
    setHomeClub(nextHome.clubId)
    setHomeId(nextHome.id)
    setAwayClub(nextAway.clubId)
    setAwayId(nextAway.id)
    resetOutputs()
  }

  const homeSeasons = useMemo(
    () => seasonsForClub(catalog, homeClub).map((entry) => optionFor(entry, squads)),
    [catalog, homeClub, squads],
  )
  const awaySeasons = useMemo(
    () => seasonsForClub(catalog, awayClub).map((entry) => optionFor(entry, squads)),
    [catalog, awayClub, squads],
  )
  const home = useMemo(
    () => homeSeasons.find((team) => team.id === homeId) ?? homeSeasons[0]!,
    [homeSeasons, homeId],
  )
  const away = useMemo(
    () => awaySeasons.find((team) => team.id === awayId) ?? awaySeasons[0]!,
    [awaySeasons, awayId],
  )
  const sameTeam = home.id === away.id
  const squadsReady = Boolean(squads[home.id]?.players.length && squads[away.id]?.players.length)
  const aiRemaining = Math.max(0, AI_DAILY_LIMIT - aiUsesToday)
  const shownHome = reel?.home ?? home
  const shownAway = reel?.away ?? away
  const rail = namedRailCopy(locale, shownHome, shownAway)
  const homeSquad = useMemo(() => teamSquad(shownHome.team), [shownHome.team])
  const awaySquad = useMemo(() => teamSquad(shownAway.team), [shownAway.team])

  function changeClub(side: "home" | "away", clubId: string) {
    if (clubId === (side === "home" ? homeClub : awayClub)) {
      setPicker(null)
      return
    }
    const seasons = seasonsForClub(catalog, clubId)
    const preferred = preferredSeason(seasons)
    if (!preferred) return
    track("team_selected", { clubId, side })
    void ensureSquads([preferred.id])
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
    void ensureSquads([teamId])
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
    if (sameTeam || play || analysisLoading || !squadsReady) return
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

  async function runHundred() {
    if (sameTeam || play || analysisLoading || !squadsReady) return
    track("simulate_100", { home: home.id, away: away.id, runs: BATCH_RUNS })
    setAnalysis(null)
    setAnalysisError(null)
    setAnalysisLoading(false)
    setPlay({ kind: "batch-running", done: 0, total: BATCH_RUNS })
    rememberPair(home.id, away.id)
    showResults("batch")
    const next = await simulateManyAsync(
      home.team,
      away.team,
      BATCH_RUNS,
      `batch:${home.id}|${away.id}|${Date.now()}`,
      (done, total) => setPlay({ kind: "batch-running", done, total }),
    )
    setPlay(null)
    setBatch(next)
    track("simulation_completed", { mode: "batch", home: home.id, away: away.id, runs: BATCH_RUNS })
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
    if (sameTeam || play || analysisLoading || !squadsReady) return
    setPlay(null)
    if (aiRemaining <= 0) {
      setAnalysis(null)
      setAnalysisError(rail.quotaBody)
      showResults("analysis")
      return
    }
    setAnalysisLoading(true)
    setAnalysis(null)
    setAnalysisSource(null)
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
      setAnalysisSource(data.source ?? "template")
      track("ai_analysis_completed", { home: home.id, away: away.id, source: data.source ?? "unknown" })
      if (data.source === "ai") {
        const nextCount = Math.min(AI_DAILY_LIMIT, aiUsesToday + 1)
        setAiUsesToday(nextCount)
        try {
          window.localStorage.setItem(AI_USAGE_KEY, JSON.stringify({ date: localDayKey(), count: nextCount }))
        } catch {
          /* ignore */
        }
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
    const legendary = catalog.filter((entry) => !isCurrentEntry(entry))
    const pool = (legendary.length >= 8 ? legendary : catalog).map((entry) => entry.id)
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
      const nextHome = byId.get(nextHomeId)
      const nextAway = byId.get(nextAwayId)
      if (nextHome && nextAway) setReel({ home: optionFor(nextHome, squadsRef.current), away: optionFor(nextAway, squadsRef.current) })
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
    const nextHome = byId.get(nextHomeId)
    const nextAway = byId.get(nextAwayId)
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
    void ensureSquads([nextHome.id, nextAway.id]).then((loaded) => {
      const homeTeam = loaded[nextHome.id]
      const awayTeam = loaded[nextAway.id]
      if (!homeTeam?.players.length || !awayTeam?.players.length) return
      const next = simulateMatch(homeTeam, awayTeam, createSeed())
      setPlay({ kind: "match", match: next })
      track("next_dream_match_started", { home: nextHome.id, away: nextAway.id })
      showResults("match")
    })
  }

  return (
    <div className="w-full">
      <div className="grid gap-3">
        <div id="setup" className="faceoff-board result-anchor">
          <TeamColumn
            label={shownHome.displaySeason}
            roleLabel={ui.home}
            side="home"
            seasons={homeSeasons}
            team={shownHome}
            squad={homeSquad}
            spinning={Boolean(reel)}
            onOpenPicker={() => setPicker("home")}
            onSeason={(value) => changeSeason("home", value)}
            name="home"
            changeLabel={changeClubLabel(locale, shownHome.clubName)}
            benchLabel={ui.bench}
          />

          <div className="faceoff-rail">
            <div className="faceoff-rail-inner">
              <div className="faceoff-vs">{shownHome.clubName}</div>
              <button type="button" onClick={swapSides} className="rail-swap" disabled={rolling}>
                {rail.swap}
              </button>
              {sameTeam ? (
                <p className="text-center font-mono text-[11px] leading-4 text-danger">{rail.different}</p>
              ) : null}
              <button
                type="button"
                disabled={sameTeam || Boolean(play) || analysisLoading || rolling || !squadsReady}
                className="rail-btn rail-btn-primary"
                onClick={simulateOnce}
              >
                {play?.kind === "match" ? rail.playing : ui.simulate}
              </button>
              <button
                type="button"
                disabled={sameTeam || Boolean(play) || analysisLoading || rolling || !squadsReady}
                className="rail-btn"
                onClick={runHundred}
              >
                {play?.kind === "batch" || play?.kind === "batch-running" ? rail.hundredPlaying : rail.hundred}
              </button>
              <button
                type="button"
                disabled={sameTeam || analysisLoading || Boolean(play) || rolling || !squadsReady}
                className="rail-btn rail-btn-ai"
                onClick={runAnalysis}
              >
                <span className="flex flex-col items-center gap-0.5">
                  <span>{analysisLoading ? rail.analysing : rail.expert}</span>
                  <span className="font-mono text-[8px] normal-case tracking-normal opacity-70">{rail.daily} {aiRemaining}/{AI_DAILY_LIMIT}</span>
                </span>
              </button>
              <button
                type="button"
                className="rail-btn dream-dice"
                disabled={Boolean(play) || analysisLoading || rolling}
                onClick={rollDreamMatchup}
              >
                <svg
                  className={`dream-die${rolling ? " is-rolling" : ""}`}
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                >
                  <rect x="1" y="1" width="14" height="14" fill="#10140e" />
                  <rect x="1" y="1" width="14" height="1" fill="currentColor" />
                  <rect x="1" y="14" width="14" height="1" fill="currentColor" />
                  <rect x="1" y="1" width="1" height="14" fill="currentColor" />
                  <rect x="14" y="1" width="1" height="14" fill="currentColor" />
                  <rect x="4" y="4" width="2" height="2" fill="currentColor" />
                  <rect x="10" y="4" width="2" height="2" fill="currentColor" />
                  <rect x="7" y="7" width="2" height="2" fill="currentColor" />
                  <rect x="4" y="10" width="2" height="2" fill="currentColor" />
                  <rect x="10" y="10" width="2" height="2" fill="currentColor" />
                </svg>
                <span>{rolling ? rail.dreaming : rail.dream}</span>
              </button>
            </div>
          </div>

          <TeamColumn
            label={shownAway.displaySeason}
            roleLabel={ui.away}
            side="away"
            seasons={awaySeasons}
            team={shownAway}
            squad={awaySquad}
            spinning={Boolean(reel)}
            onOpenPicker={() => setPicker("away")}
            onSeason={(value) => changeSeason("away", value)}
            name="away"
            changeLabel={changeClubLabel(locale, shownAway.clubName)}
            benchLabel={ui.bench}
          />
        </div>
      </div>

      {history.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="font-display text-[8px] uppercase tracking-[0.16em] text-muted">{rail.lastMatches}</p>
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
          <div className="inline-flex w-fit overflow-hidden border border-white/15 bg-black/25 p-1" role="tablist" aria-label={rail.resultAria}>
            {match ? <button type="button" role="tab" aria-selected={resultMode === "match"} onClick={() => showResults("match")} className={`px-3 py-2 font-display text-[8px] uppercase tracking-[0.14em] ${resultMode === "match" ? "bg-gold text-ink" : "text-muted hover:text-text"}`}>{rail.matchTab}</button> : null}
            {batch ? <button type="button" role="tab" aria-selected={resultMode === "batch"} onClick={() => showResults("batch")} className={`px-3 py-2 font-display text-[8px] uppercase tracking-[0.14em] ${resultMode === "batch" ? "bg-gold text-ink" : "text-muted hover:text-text"}`}>{rail.batchTab}</button> : null}
            {analysis || analysisLoading || analysisError ? <button type="button" role="tab" aria-selected={resultMode === "analysis"} onClick={() => showResults("analysis")} className={`px-3 py-2 font-display text-[8px] uppercase tracking-[0.14em] ${resultMode === "analysis" ? "bg-gold text-ink" : "text-muted hover:text-text"}`}>{rail.aiTab}</button> : null}
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
        ) : play?.kind === "batch-running" ? (
          <div id="result-batch">
            <SimulationStage
              mode="batch"
              home={home.team}
              away={away.team}
              progress={(play.done / Math.max(1, play.total)) * 100}
              primary={`${play.done}/${play.total}`}
              secondary={rail.batchSecondary}
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
                {rail.simulateAgain}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={runHundred}>
                {rail.hundred}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>
                {rail.back}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={shareMatch}>
                {shareStatus === "shared" ? rail.shared : shareStatus === "copied" ? rail.copied : rail.copy}
              </button>
              <button type="button" className="rail-btn rail-btn-ai rail-btn-inline" onClick={playNextDreamMatch}>
                {rail.next}
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
              <button type="button" className="rail-btn rail-btn-inline" onClick={runHundred}>{rail.hundred}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>{rail.back}</button>
            </div>
          </div>
        ) : null}

        {resultMode === "analysis" && analysisError ? (
          <section id="result-analysis" className="result-panel border-2 border-gold/40 px-5 py-6 shadow-[8px_8px_0_#000]">
            <p className="font-display text-[8px] uppercase tracking-[0.24em] text-gold">{rail.expert}</p>
            <h2 className="mt-2 font-brand text-xl font-semibold text-text">{aiRemaining <= 0 ? rail.quotaUsed : rail.analysisUnavailable}</h2>
            <p className="mt-2 font-mono text-sm leading-6 text-text/80">{analysisError}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>{ui.simulate}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={runHundred}>{rail.hundred}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>{rail.back}</button>
            </div>
          </section>
        ) : null}

        {resultMode === "analysis" && analysisLoading ? (
          <AiAnalysisLoading home={home.team} away={away.team} />
        ) : resultMode === "analysis" && analysis ? (
          <div className="grid gap-3">
            {match ? <p className="border-l-2 border-gold/60 px-3 font-mono text-[10px] leading-5 text-muted">{rail.separateAi}</p> : null}
            <AiAnalysisResult analysis={analysis} home={home.team} away={away.team} source={analysisSource ?? undefined} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={simulateOnce}>{ui.simulate}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={runHundred}>{rail.hundred}</button>
              <button type="button" className="rail-btn rail-btn-ai rail-btn-inline" onClick={runAnalysis}>{rail.expertAgain} · {aiRemaining}/{AI_DAILY_LIMIT}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>{rail.back}</button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={playNextDreamMatch}>{rail.next}</button>
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

function optionFor(entry: TeamCatalogEntry, squads: Record<string, HistoricalTeam>): TeamOption {
  return {
    id: entry.id,
    clubId: entry.clubId,
    clubName: entry.clubName,
    clubCode: entry.clubCode,
    season: entry.season,
    displaySeason: entry.displaySeason,
    kind: entry.kind,
    overallRating: entry.overallRating,
    manager: entry.manager,
    formation: entry.formation,
    styleTags: entry.styleTags,
    team: squads[entry.id] ?? catalogStub(entry),
  }
}

function seasonsForClub(catalog: TeamCatalogEntry[], clubId: string) {
  return catalog
    .filter((team) => team.clubId === clubId)
    .sort((a, b) => b.eraYear - a.eraYear)
}

function preferredSeason(seasons: TeamCatalogEntry[]) {
  if (seasons.length === 0) return undefined
  const legendary = seasons.filter((season) => !isCurrentEntry(season))
  return [...(legendary.length > 0 ? legendary : seasons)].sort(
    (a, b) => b.overallRating - a.overallRating || b.eraYear - a.eraYear,
  )[0]
}

function uniqueOrgs(catalog: TeamCatalogEntry[], kind: TeamKind) {
  const map = new Map<string, TeamCatalogEntry>()
  for (const team of catalog) {
    if (team.kind !== kind) continue
    const prev = map.get(team.clubId)
    if (!prev) {
      map.set(team.clubId, team)
      continue
    }
    const teamLegend = !isCurrentEntry(team)
    const prevLegend = !isCurrentEntry(prev)
    const better = (teamLegend && !prevLegend) || (teamLegend === prevLegend && (team.overallRating > prev.overallRating ||
      (team.overallRating === prev.overallRating && team.eraYear > prev.eraYear)))
    if (better) map.set(team.clubId, team)
  }
  return [...map.values()].map((entry) => ({
    clubId: entry.clubId,
    clubName: entry.clubName,
    overallRating: entry.overallRating,
  }))
}

function TeamColumn({
  label,
  roleLabel,
  side,
  seasons,
  team,
  squad,
  spinning = false,
  onOpenPicker,
  onSeason,
  name,
  changeLabel,
  benchLabel,
}: {
  label: string
  roleLabel: string
  side: "home" | "away"
  seasons: TeamOption[]
  team: TeamOption
  squad: SquadMember[]
  spinning?: boolean
  onOpenPicker: () => void
  onSeason: (teamId: string) => void
  name: "home" | "away"
  changeLabel: string
  benchLabel: string
}) {
  const away = side === "away"
  const accent = away ? "text-danger" : "text-gold"
  const glow = eraGlow(team.team.trophies)

  return (
    <article
      className={`faceoff-card ${away ? "away faceoff-away" : "home faceoff-home"} ${glow ? "era-shine" : ""} ${spinning ? "is-spinning" : ""}`}
      aria-label={`${roleLabel}: ${team.clubName} ${team.displaySeason}`}
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
          <OvrStamp value={team.overallRating} size="sm" align={away ? "left" : "right"} label={team.displaySeason} />
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
        <FaceOffSquad
          squad={squad}
          xiLabel={`${team.clubName} ${team.displaySeason} XI`}
          benchLabel={`${team.clubName} ${team.displaySeason} ${benchLabel}`}
        />
      </div>
      <input type="hidden" name={name} value={team.id} />
    </article>
  )
}
