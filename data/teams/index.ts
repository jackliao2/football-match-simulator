import { teamSquad, teamStars } from "@/lib/stars"
import type { HistoricalTeam } from "@/types"
import { acMilan200607 } from "@/data/teams/ac-milan"
import { arsenal200304 } from "@/data/teams/arsenal"
import {
  barcelona200809,
  barcelona201011,
  barcelona201415,
} from "@/data/teams/barcelona"
import { bayernMunich201213, bayernMunich201920 } from "@/data/teams/bayern-munich"
import { interMilan200910 } from "@/data/teams/inter-milan"
import { liverpool200405, liverpool201819 } from "@/data/teams/liverpool"
import { manchesterCity202223 } from "@/data/teams/manchester-city"
import {
  manchesterUnited199899,
  manchesterUnited200708,
} from "@/data/teams/manchester-united"
import { argentina1986, argentina2022 } from "@/data/teams/argentina"
import { brazil1970, brazil2002 } from "@/data/teams/brazil"
import { france1998, france2018 } from "@/data/teams/france"
import { germany2014 } from "@/data/teams/germany"
import { italy2006 } from "@/data/teams/italy"
import { netherlands1974 } from "@/data/teams/netherlands"
import { realMadrid201314, realMadrid201617 } from "@/data/teams/real-madrid"
import { spain2010 } from "@/data/teams/spain"

export const teams: HistoricalTeam[] = [
  barcelona200809,
  barcelona201011,
  barcelona201415,
  realMadrid201314,
  realMadrid201617,
  manchesterUnited199899,
  manchesterUnited200708,
  arsenal200304,
  liverpool200405,
  liverpool201819,
  acMilan200607,
  interMilan200910,
  bayernMunich201213,
  bayernMunich201920,
  manchesterCity202223,
  brazil1970,
  brazil2002,
  argentina1986,
  argentina2022,
  france1998,
  france2018,
  spain2010,
  germany2014,
  italy2006,
  netherlands1974,
]

function assertTeamData(catalog: HistoricalTeam[]) {
  const seen = new Set<string>()
  for (const team of catalog) {
    if (seen.has(team.id)) throw new Error(`Duplicate team id: ${team.id}`)
    seen.add(team.id)
    const ids = team.players.map((player) => player.id)
    if (new Set(ids).size !== ids.length) {
      throw new Error(`Duplicate player id in ${team.id}`)
    }
    if (team.startingXI.length !== 11) {
      throw new Error(`${team.id} starting XI must have 11 players`)
    }
    const roster = new Set(ids)
    for (const id of team.startingXI) {
      if (!roster.has(id)) {
        throw new Error(`${team.id} starting XI missing player ${id}`)
      }
    }
  }
}

assertTeamData(teams)

export const teamsById = new Map(teams.map((team) => [team.id, team]))

export function getTeam(id: string): HistoricalTeam | undefined {
  return teamsById.get(id)
}

export function getTeamByClubSeason(clubId: string, season: string): HistoricalTeam | undefined {
  return teams.find((team) => team.clubId === clubId && team.season === season)
}

export function getTeamsByClub(clubId: string): HistoricalTeam[] {
  return teams.filter((team) => team.clubId === clubId)
}

export function allClubIds(): string[] {
  return [...new Set(teams.filter((team) => team.kind !== "nation").map((team) => team.clubId))]
}

export function allNationIds(): string[] {
  return [...new Set(teams.filter((team) => team.kind === "nation").map((team) => team.clubId))]
}

export function clubSeasonTeams() {
  return teams.filter((team) => team.kind !== "nation")
}

export function nationSeasonTeams() {
  return teams.filter((team) => team.kind === "nation")
}

export function toTeamOption(team: HistoricalTeam) {
  return {
    id: team.id,
    clubId: team.clubId,
    clubName: team.clubName,
    clubCode: team.clubCode,
    season: team.season,
    displaySeason: team.displaySeason,
    kind: team.kind,
    overallRating: team.overallRating,
    stars: teamStars(team, 6),
    squad: teamSquad(team),
  }
}
