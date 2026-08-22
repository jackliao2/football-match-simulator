"use client"

import { useMemo, useState } from "react"
import { startMatch } from "@/app/actions"
import { ClubPicker } from "@/components/simulator/ClubPicker"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { CompactSquad } from "@/components/teams/SquadPanel"
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
    <div className="w-full border-2 border-line bg-panel pixel-border">
      <form
        action={startMatch}
        onSubmit={() => track("simulator_started", { home: home.id, away: away.id })}
        className="grid gap-3 p-3 sm:gap-4 sm:p-4"
      >
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <TeamColumn
            label="Home"
            seasons={homeSeasons}
            team={home}
            onOpenPicker={() => setPicker("home")}
            onSeason={(value) => changeSeason("home", value)}
            name="home"
          />

          <div className="flex flex-row items-center justify-center gap-3 lg:flex-col lg:px-1">
            <div className="font-display text-[11px] tracking-[0.4em] text-gold">VS</div>
            <button
              type="button"
              onClick={swapSides}
              className="border-2 border-line px-3 py-2 font-display text-[9px] uppercase tracking-[0.16em] text-muted hover:border-gold hover:text-gold"
            >
              Swap
            </button>
          </div>

          <TeamColumn
            label="Away"
            seasons={awaySeasons}
            team={away}
            onOpenPicker={() => setPicker("away")}
            onSeason={(value) => changeSeason("away", value)}
            name="away"
          />
        </div>

        {sameTeam ? (
          <p className="text-center text-sm text-danger">Pick two different historical teams.</p>
        ) : null}

        <div className="grid gap-2 sm:grid-cols-[1.4fr_1fr_1fr]">
          <PixelButton type="submit" variant="primary" size="lg" disabled={sameTeam} className="w-full">
            Simulate Match
          </PixelButton>
          <PixelButton
            type="button"
            disabled={sameTeam || running}
            className="w-full"
            onClick={simulateHundred}
          >
            {running ? "Running…" : "Simulate 100"}
          </PixelButton>
          <PixelButton
            type="button"
            variant="ghost"
            disabled={sameTeam || analysisLoading}
            className="w-full"
            onClick={runAnalysis}
          >
            {analysisLoading ? "Writing…" : "AI Analysis"}
          </PixelButton>
        </div>
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          Hover any OVR for PAC SHO PAS DRI DEF PHY
        </p>
      </form>

      {analysisError ? <p className="px-4 pb-3 text-sm text-danger">{analysisError}</p> : null}

      {analysis ? (
        <section className="border-t-2 border-line bg-ink/40 px-4 py-4 sm:px-5">
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
        <div className="border-t-2 border-line p-3 sm:p-4">
          <MonteCarloResults result={batch} />
        </div>
      ) : null}

      <div className="grid gap-4 border-t-2 border-line p-3 sm:p-4 lg:grid-cols-2">
        <CompactSquad squad={homeSquad} />
        <CompactSquad squad={awaySquad} />
      </div>

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
  seasons,
  team,
  onOpenPicker,
  onSeason,
  name,
}: {
  label: string
  seasons: TeamOption[]
  team: TeamOption
  onOpenPicker: () => void
  onSeason: (teamId: string) => void
  name: "home" | "away"
}) {
  return (
    <div className="flex flex-col gap-2 border-2 border-line bg-ink/30 p-3">
      <div className="font-display text-[8px] uppercase tracking-[0.2em] text-muted">{label}</div>
      <button
        type="button"
        onClick={onOpenPicker}
        className="flex items-center gap-3 text-left"
      >
        <PixelCrest clubId={team.clubId} size={52} />
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[10px] uppercase leading-tight tracking-wide text-text">
            {team.clubName}
          </span>
          <span className="mt-1 block font-mono text-[11px] text-muted">{team.displaySeason}</span>
        </span>
        <OvrStamp value={team.overallRating} size="lg" />
      </button>

      <button
        type="button"
        onClick={onOpenPicker}
        className="w-full border-2 border-gold bg-ink py-2.5 font-display text-[10px] uppercase tracking-[0.22em] text-gold shadow-[3px_3px_0_0_#000] hover:bg-gold hover:text-ink"
      >
        Change team
      </button>

      <p className="font-mono text-[11px] leading-5 text-muted">
        <span className="text-gold">Coach</span> {team.manager}
        <span className="mx-2 text-line-hi">·</span>
        {team.formation}
      </p>

      {team.styleTags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {team.styleTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {seasons.length > 1 ? (
        <div className="flex flex-wrap gap-1">
          {seasons.map((season) => {
            const active = season.id === team.id
            return (
              <button
                key={season.id}
                type="button"
                onClick={() => onSeason(season.id)}
                className={`border px-2 py-1 font-mono text-[11px] ${
                  active
                    ? "border-gold bg-panel-2 text-gold"
                    : "border-line text-muted hover:border-line-hi hover:text-text"
                }`}
              >
                {season.displaySeason}
              </button>
            )
          })}
        </div>
      ) : null}

      <input type="hidden" name={name} value={team.id} />
    </div>
  )
}
