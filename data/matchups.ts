import { canonicalVsPair, canonicalVsSlug } from "@/lib/match-id"
import { isCurrentSquad } from "@/lib/seo"
import { teams } from "@/data/teams"
import type { HistoricalTeam } from "@/types"

export const HOMEPAGE_TEAMS = [
  "barcelona-2008-09",
  "real-madrid-2016-17",
  "manchester-united-1998-99",
  "arsenal-2003-04",
  "liverpool-2004-05",
  "ac-milan-1988-89",
  "bayern-munich-2012-13",
  "ajax-1994-95",
  "chelsea-2004-05",
  "everton-1984-85",
]

export const HOMEPAGE_MATCHUPS = [
  ["barcelona-2010-11", "real-madrid-2016-17"],
  ["manchester-united-1998-99", "barcelona-2010-11"],
  ["ac-milan-1988-89", "real-madrid-2016-17"],
  ["brazil-1970", "argentina-1986"],
  ["brazil-1970", "spain-2010"],
  ["argentina-1986", "argentina-2022"],
  ["england-1966", "germany-1990"],
  ["arsenal-2003-04", "manchester-city-2022-23"],
  ["bayern-munich-2012-13", "real-madrid-2016-17"],
  ["brazil-2002", "france-2018"],
  ["croatia-2018", "france-2018"],
  ["senegal-2002", "france-1998"],
  ["everton-1984-85", "liverpool-2004-05"],
  ["chelsea-2011-12", "bayern-munich-2012-13"],
] as const

export const HOMEPAGE_CURRENT_CLUBS = [
  "barcelona-2025-26",
  "real-madrid-2025-26",
  "arsenal-2025-26",
  "liverpool-2025-26",
  "manchester-city-2025-26",
  "paris-saint-germain-2025-26",
]

export const HOMEPAGE_NATIONS = [
  "brazil-1970",
  "argentina-1986",
  "spain-2010",
  "france-1998",
  "italy-2006",
  "germany-2014",
  "england-1966",
  "netherlands-1974",
  "brazil-2002",
  "croatia-2018",
  "senegal-2002",
]

export const HOMEPAGE_CURRENT_NATIONS = [
  "brazil-2026",
  "argentina-2026",
  "france-2026",
  "spain-2026",
  "england-2026",
  "germany-2026",
]

export const FEATURED_MATCHUPS = [
  ["barcelona-2008-09", "real-madrid-2016-17"],
  ["barcelona-2010-11", "ac-milan-1988-89"],
  ["barcelona-2010-11", "real-madrid-2016-17"],
  ["barcelona-2010-11", "ajax-1994-95"],
  ["ac-milan-1988-89", "real-madrid-2016-17"],
  ["manchester-united-1998-99", "barcelona-2010-11"],
  ["arsenal-2003-04", "manchester-city-2022-23"],
  ["manchester-united-2007-08", "arsenal-2003-04"],
  ["liverpool-2018-19", "ac-milan-1988-89"],
  ["bayern-munich-2012-13", "real-madrid-2016-17"],
  ["inter-milan-2009-10", "barcelona-2010-11"],
  ["chelsea-2004-05", "arsenal-2003-04"],
  ["santos-1962", "barcelona-2010-11"],
  ["brazil-1970", "argentina-1986"],
  ["brazil-1970", "spain-2010"],
  ["brazil-2002", "france-2018"],
  ["argentina-1986", "argentina-2022"],
  ["france-1998", "france-2018"],
  ["spain-2010", "germany-2014"],
  ["netherlands-1974", "brazil-1982"],
  ["hungary-1954", "brazil-1970"],
  ["italy-2006", "brazil-2002"],
  ["brazil-1958", "brazil-1970"],
  ["france-1984", "netherlands-1988"],
  ["italy-2006", "france-2018"],
  ["england-1966", "germany-1990"],
  ["senegal-2002", "france-1998"],
  ["croatia-2018", "france-2018"],
  ["everton-1984-85", "liverpool-2004-05"],
  ["chelsea-2011-12", "bayern-munich-2012-13"],
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
  "brazil-1958": "england-1966",
  "brazil-1962": "hungary-1954",
  "brazil-1970": "hungary-1954",
  "brazil-1994": "italy-1994",
  "brazil-1998": "france-1998",
  "brazil-2002": "argentina-2022",
  "brazil-2014": "germany-2014",
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
  "england-1990": "germany-1990",
  "england-1996": "germany-1990",
  "england-2004": "portugal-2004",
  "england-2018": "croatia-2018",
  "england-2021": "italy-2021",
  "germany-1990": "england-1990",
  "germany-2006": "italy-2006",
  "italy-1994": "brazil-1982",
  "italy-2021": "england-2021",
  "netherlands-1988": "france-1984",
  "netherlands-2010": "spain-2010",
  "portugal-2004": "england-2004",
  "croatia-1998": "france-1998",
  "uruguay-1950": "brazil-1970",
  "belgium-1986": "argentina-1986",
  "hungary-1966": "brazil-1970",
  "brazil-1982": "italy-1994",
  "france-1984": "netherlands-1988",
  "arsenal-1997-98": "manchester-united-1998-99",
  "inter-milan-1988-89": "ac-milan-1988-89",
  "manchester-city-2017-18": "liverpool-2018-19",
  "juventus-2002-03": "ac-milan-2006-07",
  "ajax-2018-19": "tottenham-2018-19",
  "borussia-dortmund-2010-11": "bayern-munich-2012-13",
  "porto-2010-11": "chelsea-2004-05",
  "atletico-madrid-2020-21": "real-madrid-2016-17",
  "tottenham-2016-17": "arsenal-2003-04",
  "tottenham-2018-19": "liverpool-2018-19",
  "paris-saint-germain-2017-18": "barcelona-2014-15",
  "paris-saint-germain-2022-23": "barcelona-2010-11",
  "napoli-1986-87": "ac-milan-1988-89",
  "napoli-2022-23": "inter-milan-2009-10",
  "colombia-1994": "argentina-1986",
  "colombia-2014": "brazil-2002",
  "denmark-1992": "germany-1990",
  "denmark-1998": "france-1998",
  "barcelona-2025-26": "real-madrid-2025-26",
  "real-madrid-2025-26": "barcelona-2025-26",
  "manchester-united-2025-26": "liverpool-2025-26",
  "arsenal-2025-26": "manchester-city-2025-26",
  "liverpool-2025-26": "manchester-city-2025-26",
  "ac-milan-2025-26": "inter-milan-2025-26",
  "inter-milan-2025-26": "ac-milan-2025-26",
  "bayern-munich-2025-26": "borussia-dortmund-2025-26",
  "manchester-city-2025-26": "arsenal-2025-26",
  "chelsea-2025-26": "arsenal-2025-26",
  "juventus-2025-26": "ac-milan-2025-26",
  "ajax-2025-26": "ajax-1994-95",
  "borussia-dortmund-2025-26": "bayern-munich-2025-26",
  "porto-2025-26": "chelsea-2025-26",
  "atletico-madrid-2025-26": "real-madrid-2025-26",
  "tottenham-2025-26": "arsenal-2025-26",
  "paris-saint-germain-2025-26": "barcelona-2025-26",
  "napoli-2025-26": "inter-milan-2025-26",
  "brazil-2026": "argentina-2026",
  "argentina-2026": "france-2026",
  "france-2026": "spain-2026",
  "spain-2026": "england-2026",
  "germany-2026": "france-2026",
  "italy-2026": "france-2026",
  "netherlands-2026": "england-2026",
  "england-2026": "brazil-2026",
  "portugal-2026": "france-2026",
  "croatia-2026": "france-2026",
  "uruguay-2026": "brazil-2026",
  "belgium-2026": "france-2026",
  "hungary-2026": "germany-2026",
  "colombia-2026": "brazil-2026",
  "denmark-2026": "england-2026",
  "everton-1984-85": "liverpool-2004-05",
  "leeds-united-1973-74": "nottingham-forest-1979-80",
  "nottingham-forest-1979-80": "liverpool-2004-05",
  "newcastle-1995-96": "manchester-united-1998-99",
  "aston-villa-1981-82": "nottingham-forest-1979-80",
  "sevilla-2005-06": "barcelona-2008-09",
  "valencia-2003-04": "real-madrid-2013-14",
  "athletic-bilbao-1983-84": "real-madrid-2016-17",
  "as-roma-2000-01": "juventus-2002-03",
  "lazio-1999-00": "as-roma-2000-01",
  "bayer-leverkusen-2023-24": "bayern-munich-2012-13",
  "borussia-monchengladbach-1974-75": "bayern-munich-2012-13",
  "marseille-1992-93": "ac-milan-1988-89",
  "lyon-2005-06": "paris-saint-germain-2017-18",
  "monaco-2016-17": "paris-saint-germain-2017-18",
  "benfica-1961-62": "real-madrid-2016-17",
  "sporting-2001-02": "porto-2003-04",
  "psv-1987-88": "ajax-1994-95",
  "feyenoord-1969-70": "ajax-1994-95",
  "celtic-1966-67": "manchester-united-1998-99",
  "rangers-1992-93": "celtic-1966-67",
  "red-star-1990-91": "ac-milan-1988-89",
  "steaua-1985-86": "barcelona-2008-09",
  "galatasaray-1999-00": "real-madrid-2016-17",
  "santos-1962": "brazil-1970",
  "flamengo-1981": "santos-1962",
  "boca-juniors-2000": "river-plate-2018",
  "river-plate-2018": "boca-juniors-2000",
  "mexico-1986": "argentina-1986",
  "sweden-1994": "brazil-1994",
  "greece-2004": "portugal-2004",
  "turkey-2002": "brazil-2002",
  "chile-2015": "argentina-1986",
  "wales-2016": "portugal-2016",
  "morocco-2022": "france-2018",
  "senegal-2002": "france-1998",
  "nigeria-1994": "brazil-1994",
  "cameroon-1990": "england-1990",
  "japan-2002": "brazil-2002",
  "south-korea-2002": "germany-2006",
  "usa-2002": "germany-2006",
  "czechia-1996": "france-1984",
}

export function todaysDebate(date = new Date()): [string, string] {
  const day = Math.floor(date.getTime() / 86_400_000)
  const pair = FEATURED_MATCHUPS[((day % FEATURED_MATCHUPS.length) + FEATURED_MATCHUPS.length) % FEATURED_MATCHUPS.length]
  return [pair![0], pair![1]]
}

export function defaultOpponent(teamId: string): string {
  const rival = DEFAULT_RIVALS[teamId]
  if (rival) return rival
  const other = teams.find((team) => team.id !== teamId)
  return other?.id ?? teamId
}

function peakOf(clubId: string) {
  const sides = teams.filter((team) => team.clubId === clubId)
  if (sides.length === 0) return undefined
  const historic = sides.filter((team) => !isCurrentSquad(team))
  const pool = historic.length > 0 ? historic : sides
  return [...pool].sort((a, b) => b.overallRating - a.overallRating || b.eraYear - a.eraYear)[0]
}

function collectVsPairs(source: Iterable<readonly [string, string]>): Array<[string, string]> {
  const known = new Set(teams.map((team) => team.id))
  const seen = new Set<string>()
  const pairs: Array<[string, string]> = []
  for (const [left, right] of source) {
    if (!left || !right || left === right) continue
    if (!known.has(left) || !known.has(right)) continue
    const [a, b] = canonicalVsPair(left, right)
    const key = `${a}|${b}`
    if (seen.has(key)) continue
    seen.add(key)
    pairs.push([a, b])
  }
  return pairs
}

let publishedPairs: Array<[string, string]> | undefined

export function allVsPairs(): Array<[string, string]> {
  publishedPairs ??= collectVsPairs(FEATURED_MATCHUPS)
  return publishedPairs
}

export function vsPath(a: string, b: string): string {
  return `/vs/${canonicalVsSlug(a, b)}`
}

export function isFeaturedMatchup(a: string, b: string): boolean {
  const wanted = canonicalVsSlug(a, b)
  return FEATURED_MATCHUPS.some(([left, right]) => canonicalVsSlug(left, right) === wanted)
}

export function isPublishedMatchup(a: string, b: string): boolean {
  const wanted = canonicalVsSlug(a, b)
  return allVsPairs().some(([left, right]) => canonicalVsSlug(left, right) === wanted)
}

export function vsSimulationRuns(a: string, b: string) {
  return isFeaturedMatchup(a, b) ? 400 : 100
}

export function pickRandomDreamPair(
  ids: string[],
  avoid: { homeId?: string; awayId?: string } = {},
  random = Math.random,
): [string, string] {
  const featured = FEATURED_MATCHUPS.filter(
    ([home, away]) => home !== avoid.homeId || away !== avoid.awayId,
  )
  if (featured.length > 0 && random() < 0.42) {
    const pair = featured[Math.floor(random() * featured.length)]!
    return random() < 0.5 ? [pair[0], pair[1]] : [pair[1], pair[0]]
  }
  const pool = ids.filter((id) => id !== avoid.homeId)
  const homeId = pool[Math.floor(random() * pool.length)] ?? ids[0] ?? ""
  const awayPool = ids.filter((id) => id !== homeId && id !== avoid.awayId)
  const awayId = awayPool[Math.floor(random() * awayPool.length)] ?? ids.find((id) => id !== homeId) ?? homeId
  return [homeId, awayId]
}

export function peakTeamOf(clubId: string): HistoricalTeam | undefined {
  return peakOf(clubId)
}

export function playablePairForOrg(clubId: string): [HistoricalTeam, HistoricalTeam] | undefined {
  const sides = teams.filter((team) => team.clubId === clubId)
  const historic = sides
    .filter((team) => !isCurrentSquad(team))
    .sort((a, b) => b.overallRating - a.overallRating || b.eraYear - a.eraYear)
  if (historic[0] && historic[1]) return [historic[0], historic[1]]
  const peak = historic[0] ?? sides[0]
  if (!peak) return undefined
  const rival = teams.find((team) => team.id === defaultOpponent(peak.id))
  if (rival && rival.id !== peak.id) return [peak, rival]
  return undefined
}
