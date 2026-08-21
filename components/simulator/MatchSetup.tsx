"use client"

import { useMemo, useState } from "react"
import { startMatch } from "@/app/actions"
import { PixelButton } from "@/components/ui/PixelButton"
import { PixelCard } from "@/components/ui/PixelCard"
import { TeamBadge } from "@/components/teams/TeamCard"
import { track } from "@/lib/analytics"
import type { TeamKind } from "@/types"

export interface TeamOption {
  id: string
  clubId: string
  clubName: string
  clubCode: string
  season: string
  displaySeason: string
  kind: TeamKind
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

  const homeSeasons = teams.filter((team) => team.clubId === homeClub)
  const awaySeasons = teams.filter((team) => team.clubId === awayClub)
  const home = teams.find((team) => team.id === homeId) ?? homeSeasons[0]!
  const away = teams.find((team) => team.id === awayId) ?? awaySeasons[0]!
  const sameTeam = home.id === away.id

  function changeClub(side: "home" | "away", clubId: string) {
    const seasons = teams.filter((team) => team.clubId === clubId)
    const next = seasons[0]
    if (!next) return
    track("team_selected", { clubId, side })
    if (side === "home") {
      setHomeClub(clubId)
      setHomeId(next.id)
    } else {
      setAwayClub(clubId)
      setAwayId(next.id)
    }
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
    <PixelCard className="w-full">
      <form
        action={startMatch}
        onSubmit={() => track("simulator_started", { home: home.id, away: away.id })}
        className="grid gap-6 p-4 sm:p-6"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
          <TeamColumn
            label="Home Team"
            clubs={clubs}
            nations={nations}
            seasons={homeSeasons}
            clubId={homeClub}
            teamId={home.id}
            team={home}
            onClub={(value) => changeClub("home", value)}
            onSeason={(value) => changeSeason("home", value)}
            name="home"
          />

          <div className="flex flex-col items-center justify-center gap-3 pt-2">
            <div className="font-display text-xs tracking-[0.4em] text-gold">VS</div>
            <button
              type="button"
              onClick={swapSides}
              className="border-2 border-line px-3 py-2 font-display text-[9px] uppercase tracking-[0.16em] text-muted hover:border-gold hover:text-gold"
            >
              Swap
            </button>
          </div>

          <TeamColumn
            label="Away Team"
            clubs={clubs}
            nations={nations}
            seasons={awaySeasons}
            clubId={awayClub}
            teamId={away.id}
            team={away}
            onClub={(value) => changeClub("away", value)}
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
    </PixelCard>
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
  clubs,
  nations,
  seasons,
  clubId,
  teamId,
  team,
  onClub,
  onSeason,
  name,
}: {
  label: string
  clubs: TeamOption[]
  nations: TeamOption[]
  seasons: TeamOption[]
  clubId: string
  teamId: string
  team: TeamOption
  onClub: (clubId: string) => void
  onSeason: (teamId: string) => void
  name: "home" | "away"
}) {
  return (
    <div className="grid gap-3">
      <div className="font-display text-[10px] uppercase tracking-[0.18em] text-muted">{label}</div>
      <TeamBadge code={team.clubCode} name={team.clubName} season={team.displaySeason} />
      <label className="grid gap-1 text-xs uppercase tracking-[0.12em] text-muted">
        Team
        <select
          value={clubId}
          onChange={(event) => onClub(event.target.value)}
          className="border-2 border-line bg-panel-2 px-3 py-3 text-sm uppercase tracking-wide text-text outline-none focus:border-gold"
        >
          <optgroup label="Clubs">
            {clubs.map((club) => (
              <option key={club.clubId} value={club.clubId}>
                {club.clubName}
              </option>
            ))}
          </optgroup>
          {nations.length > 0 ? (
            <optgroup label="National teams">
              {nations.map((nation) => (
                <option key={nation.clubId} value={nation.clubId}>
                  {nation.clubName}
                </option>
              ))}
            </optgroup>
          ) : null}
        </select>
      </label>
      <label className="grid gap-1 text-xs uppercase tracking-[0.12em] text-muted">
        Season
        <select
          value={teamId}
          onChange={(event) => onSeason(event.target.value)}
          className="border-2 border-line bg-panel-2 px-3 py-3 text-sm uppercase tracking-wide text-text outline-none focus:border-gold"
        >
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>
              {season.displaySeason}
            </option>
          ))}
        </select>
      </label>
      <input type="hidden" name={name} value={team.id} />
    </div>
  )
}
