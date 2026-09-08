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
