import type { Trophy, TrophyCode } from "@/types"

function t(code: TrophyCode, label: string, count: number): Trophy {
  return { code, label, count }
}

const ucl = (n: number) => t("ucl", "UCL", n)
const el = (n: number) => t("el", "Europa", n)
const league = (n: number) => t("league", "League", n)
const wc = (n: number) => t("world-cup", "World Cup", n)
const euros = (n: number) => t("euros", "Euros", n)
const copa = (n: number) => t("copa", "Copa", n)

/** Major trophies won by the end of that season or tournament. */
export const TROPHIES: Record<string, Trophy[]> = {
  "barcelona-2008-09": [ucl(3), league(19)],
  "barcelona-2010-11": [ucl(4), league(21)],
  "barcelona-2014-15": [ucl(5), league(23)],
  "real-madrid-2013-14": [ucl(10), league(32)],
  "real-madrid-2016-17": [ucl(12), league(33)],
  "manchester-united-1998-99": [ucl(2), league(12)],
  "manchester-united-2007-08": [ucl(3), league(17)],
  "arsenal-1997-98": [league(11)],
  "arsenal-2003-04": [league(13)],
  "liverpool-2004-05": [ucl(5), el(3), league(18)],
  "liverpool-2018-19": [ucl(6), el(3), league(18)],
  "ac-milan-1988-89": [ucl(3), league(11)],
  "ac-milan-2006-07": [ucl(7), league(17)],
  "inter-milan-1988-89": [ucl(2), league(13)],
  "inter-milan-2009-10": [ucl(3), league(18)],
  "bayern-munich-2012-13": [ucl(5), league(23)],
  "bayern-munich-2019-20": [ucl(6), league(30)],
  "manchester-city-2017-18": [league(5)],
  "manchester-city-2022-23": [ucl(1), league(9)],
  "chelsea-2004-05": [league(2)],
  "chelsea-2011-12": [ucl(1), league(4)],
  "juventus-2002-03": [ucl(2), league(27)],
  "juventus-2016-17": [ucl(2), league(33)],
  "ajax-1994-95": [ucl(4), league(26)],
  "ajax-2018-19": [ucl(4), league(34)],
  "borussia-dortmund-2010-11": [ucl(1), league(7)],
  "borussia-dortmund-2012-13": [ucl(1), league(8)],
  "porto-2003-04": [ucl(2), el(1), league(20)],
  "porto-2010-11": [ucl(2), el(2), league(25)],
  "atletico-madrid-2013-14": [el(2), league(10)],
  "atletico-madrid-2020-21": [el(3), league(11)],
  "tottenham-2016-17": [el(2), league(2)],
  "tottenham-2018-19": [el(2), league(2)],
  "paris-saint-germain-2017-18": [league(7)],
  "paris-saint-germain-2022-23": [league(11)],
  "napoli-1986-87": [league(1)],
  "napoli-2022-23": [league(3)],

  "brazil-1970": [wc(3), copa(3)],
  "brazil-1982": [wc(3), copa(3)],
  "brazil-2002": [wc(5), copa(6)],
  "argentina-1986": [wc(2), copa(12)],
  "argentina-2022": [wc(3), copa(15)],
  "france-1984": [euros(1)],
  "france-1998": [wc(1), euros(1)],
  "france-2018": [wc(2), euros(2)],
  "spain-2010": [wc(1), euros(2)],
  "spain-2012": [wc(1), euros(3)],
  "germany-1990": [wc(3), euros(2)],
  "germany-2006": [wc(3), euros(3)],
  "germany-2014": [wc(4), euros(3)],
  "italy-1994": [wc(3), euros(1)],
  "italy-2006": [wc(4), euros(1)],
  "italy-2021": [wc(4), euros(2)],
  "netherlands-1974": [],
  "netherlands-1988": [euros(1)],
  "netherlands-2010": [euros(1)],
  "england-1966": [wc(1)],
  "england-1990": [wc(1)],
  "england-1996": [wc(1)],
  "england-2004": [wc(1)],
  "england-2018": [wc(1)],
  "england-2021": [wc(1)],
  "portugal-2004": [],
  "portugal-2016": [euros(1)],
  "croatia-1998": [],
  "croatia-2018": [],
  "uruguay-1950": [wc(2), copa(8)],
  "uruguay-2010": [wc(2), copa(14)],
  "belgium-1986": [],
  "belgium-2018": [],
  "hungary-1954": [],
  "hungary-1966": [],
  "colombia-1994": [],
  "colombia-2014": [copa(1)],
  "denmark-1992": [euros(1)],
  "denmark-1998": [euros(1)],
}

export function trophiesFor(teamId: string): Trophy[] {
  const found = TROPHIES[teamId]
  if (!found) throw new Error(`Missing trophy data for ${teamId}`)
  return found.filter((item) => item.count > 0)
}
