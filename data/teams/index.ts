import { teamSquad, teamStars } from "@/lib/stars"
import { trophiesFor } from "@/data/trophies"
import type { HistoricalTeam } from "@/types"
import { acMilan198889, acMilan200607 } from "@/data/teams/ac-milan"
import { ajax199495, ajax201819 } from "@/data/teams/ajax"
import { arsenal199798, arsenal200304 } from "@/data/teams/arsenal"
import { atleticoMadrid201314, atleticoMadrid202021 } from "@/data/teams/atletico-madrid"
import {
  barcelona200809,
  barcelona201011,
  barcelona201415,
} from "@/data/teams/barcelona"
import { bayernMunich201213, bayernMunich201920 } from "@/data/teams/bayern-munich"
import { borussiaDortmund201011, borussiaDortmund201213 } from "@/data/teams/borussia-dortmund"
import { chelsea200405, chelsea201112 } from "@/data/teams/chelsea"
import { interMilan198889, interMilan200910 } from "@/data/teams/inter-milan"
import { juventus200203, juventus201617 } from "@/data/teams/juventus"
import { liverpool200405, liverpool201819 } from "@/data/teams/liverpool"
import { manchesterCity201718, manchesterCity202223 } from "@/data/teams/manchester-city"
import {
  manchesterUnited199899,
  manchesterUnited200708,
} from "@/data/teams/manchester-united"
import { napoli198687, napoli202223 } from "@/data/teams/napoli"
import { parisSaintGermain201718, parisSaintGermain202223 } from "@/data/teams/paris-saint-germain"
import { porto200304, porto201011 } from "@/data/teams/porto"
import { realMadrid201314, realMadrid201617 } from "@/data/teams/real-madrid"
import { tottenham201617, tottenham201819 } from "@/data/teams/tottenham"
import {
  acMilan202526,
  ajax202526,
  arsenal202526,
  atleticoMadrid202526,
  barcelona202526,
  bayernMunich202526,
  borussiaDortmund202526,
  chelsea202526,
  interMilan202526,
  juventus202526,
  liverpool202526,
  manchesterCity202526,
  manchesterUnited202526,
  napoli202526,
  parisSaintGermain202526,
  porto202526,
  realMadrid202526,
  tottenham202526,
} from "@/data/teams/current-clubs"
import {
  argentina2026,
  belgium2026,
  brazil2026,
  colombia2026,
  croatia2026,
  denmark2026,
  england2026,
  france2026,
  germany2026,
  hungary2026,
  italy2026,
  netherlands2026,
  portugal2026,
  spain2026,
  uruguay2026,
} from "@/data/teams/current-nations"
import { argentina1986, argentina2022 } from "@/data/teams/argentina"
import { belgium1986, belgium2018 } from "@/data/teams/belgium"
import {
  brazil1958,
  brazil1962,
  brazil1970,
  brazil1982,
  brazil1994,
  brazil1998,
  brazil2002,
  brazil2014,
} from "@/data/teams/brazil"
import { colombia1994, colombia2014 } from "@/data/teams/colombia"
import { croatia1998, croatia2018 } from "@/data/teams/croatia"
import { denmark1992, denmark1998 } from "@/data/teams/denmark"
import { england1966, england1990, england1996, england2004, england2018, england2021 } from "@/data/teams/england"
import { france1984, france1998, france2018 } from "@/data/teams/france"
import { germany1990, germany2006, germany2014 } from "@/data/teams/germany"
import { hungary1954, hungary1966 } from "@/data/teams/hungary"
import { italy1994, italy2006, italy2021 } from "@/data/teams/italy"
import { netherlands1974, netherlands1988, netherlands2010 } from "@/data/teams/netherlands"
import { portugal2004, portugal2016 } from "@/data/teams/portugal"
import { spain2010, spain2012 } from "@/data/teams/spain"
import { uruguay1950, uruguay2010 } from "@/data/teams/uruguay"

const RAW: HistoricalTeam[] = [
  barcelona200809,
  barcelona201011,
  barcelona201415,
  realMadrid201314,
  realMadrid201617,
  manchesterUnited199899,
  manchesterUnited200708,
  arsenal199798,
  arsenal200304,
  liverpool200405,
  liverpool201819,
  acMilan198889,
  acMilan200607,
  interMilan198889,
  interMilan200910,
  bayernMunich201213,
  bayernMunich201920,
  manchesterCity201718,
  manchesterCity202223,
  chelsea200405,
  chelsea201112,
  juventus200203,
  juventus201617,
  ajax199495,
  ajax201819,
  borussiaDortmund201011,
  borussiaDortmund201213,
  porto200304,
  porto201011,
  atleticoMadrid201314,
  atleticoMadrid202021,
  tottenham201617,
  tottenham201819,
  parisSaintGermain201718,
  parisSaintGermain202223,
  napoli198687,
  napoli202223,
  barcelona202526,
  realMadrid202526,
  manchesterUnited202526,
  arsenal202526,
  liverpool202526,
  acMilan202526,
  interMilan202526,
  bayernMunich202526,
  manchesterCity202526,
  chelsea202526,
  juventus202526,
  ajax202526,
  borussiaDortmund202526,
  porto202526,
  atleticoMadrid202526,
  tottenham202526,
  parisSaintGermain202526,
  napoli202526,
  brazil1958,
  brazil1962,
  brazil1970,
  brazil1982,
  brazil1994,
  brazil1998,
  brazil2002,
  brazil2014,
  argentina1986,
  argentina2022,
  france1984,
  france1998,
  france2018,
  spain2010,
  spain2012,
  germany1990,
  germany2006,
  germany2014,
  italy1994,
  italy2006,
  italy2021,
  netherlands1974,
  netherlands1988,
  netherlands2010,
  england1966,
  england1990,
  england1996,
  england2004,
  england2018,
  england2021,
  portugal2004,
  portugal2016,
  croatia1998,
  croatia2018,
  uruguay1950,
  uruguay2010,
  belgium1986,
  belgium2018,
  hungary1954,
  hungary1966,
  colombia1994,
  colombia2014,
  denmark1992,
  denmark1998,
  brazil2026,
  argentina2026,
  france2026,
  spain2026,
  germany2026,
  italy2026,
  netherlands2026,
  england2026,
  portugal2026,
  croatia2026,
  uruguay2026,
  belgium2026,
  hungary2026,
  colombia2026,
  denmark2026,
]

export const teams: HistoricalTeam[] = RAW.map((team) => ({
  ...team,
  trophies: trophiesFor(team.id),
}))

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
        throw new Error(`${team.id} starting XI missing player ${id} (roster: ${ids.join(", ")})`)
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
  return teams
    .filter((team) => team.clubId === clubId)
    .sort((a, b) => b.eraYear - a.eraYear)
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
    manager: team.manager,
    formation: team.formation,
    styleTags: team.styleTags,
    stars: teamStars(team, 6),
    squad: teamSquad(team),
    team,
  }
}
