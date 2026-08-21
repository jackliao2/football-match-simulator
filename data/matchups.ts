import { canonicalVsSlug } from "@/lib/match-id"
import { teams } from "@/data/teams"

export const HOMEPAGE_TEAMS = [
  "barcelona-2008-09",
  "barcelona-2010-11",
  "barcelona-2014-15",
  "real-madrid-2016-17",
  "manchester-united-1998-99",
  "manchester-united-2007-08",
  "arsenal-2003-04",
  "liverpool-2004-05",
  "ac-milan-2006-07",
]

export const FEATURED_MATCHUPS = [
  ["barcelona-2008-09", "real-madrid-2016-17"],
  ["manchester-united-2007-08", "barcelona-2010-11"],
  ["arsenal-2003-04", "manchester-city-2022-23"],
  ["manchester-united-1998-99", "arsenal-2003-04"],
  ["ac-milan-2006-07", "liverpool-2004-05"],
  ["barcelona-2014-15", "bayern-munich-2012-13"],
  ["real-madrid-2016-17", "manchester-united-2007-08"],
  ["inter-milan-2009-10", "barcelona-2010-11"],
] as const

export const DEFAULT_RIVALS: Record<string, string> = {
  "barcelona-2008-09": "real-madrid-2016-17",
  "barcelona-2010-11": "manchester-united-2007-08",
  "barcelona-2014-15": "bayern-munich-2012-13",
  "real-madrid-2013-14": "barcelona-2010-11",
  "real-madrid-2016-17": "barcelona-2008-09",
  "manchester-united-1998-99": "arsenal-2003-04",
  "manchester-united-2007-08": "barcelona-2010-11",
  "arsenal-2003-04": "manchester-city-2022-23",
  "liverpool-2004-05": "ac-milan-2006-07",
  "liverpool-2018-19": "manchester-city-2022-23",
  "ac-milan-2006-07": "liverpool-2004-05",
  "inter-milan-2009-10": "barcelona-2010-11",
  "bayern-munich-2012-13": "barcelona-2014-15",
  "bayern-munich-2019-20": "liverpool-2018-19",
  "manchester-city-2022-23": "arsenal-2003-04",
}

export function defaultOpponent(teamId: string): string {
  const rival = DEFAULT_RIVALS[teamId]
  if (rival) return rival
  const other = teams.find((team) => team.id !== teamId)
  return other?.id ?? teamId
}

export function allVsPairs(): Array<[string, string]> {
  const ids = teams.map((team) => team.id)
  const pairs: Array<[string, string]> = []
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const [a, b] = ids[i]! < ids[j]! ? [ids[i]!, ids[j]!] : [ids[j]!, ids[i]!]
      pairs.push([a, b])
    }
  }
  return pairs
}

export function vsPath(a: string, b: string): string {
  return `/vs/${canonicalVsSlug(a, b)}`
}
