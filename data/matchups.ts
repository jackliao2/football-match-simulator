import { canonicalVsSlug } from "@/lib/match-id"
import { teams } from "@/data/teams"

export const HOMEPAGE_TEAMS = [
  "barcelona-2008-09",
  "barcelona-2010-11",
  "real-madrid-2016-17",
  "manchester-united-1998-99",
  "chelsea-2004-05",
  "ac-milan-1988-89",
  "ajax-1994-95",
  "juventus-2016-17",
  "borussia-dortmund-2012-13",
]

export const HOMEPAGE_NATIONS = [
  "brazil-1970",
  "argentina-1986",
  "france-1998",
  "spain-2010",
  "england-1966",
  "hungary-1954",
  "portugal-2016",
  "croatia-2018",
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
  ["chelsea-2004-05", "arsenal-2003-04"],
  ["ajax-1994-95", "ac-milan-1988-89"],
  ["borussia-dortmund-2012-13", "bayern-munich-2012-13"],
  ["juventus-2016-17", "real-madrid-2016-17"],
  ["atletico-madrid-2013-14", "real-madrid-2013-14"],
  ["porto-2003-04", "chelsea-2004-05"],
  ["brazil-2002", "argentina-2022"],
  ["brazil-1970", "spain-2010"],
  ["argentina-1986", "france-1998"],
  ["italy-2006", "france-2018"],
  ["netherlands-1974", "germany-2014"],
  ["england-1966", "hungary-1954"],
  ["portugal-2016", "france-2018"],
  ["croatia-2018", "france-2018"],
  ["uruguay-2010", "netherlands-1974"],
  ["belgium-2018", "france-2018"],
  ["spain-2012", "italy-2006"],
] as const

export const DEFAULT_RIVALS: Record<string, string> = {
  "barcelona-2008-09": "real-madrid-2016-17",
  "barcelona-2010-11": "manchester-united-2007-08",
  "barcelona-2014-15": "bayern-munich-2012-13",
  "real-madrid-2013-14": "atletico-madrid-2013-14",
  "real-madrid-2016-17": "juventus-2016-17",
  "manchester-united-1998-99": "arsenal-2003-04",
  "manchester-united-2007-08": "barcelona-2010-11",
  "arsenal-2003-04": "chelsea-2004-05",
  "liverpool-2004-05": "ac-milan-2006-07",
  "liverpool-2018-19": "manchester-city-2022-23",
  "ac-milan-1988-89": "ajax-1994-95",
  "ac-milan-2006-07": "liverpool-2004-05",
  "inter-milan-2009-10": "barcelona-2010-11",
  "bayern-munich-2012-13": "borussia-dortmund-2012-13",
  "bayern-munich-2019-20": "liverpool-2018-19",
  "manchester-city-2022-23": "arsenal-2003-04",
  "chelsea-2004-05": "arsenal-2003-04",
  "chelsea-2011-12": "bayern-munich-2012-13",
  "juventus-2016-17": "real-madrid-2016-17",
  "ajax-1994-95": "ac-milan-1988-89",
  "borussia-dortmund-2012-13": "bayern-munich-2012-13",
  "porto-2003-04": "chelsea-2004-05",
  "atletico-madrid-2013-14": "real-madrid-2013-14",
  "brazil-1970": "hungary-1954",
  "brazil-2002": "argentina-2022",
  "argentina-1986": "france-1998",
  "argentina-2022": "brazil-2002",
  "france-1998": "brazil-2002",
  "france-2018": "croatia-2018",
  "spain-2010": "netherlands-1974",
  "spain-2012": "italy-2006",
  "germany-2014": "argentina-2022",
  "italy-2006": "france-2018",
  "netherlands-1974": "spain-2010",
  "england-1966": "germany-2014",
  "portugal-2016": "france-2018",
  "croatia-2018": "france-2018",
  "uruguay-2010": "netherlands-1974",
  "belgium-2018": "france-2018",
  "hungary-1954": "brazil-1970",
}

export function defaultOpponent(teamId: string): string {
  const rival = DEFAULT_RIVALS[teamId]
  if (rival) return rival
  const other = teams.find((team) => team.id !== teamId)
  return other?.id ?? teamId
}

export function allVsPairs(): Array<[string, string]> {
  const seen = new Set<string>()
  const pairs: Array<[string, string]> = []
  const add = (left: string, right: string) => {
    if (!left || !right || left === right) return
    const [a, b] = left < right ? [left, right] : [right, left]
    const key = `${a}|${b}`
    if (seen.has(key)) return
    seen.add(key)
    pairs.push([a, b])
  }
  for (const [home, away] of FEATURED_MATCHUPS) add(home, away)
  for (const [home, away] of Object.entries(DEFAULT_RIVALS)) add(home, away)
  return pairs
}

export function vsPath(a: string, b: string): string {
  return `/vs/${canonicalVsSlug(a, b)}`
}
