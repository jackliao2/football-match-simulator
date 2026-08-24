"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ClubPicker } from "@/components/simulator/ClubPicker"
import { EraSelect } from "@/components/simulator/EraSelect"
import { MatchResult } from "@/components/simulator/MatchResult"
import { MatchStats } from "@/components/simulator/MatchStats"
import { MatchTimeline } from "@/components/simulator/MatchTimeline"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { SimulationPlay } from "@/components/simulator/SimulationPlay"
import { FaceOffSquad } from "@/components/teams/SquadPanel"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { TrophyBadges } from "@/components/teams/TrophyBadges"
import { eraGlow } from "@/data/trophies"
import { isCurrentSquad } from "@/lib/seo"
import { ResultPanel } from "@/components/ui/ResultPanel"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { track } from "@/lib/analytics"
import { absoluteUrl } from "@/lib/site"
import { createSeed } from "@/lib/match-id"
import { simulateMany, simulateMatch } from "@/lib/simulation"
import { teamSquad, type SquadMember, type StarPlayer } from "@/lib/stars"
import type { HistoricalTeam, MonteCarloResult, SimulatedMatch, TeamKind } from "@/types"

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
  stars: StarPlayer[]
  squad: SquadMember[]
  team: HistoricalTeam
}

export function MatchSetup({
  teams,
  defaultHome,
  defaultAway,
}: {
  teams: TeamOption[]
  defaultHome?: string
  defaultAway?: string
}) {
  const [includeCurrent, setIncludeCurrent] = useState(false)
  const clubs = useMemo(() => uniqueOrgs(teams, "club", includeCurrent), [teams, includeCurrent])
  const nations = useMemo(() => uniqueOrgs(teams, "nation", includeCurrent), [teams, includeCurrent])

  const homeDefault = teams.find((team) => team.id === defaultHome) ?? teams[0]!
  const awayDefault =
    teams.find((team) => team.id === defaultAway) ??
    teams.find((team) => team.id !== homeDefault.id) ??
    teams[1] ??
    teams[0]!

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
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [analysisSource, setAnalysisSource] = useState<"ai" | "template" | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const scrollTarget = useRef<"match" | "batch" | "analysis">("match")
  const legendHomeId = useRef(homeDefault.id)
  const legendAwayId = useRef(awayDefault.id)
  const [scrollKey, setScrollKey] = useState(0)

  useEffect(() => {
    try {
      if (window.localStorage.getItem("lm-current-squads") !== "1") return
      setIncludeCurrent(true)
      const nextHome = preferredSeason(seasonsForClub(teams, homeClub, true), true)
      const nextAway = preferredSeason(seasonsForClub(teams, awayClub, true), true)
      if (nextHome) setHomeId(nextHome.id)
      if (nextAway) setAwayId(nextAway.id)
    } catch {
      /* ignore */
    }
    // Hydrate once from the saved Now/Legend switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scrollKey === 0) return
    const node = document.getElementById(`result-${scrollTarget.current}`) ?? resultRef.current
    node?.scrollIntoView({ behavior: "smooth", block: "start" })
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
  const homeSquad = home.squad.length > 0 ? home.squad : teamSquad(home.team)
  const awaySquad = away.squad.length > 0 ? away.squad : teamSquad(away.team)

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

  function toggleCurrentSquads() {
    const next = !includeCurrent
    setIncludeCurrent(next)
    try {
      window.localStorage.setItem("lm-current-squads", next ? "1" : "0")
    } catch {
      /* ignore */
    }
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
    setAnalysisLoading(true)
    setAnalysisError(null)
    track("ai_analysis", { home: home.id, away: away.id })
    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeId: home.id, awayId: away.id }),
      })
      const data = (await response.json()) as {
        report?: string
        source?: "ai" | "template"
        error?: string
      }
      if (!response.ok || !data.report) {
        throw new Error(data.error ?? "Could not generate analysis")
      }
      setAnalysis(data.report)
      setAnalysisSource(data.source ?? "template")
      showResults("analysis")
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
            label="Home"
            side="home"
            seasons={homeSeasons}
            team={home}
            squad={homeSquad}
            onOpenPicker={() => setPicker("home")}
            onSeason={(value) => changeSeason("home", value)}
            name="home"
          />

          <div className="faceoff-rail">
            <div className="faceoff-rail-inner">
              <div className="faceoff-vs">VS</div>
              <button
                type="button"
                className="era-mode"
                role="switch"
                aria-checked={includeCurrent}
                onClick={toggleCurrentSquads}
              >
                <span className={!includeCurrent ? "is-on" : ""}>Legend</span>
                <i className={includeCurrent ? "is-on" : ""} aria-hidden />
                <span className={includeCurrent ? "is-on" : ""}>Now</span>
              </button>
              <button type="button" onClick={swapSides} className="rail-swap">
                Swap
              </button>
              {sameTeam ? (
                <p className="text-center font-mono text-[11px] leading-4 text-danger">Pick two different teams.</p>
              ) : null}
              <button
                type="button"
                disabled={sameTeam || Boolean(play)}
                className="rail-btn rail-btn-primary"
                onClick={simulateOnce}
              >
                {play?.kind === "match" ? "Playing…" : "Simulate"}
              </button>
              <button
                type="button"
                disabled={sameTeam || running || Boolean(play)}
                className="rail-btn"
                onClick={simulateHundred}
              >
                {play?.kind === "batch" ? "Running…" : "100 Matches"}
              </button>
              <button
                type="button"
                disabled={sameTeam || analysisLoading}
                className="rail-btn"
                onClick={runAnalysis}
              >
                {analysisLoading ? "Writing…" : "AI Analysis"}
              </button>
              <p className="rail-hint">
                <span className="md:hidden">Tap a player for PAC SHO PAS DRI DEF PHY</span>
                <span className="hidden md:inline">Hover a player for PAC SHO PAS DRI DEF PHY</span>
              </p>
            </div>
          </div>

          <TeamColumn
            label="Away"
            side="away"
            seasons={awaySeasons}
            team={away}
            squad={awaySquad}
            onOpenPicker={() => setPicker("away")}
            onSeason={(value) => changeSeason("away", value)}
            name="away"
          />
        </div>
      </div>

      {play || match || batch || analysis || analysisError ? (
      <div ref={resultRef} className="result-anchor mt-6 grid gap-4">
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
                Simulate again
              </button>
              <button
                type="button"
                className="rail-btn rail-btn-inline"
                disabled={running}
                onClick={simulateHundred}
              >
                {running ? "Running…" : "100 Matches"}
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>
                Back to teams
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={shareMatch}>
                {copied ? "Copied" : "Copy link"}
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
                Simulate match
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={simulateHundred}>
                Run 100 again
              </button>
              <button type="button" className="rail-btn rail-btn-inline" onClick={scrollToSetup}>
                Back to teams
              </button>
            </div>
          </div>
        ) : null}

        {analysisError ? <p className="font-mono text-sm text-danger">{analysisError}</p> : null}

        {analysis ? (
          <ResultPanel
            id="result-analysis"
            kicker="Pre-match"
            title="Analysis"
            aside={analysisSource === "ai" ? "LLM brief" : "Local brief"}
          >
            <div className="whitespace-pre-wrap px-4 py-4 font-mono text-sm leading-7 text-text sm:px-5">
              {analysis}
            </div>
          </ResultPanel>
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
}: {
  label: string
  side: "home" | "away"
  seasons: TeamOption[]
  team: TeamOption
  squad: SquadMember[]
  onOpenPicker: () => void
  onSeason: (teamId: string) => void
  name: "home" | "away"
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
          <PixelCrest clubId={team.clubId} size={48} />
          <span className="min-w-0 flex-1">
            <span className={`block font-display text-[8px] tracking-[0.2em] ${accent}`}>{label}</span>
            <span className="mt-0.5 block truncate font-mono text-lg font-semibold leading-6 tracking-tight text-text sm:text-xl sm:leading-7">
              {team.clubName}
            </span>
            <span className="mt-0.5 block truncate font-mono text-xs text-muted sm:text-sm">
              {team.manager}
              <span className="mx-1.5 text-line-hi">·</span>
              {team.formation}
            </span>
          </span>
          <OvrStamp value={team.overallRating} size="md" align={away ? "left" : "right"} />
        </button>
        <div className="trophy-slot">
          <TrophyBadges trophies={team.team.trophies} align={away ? "right" : "left"} />
        </div>
      </div>

      <button type="button" onClick={onOpenPicker} className="faceoff-change">
        Change team ▾
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
