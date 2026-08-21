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
import { realMadrid201314, realMadrid201617 } from "@/data/teams/real-madrid"

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
  return [...new Set(teams.map((team) => team.clubId))]
}
