"use client"

import { useMemo, useState } from "react"
import { startMatch } from "@/app/actions"
import { ClubPicker } from "@/components/simulator/ClubPicker"
import { CompactSquad } from "@/components/teams/SquadPanel"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { PixelButton } from "@/components/ui/PixelButton"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { track } from "@/lib/analytics"
import type { SquadMember, StarPlayer } from "@/lib/stars"
import type { TeamKind } from "@/types"

export interface TeamOption {
  id: string
  clubId: string
  clubName: string
  clubCode: string
  season: string
  displaySeason: string
  kind: TeamKind
  overallRating: number
  stars: StarPlayer[]
  squad: SquadMember[]
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

  const homeSeasons = teams.filter((team) => team.clubId === homeClub)
  const awaySeasons = teams.filter((team) => team.clubId === awayClub)
  const home = teams.find((team) => team.id === homeId) ?? homeSeasons[0]!
  const away = teams.find((team) => team.id === awayId) ?? awaySeasons[0]!
  const sameTeam = home.id === away.id

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
  }

  function changeSeason(side: "home" | "away", teamId: string) {
    track("season_selected", { teamId, side })
    if (side === "home") setHomeId(teamId)
    else setAwayId(teamId)
  }

  function swapSides() {
    const nextHomeClub = awayClub
    const nextHomeId = awayId
    setAwayClub(homeClub)
    setAwayId(homeId)
    setHomeClub(nextHomeClub)
    setHomeId(nextHomeId)
  }

  return (
    <div className="w-full border-2 border-line bg-panel pixel-border">
      <form
        action={startMatch}
        onSubmit={() => track("simulator_started", { home: home.id, away: away.id })}
        className="grid gap-4 p-3 sm:p-4"
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <TeamColumn
            label="Home"
            seasons={homeSeasons}
            team={home}
            onOpenPicker={() => setPicker("home")}
            onSeason={(value) => changeSeason("home", value)}
            name="home"
          />

          <div className="flex flex-row items-center justify-center gap-3 lg:flex-col">
            <div className="font-display text-[10px] tracking-[0.4em] text-gold">VS</div>
            <button
              type="button"
              onClick={swapSides}
              className="border border-line px-2 py-1 font-display text-[8px] uppercase tracking-[0.16em] text-muted hover:border-gold hover:text-gold"
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

        <PixelButton type="submit" variant="primary" size="lg" disabled={sameTeam} className="w-full">
          Simulate Match
        </PixelButton>
      </form>

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
    <div className="flex flex-col gap-3 border-2 border-line bg-ink/30 p-3">
      <div className="font-display text-[8px] uppercase tracking-[0.2em] text-muted">{label}</div>
      <button
        type="button"
        onClick={onOpenPicker}
        className="flex items-center gap-3 text-left hover:border-gold"
      >
        <PixelCrest clubId={team.clubId} size={56} />
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[10px] uppercase leading-tight tracking-wide text-text">
            {team.clubName}
          </span>
          <span className="mt-1 block font-mono text-[10px] text-muted">Change team ▾</span>
        </span>
        <OvrStamp value={team.overallRating} size="lg" />
      </button>

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
      ) : (
        <p className="font-mono text-xs text-muted">{team.displaySeason}</p>
      )}

      <CompactSquad squad={team.squad} />
      <input type="hidden" name={name} value={team.id} />
    </div>
  )
}
