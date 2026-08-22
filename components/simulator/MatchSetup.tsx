"use client"

import { useMemo, useState } from "react"
import { startMatch } from "@/app/actions"
import { ClubPicker } from "@/components/simulator/ClubPicker"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { FaceOffSquad } from "@/components/teams/SquadPanel"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { PixelButton } from "@/components/ui/PixelButton"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { track } from "@/lib/analytics"
import { createSeed } from "@/lib/match-id"
import { simulateMany } from "@/lib/simulation"
import { teamSquad, type SquadMember, type StarPlayer } from "@/lib/stars"
import type { HistoricalTeam, MonteCarloResult, TeamKind } from "@/types"

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
  const clubs = useMemo(() => uniqueOrgs(teams, "club"), [teams])
  const nations = useMemo(() => uniqueOrgs(teams, "nation"), [teams])

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
  const [batch, setBatch] = useState<MonteCarloResult | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [analysisSource, setAnalysisSource] = useState<"ai" | "template" | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  const homeSeasons = teams.filter((team) => team.clubId === homeClub)
  const awaySeasons = teams.filter((team) => team.clubId === awayClub)
  const home = teams.find((team) => team.id === homeId) ?? homeSeasons[0]!
  const away = teams.find((team) => team.id === awayId) ?? awaySeasons[0]!
  const sameTeam = home.id === away.id
  const homeSquad = home.squad.length > 0 ? home.squad : teamSquad(home.team)
  const awaySquad = away.squad.length > 0 ? away.squad : teamSquad(away.team)

  function changeClub(side: "home" | "away", clubId: string) {
    const seasons = teams.filter((team) => team.clubId === clubId)
    const preferred =
      seasons.find((team) => team.id === (side === "home" ? homeId : awayId)) ?? seasons[0]
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
    setBatch(null)
    setAnalysis(null)
  }

  function changeSeason(side: "home" | "away", teamId: string) {
    track("season_selected", { teamId, side })
    if (side === "home") setHomeId(teamId)
    else setAwayId(teamId)
    setBatch(null)
    setAnalysis(null)
  }

  function swapSides() {
    const nextHomeClub = awayClub
    const nextHomeId = awayId
    setAwayClub(homeClub)
    setAwayId(homeId)
    setHomeClub(nextHomeClub)
    setHomeId(nextHomeId)
    setBatch(null)
    setAnalysis(null)
  }

  function simulateHundred() {
    if (sameTeam) return
    setRunning(true)
    track("simulate_100", { home: home.id, away: away.id })
    const result = simulateMany(home.team, away.team, 100, createSeed())
    setBatch(result)
    setRunning(false)
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
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : "Could not generate analysis")
    } finally {
      setAnalysisLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form
        action={startMatch}
        onSubmit={() => track("simulator_started", { home: home.id, away: away.id })}
        className="grid gap-3"
      >
        <div className="faceoff-board">
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
              <div className="text-center">
                <div className="font-display text-2xl tracking-[0.28em] text-gold sm:text-3xl">VS</div>
                <button
                  type="button"
                  onClick={swapSides}
                  className="mt-2 font-mono text-xs text-muted underline decoration-line underline-offset-4 hover:text-gold"
                >
                  Swap sides
                </button>
              </div>
              {sameTeam ? (
                <p className="text-center font-mono text-xs leading-5 text-danger">Pick two different teams.</p>
              ) : null}
              <PixelButton
                type="submit"
                variant="primary"
                size="xl"
                disabled={sameTeam}
                className="w-full leading-snug tracking-[0.1em]"
              >
                Simulate
              </PixelButton>
              <PixelButton
                type="button"
                size="xl"
                disabled={sameTeam || running}
                className="w-full leading-snug tracking-[0.1em]"
                onClick={simulateHundred}
              >
                {running ? "Running…" : "100 Matches"}
              </PixelButton>
              <PixelButton
                type="button"
                variant="ghost"
                size="xl"
                disabled={sameTeam || analysisLoading}
                className="w-full leading-snug tracking-[0.1em]"
                onClick={runAnalysis}
              >
                {analysisLoading ? "Writing…" : "AI Analysis"}
              </PixelButton>
              <p className="text-center font-mono text-[11px] leading-4 text-muted">
                Hover OVR for PAC SHO PAS DRI DEF PHY
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
      </form>

      {analysisError ? <p className="mt-3 text-sm text-danger">{analysisError}</p> : null}

      {analysis ? (
        <section className="mt-3 border-2 border-line bg-panel px-4 py-4 sm:px-5">
          <div className="mb-3 flex items-end justify-between gap-3">
            <h2 className="font-display text-[10px] uppercase tracking-[0.16em] text-gold">
              Pre-match analysis
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {analysisSource === "ai" ? "LLM brief" : "Local brief"}
            </span>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-7 text-text">{analysis}</div>
        </section>
      ) : null}

      {batch ? (
        <div className="mt-3">
          <MonteCarloResults result={batch} />
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

function uniqueOrgs(teams: TeamOption[], kind: TeamKind): TeamOption[] {
  const map = new Map<string, TeamOption>()
  for (const team of teams) {
    if (team.kind === kind && !map.has(team.clubId)) map.set(team.clubId, team)
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

  return (
    <article className={`faceoff-card ${side} ${away ? "faceoff-away" : "faceoff-home"} p-3 sm:p-4`}>
      <button
        type="button"
        onClick={onOpenPicker}
        className={`group flex w-full items-start gap-3 rounded-sm text-left outline-none hover:bg-white/5 ${
          away ? "flex-row-reverse text-right" : ""
        }`}
      >
        <PixelCrest clubId={team.clubId} size={64} />
        <span className="min-w-0 flex-1">
          <span className={`block font-display text-[10px] tracking-[0.22em] ${accent}`}>{label}</span>
          <span className="mt-1 block font-mono text-[1.35rem] font-semibold leading-7 tracking-tight text-text sm:text-[1.65rem] sm:leading-8">
            {team.clubName}
          </span>
          <span className={`mt-1 block font-mono text-lg font-medium sm:text-xl ${accent}`}>
            {team.displaySeason}
          </span>
          <span className="mt-2 block font-mono text-sm text-muted">
            {team.manager}
            <span className="mx-2 text-line-hi">·</span>
            {team.formation}
          </span>
          <span
            className={`mt-3 inline-flex items-center gap-1 px-2 py-1 font-mono text-xs font-medium ${
              away
                ? "bg-danger/15 text-danger group-hover:bg-danger group-hover:text-ink"
                : "bg-gold/15 text-gold group-hover:bg-gold group-hover:text-ink"
            }`}
          >
            Change ▾
          </span>
        </span>
        <OvrStamp value={team.overallRating} size="lg" align={away ? "left" : "right"} />
      </button>

      {seasons.length > 1 ? (
        <div className={`flex flex-wrap gap-1.5 ${away ? "justify-end" : ""}`}>
          {seasons.map((season) => {
            const active = season.id === team.id
            return (
              <button
                key={season.id}
                type="button"
                onClick={() => onSeason(season.id)}
                className={`border px-2.5 py-1.5 font-mono text-sm ${
                  active
                    ? away
                      ? "border-danger bg-danger/15 text-danger"
                      : "border-gold bg-gold/15 text-gold"
                    : "border-line text-muted hover:border-line-hi hover:text-text"
                }`}
              >
                {season.displaySeason}
              </button>
            )
          })}
        </div>
      ) : null}

      <div className="border-t border-white/10 pt-3">
        <FaceOffSquad squad={squad} align={away ? "right" : "left"} />
      </div>
      <input type="hidden" name={name} value={team.id} />
    </article>
  )
}
