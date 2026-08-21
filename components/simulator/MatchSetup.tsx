"use client"

import { useMemo, useState } from "react"
import { startMatch } from "@/app/actions"
import { PixelButton } from "@/components/ui/PixelButton"
import { PixelCard } from "@/components/ui/PixelCard"
import { TeamBadge } from "@/components/teams/TeamCard"
import { track } from "@/lib/analytics"

export interface TeamOption {
  id: string
  clubId: string
  clubName: string
  clubCode: string
  season: string
  displaySeason: string
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
  const clubs = useMemo(() => {
    const map = new Map<string, TeamOption>()
    for (const team of teams) {
      if (!map.has(team.clubId)) map.set(team.clubId, team)
    }
    return [...map.values()]
  }, [teams])

  const homeDefault = teams.find((team) => team.id === defaultHome) ?? teams[0]!
  const awayDefault =
    teams.find((team) => team.id === defaultAway) ??
    teams.find((team) => team.clubId !== homeDefault.clubId) ??
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

  return (
    <PixelCard className="w-full">
      <form
        action={startMatch}
        onSubmit={() => track("simulator_started", { home: home.id, away: away.id })}
        className="grid gap-6 p-4 sm:p-6"
      >
        <TeamColumn
          label="Home Team"
          clubs={clubs}
          seasons={homeSeasons}
          clubId={homeClub}
          teamId={home.id}
          team={home}
          onClub={(value) => changeClub("home", value)}
          onSeason={(value) => changeSeason("home", value)}
          name="home"
        />

        <div className="text-center font-display text-xs tracking-[0.4em] text-gold">VS</div>

        <TeamColumn
          label="Away Team"
          clubs={clubs}
          seasons={awaySeasons}
          clubId={awayClub}
          teamId={away.id}
          team={away}
          onClub={(value) => changeClub("away", value)}
          onSeason={(value) => changeSeason("away", value)}
          name="away"
        />

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

function TeamColumn({
  label,
  clubs,
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
        Club
        <select
          value={clubId}
          onChange={(event) => onClub(event.target.value)}
          className="border-2 border-line bg-panel-2 px-3 py-3 text-sm uppercase tracking-wide text-text outline-none focus:border-gold"
        >
          {clubs.map((club) => (
            <option key={club.clubId} value={club.clubId}>
              {club.clubName}
            </option>
          ))}
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
