import type { Trophy, TrophyCode } from "@/types"

function t(code: TrophyCode, label: string): Trophy {
  return { code, label }
}

const ucl = () => t("ucl", "UCL")
const el = () => t("el", "Europa")
const league = () => t("league", "League")
const cup = () => t("cup", "Cup")
const wc = () => t("world-cup", "World Cup")
const euros = () => t("euros", "Euros")
const copa = () => t("copa", "Copa")

/** Trophies lifted in that season or tournament — not career totals. */
export const TROPHIES: Record<string, Trophy[]> = {
  "barcelona-2008-09": [ucl(), league(), cup()],
  "barcelona-2010-11": [ucl(), league()],
  "barcelona-2014-15": [ucl(), league(), cup()],
  "real-madrid-2013-14": [ucl(), cup()],
  "real-madrid-2016-17": [ucl(), league()],
  "manchester-united-1998-99": [ucl(), league(), cup()],
  "manchester-united-2007-08": [ucl(), league()],
  "arsenal-1997-98": [league(), cup()],
  "arsenal-2003-04": [league()],
  "liverpool-2004-05": [ucl()],
  "liverpool-2018-19": [ucl()],
  "ac-milan-1988-89": [ucl()],
  "ac-milan-2006-07": [ucl()],
  "inter-milan-1988-89": [league()],
  "inter-milan-2009-10": [ucl(), league(), cup()],
  "bayern-munich-2012-13": [ucl(), league(), cup()],
  "bayern-munich-2019-20": [ucl(), league(), cup()],
  "manchester-city-2017-18": [league(), cup()],
  "manchester-city-2022-23": [ucl(), league(), cup()],
  "chelsea-2004-05": [league(), cup()],
  "chelsea-2011-12": [ucl(), cup()],
  "juventus-2002-03": [league()],
  "juventus-2016-17": [league(), cup()],
  "ajax-1994-95": [ucl(), league()],
  "ajax-2018-19": [league(), cup()],
  "borussia-dortmund-2010-11": [league()],
  "borussia-dortmund-2012-13": [],
  "porto-2003-04": [ucl(), league()],
  "porto-2010-11": [el(), league(), cup()],
  "atletico-madrid-2013-14": [league()],
  "atletico-madrid-2020-21": [league()],
  "tottenham-2016-17": [],
  "tottenham-2018-19": [],
  "paris-saint-germain-2017-18": [league(), cup()],
  "paris-saint-germain-2022-23": [league()],
  "napoli-1986-87": [league(), cup()],
  "napoli-2022-23": [league()],

  "brazil-1970": [wc()],
  "brazil-1982": [],
  "brazil-2002": [wc()],
  "argentina-1986": [wc()],
  "argentina-2022": [wc()],
  "france-1984": [euros()],
  "france-1998": [wc()],
  "france-2018": [wc()],
  "spain-2010": [wc()],
  "spain-2012": [euros()],
  "germany-1990": [wc()],
  "germany-2006": [],
  "germany-2014": [wc()],
  "italy-1994": [],
  "italy-2006": [wc()],
  "italy-2021": [euros()],
  "netherlands-1974": [],
  "netherlands-1988": [euros()],
  "netherlands-2010": [],
  "england-1966": [wc()],
  "england-1990": [],
  "england-1996": [],
  "england-2004": [],
  "england-2018": [],
  "england-2021": [],
  "portugal-2004": [],
  "portugal-2016": [euros()],
  "croatia-1998": [],
  "croatia-2018": [],
  "uruguay-1950": [wc()],
  "uruguay-2010": [],
  "belgium-1986": [],
  "belgium-2018": [],
  "hungary-1954": [],
  "hungary-1966": [],
  "colombia-1994": [],
  "colombia-2014": [],
  "denmark-1992": [euros()],
  "denmark-1998": [],
}

export function trophiesFor(teamId: string): Trophy[] {
  const found = TROPHIES[teamId]
  if (!found) throw new Error(`Missing trophy data for ${teamId}`)
  return found
}
