import type { Club, ClubLeague, NationRegion } from "@/types"

export const LEAGUES: { id: ClubLeague; label: string }[] = [
  { id: "premier-league", label: "England" },
  { id: "la-liga", label: "Spain" },
  { id: "serie-a", label: "Italy" },
  { id: "bundesliga", label: "Germany" },
  { id: "ligue-1", label: "France" },
  { id: "liga-portugal", label: "Portugal" },
  { id: "eredivisie", label: "Netherlands" },
  { id: "scottish", label: "Scotland" },
  { id: "other-europe", label: "Rest of Europe" },
  { id: "south-america", label: "South America" },
]

export const NATION_REGIONS: { id: NationRegion; label: string }[] = [
  { id: "europe", label: "Europe" },
  { id: "south-america", label: "South America" },
  { id: "africa", label: "Africa" },
  { id: "concacaf", label: "North America" },
  { id: "asia", label: "Asia & Oceania" },
]

export const clubs: Club[] = [
  { id: "barcelona", name: "Barcelona", code: "BAR", city: "Barcelona", country: "Spain", league: "la-liga" },
  { id: "real-madrid", name: "Real Madrid", code: "RMA", city: "Madrid", country: "Spain", league: "la-liga" },
  { id: "atletico-madrid", name: "Atlético Madrid", code: "ATM", city: "Madrid", country: "Spain", league: "la-liga" },
  { id: "sevilla", name: "Sevilla", code: "SEV", city: "Seville", country: "Spain", league: "la-liga" },
  { id: "valencia", name: "Valencia", code: "VAL", city: "Valencia", country: "Spain", league: "la-liga" },
  { id: "athletic-bilbao", name: "Athletic Bilbao", code: "ATH", city: "Bilbao", country: "Spain", league: "la-liga" },

  { id: "manchester-united", name: "Manchester United", code: "MUN", city: "Manchester", country: "England", league: "premier-league" },
  { id: "liverpool", name: "Liverpool", code: "LIV", city: "Liverpool", country: "England", league: "premier-league" },
  { id: "arsenal", name: "Arsenal", code: "ARS", city: "London", country: "England", league: "premier-league" },
  { id: "chelsea", name: "Chelsea", code: "CHE", city: "London", country: "England", league: "premier-league" },
  { id: "manchester-city", name: "Manchester City", code: "MCI", city: "Manchester", country: "England", league: "premier-league" },
  { id: "tottenham", name: "Tottenham", code: "TOT", city: "London", country: "England", league: "premier-league" },
  { id: "everton", name: "Everton", code: "EVE", city: "Liverpool", country: "England", league: "premier-league" },
  { id: "leeds-united", name: "Leeds United", code: "LEE", city: "Leeds", country: "England", league: "premier-league" },
  { id: "nottingham-forest", name: "Nott'm Forest", code: "NFO", city: "Nottingham", country: "England", league: "premier-league" },
  { id: "newcastle", name: "Newcastle", code: "NEW", city: "Newcastle", country: "England", league: "premier-league" },
  { id: "aston-villa", name: "Aston Villa", code: "AVL", city: "Birmingham", country: "England", league: "premier-league" },

  { id: "ac-milan", name: "AC Milan", code: "ACM", city: "Milan", country: "Italy", league: "serie-a" },
  { id: "inter-milan", name: "Inter Milan", code: "INT", city: "Milan", country: "Italy", league: "serie-a" },
  { id: "juventus", name: "Juventus", code: "JUV", city: "Turin", country: "Italy", league: "serie-a" },
  { id: "napoli", name: "Napoli", code: "NAP", city: "Naples", country: "Italy", league: "serie-a" },
  { id: "as-roma", name: "Roma", code: "ROM", city: "Rome", country: "Italy", league: "serie-a" },
  { id: "lazio", name: "Lazio", code: "LAZ", city: "Rome", country: "Italy", league: "serie-a" },

  { id: "bayern-munich", name: "Bayern Munich", code: "BAY", city: "Munich", country: "Germany", league: "bundesliga" },
  { id: "borussia-dortmund", name: "Borussia Dortmund", code: "BVB", city: "Dortmund", country: "Germany", league: "bundesliga" },
  { id: "bayer-leverkusen", name: "Bayer Leverkusen", code: "B04", city: "Leverkusen", country: "Germany", league: "bundesliga" },
  { id: "borussia-monchengladbach", name: "M'gladbach", code: "BMG", city: "Mönchengladbach", country: "Germany", league: "bundesliga" },

  { id: "paris-saint-germain", name: "Paris Saint-Germain", code: "PSG", city: "Paris", country: "France", league: "ligue-1" },
  { id: "marseille", name: "Marseille", code: "OM", city: "Marseille", country: "France", league: "ligue-1" },
  { id: "lyon", name: "Lyon", code: "OL", city: "Lyon", country: "France", league: "ligue-1" },
  { id: "monaco", name: "Monaco", code: "ASM", city: "Monaco", country: "France", league: "ligue-1" },

  { id: "porto", name: "Porto", code: "FCP", city: "Porto", country: "Portugal", league: "liga-portugal" },
  { id: "benfica", name: "Benfica", code: "SLB", city: "Lisbon", country: "Portugal", league: "liga-portugal" },
  { id: "sporting", name: "Sporting", code: "SCP", city: "Lisbon", country: "Portugal", league: "liga-portugal" },

  { id: "ajax", name: "Ajax", code: "AJA", city: "Amsterdam", country: "Netherlands", league: "eredivisie" },
  { id: "psv", name: "PSV", code: "PSV", city: "Eindhoven", country: "Netherlands", league: "eredivisie" },
  { id: "feyenoord", name: "Feyenoord", code: "FEY", city: "Rotterdam", country: "Netherlands", league: "eredivisie" },

  { id: "celtic", name: "Celtic", code: "CEL", city: "Glasgow", country: "Scotland", league: "scottish" },
  { id: "rangers", name: "Rangers", code: "RAN", city: "Glasgow", country: "Scotland", league: "scottish" },

  { id: "red-star", name: "Red Star", code: "CZV", city: "Belgrade", country: "Serbia", league: "other-europe" },
  { id: "steaua", name: "Steaua", code: "STE", city: "Bucharest", country: "Romania", league: "other-europe" },
  { id: "galatasaray", name: "Galatasaray", code: "GAL", city: "Istanbul", country: "Turkey", league: "other-europe" },

  { id: "santos", name: "Santos", code: "SAN", city: "Santos", country: "Brazil", league: "south-america" },
  { id: "flamengo", name: "Flamengo", code: "FLA", city: "Rio de Janeiro", country: "Brazil", league: "south-america" },
  { id: "boca-juniors", name: "Boca Juniors", code: "BOC", city: "Buenos Aires", country: "Argentina", league: "south-america" },
  { id: "river-plate", name: "River Plate", code: "RIV", city: "Buenos Aires", country: "Argentina", league: "south-america" },
]

export const nations: Club[] = [
  { id: "brazil", name: "Brazil", code: "BRA", city: "Rio de Janeiro", country: "Brazil", kind: "nation", region: "south-america" },
  { id: "argentina", name: "Argentina", code: "ARG", city: "Buenos Aires", country: "Argentina", kind: "nation", region: "south-america" },
  { id: "uruguay", name: "Uruguay", code: "URU", city: "Montevideo", country: "Uruguay", kind: "nation", region: "south-america" },
  { id: "colombia", name: "Colombia", code: "COL", city: "Bogotá", country: "Colombia", kind: "nation", region: "south-america" },
  { id: "chile", name: "Chile", code: "CHI", city: "Santiago", country: "Chile", kind: "nation", region: "south-america" },
  { id: "france", name: "France", code: "FRA", city: "Paris", country: "France", kind: "nation", region: "europe" },
  { id: "spain", name: "Spain", code: "ESP", city: "Madrid", country: "Spain", kind: "nation", region: "europe" },
  { id: "germany", name: "Germany", code: "GER", city: "Berlin", country: "Germany", kind: "nation", region: "europe" },
  { id: "italy", name: "Italy", code: "ITA", city: "Rome", country: "Italy", kind: "nation", region: "europe" },
  { id: "netherlands", name: "Netherlands", code: "NED", city: "Amsterdam", country: "Netherlands", kind: "nation", region: "europe" },
  { id: "england", name: "England", code: "ENG", city: "London", country: "England", kind: "nation", region: "europe" },
  { id: "portugal", name: "Portugal", code: "POR", city: "Lisbon", country: "Portugal", kind: "nation", region: "europe" },
  { id: "croatia", name: "Croatia", code: "CRO", city: "Zagreb", country: "Croatia", kind: "nation", region: "europe" },
  { id: "belgium", name: "Belgium", code: "BEL", city: "Brussels", country: "Belgium", kind: "nation", region: "europe" },
  { id: "hungary", name: "Hungary", code: "HUN", city: "Budapest", country: "Hungary", kind: "nation", region: "europe" },
  { id: "denmark", name: "Denmark", code: "DEN", city: "Copenhagen", country: "Denmark", kind: "nation", region: "europe" },
  { id: "sweden", name: "Sweden", code: "SWE", city: "Stockholm", country: "Sweden", kind: "nation", region: "europe" },
  { id: "greece", name: "Greece", code: "GRE", city: "Athens", country: "Greece", kind: "nation", region: "europe" },
  { id: "turkey", name: "Turkey", code: "TUR", city: "Istanbul", country: "Turkey", kind: "nation", region: "europe" },
  { id: "czechia", name: "Czechia", code: "CZE", city: "Prague", country: "Czechia", kind: "nation", region: "europe" },
  { id: "wales", name: "Wales", code: "WAL", city: "Cardiff", country: "Wales", kind: "nation", region: "europe" },
  { id: "mexico", name: "Mexico", code: "MEX", city: "Mexico City", country: "Mexico", kind: "nation", region: "concacaf" },
  { id: "usa", name: "United States", code: "USA", city: "New York", country: "United States", kind: "nation", region: "concacaf" },
  { id: "morocco", name: "Morocco", code: "MAR", city: "Rabat", country: "Morocco", kind: "nation", region: "africa" },
  { id: "senegal", name: "Senegal", code: "SEN", city: "Dakar", country: "Senegal", kind: "nation", region: "africa" },
  { id: "nigeria", name: "Nigeria", code: "NGA", city: "Abuja", country: "Nigeria", kind: "nation", region: "africa" },
  { id: "cameroon", name: "Cameroon", code: "CMR", city: "Yaoundé", country: "Cameroon", kind: "nation", region: "africa" },
  { id: "japan", name: "Japan", code: "JPN", city: "Tokyo", country: "Japan", kind: "nation", region: "asia" },
  { id: "south-korea", name: "South Korea", code: "KOR", city: "Seoul", country: "South Korea", kind: "nation", region: "asia" },
]

export const orgs: Club[] = [...clubs, ...nations]

export function getClub(id: string): Club | undefined {
  return orgs.find((club) => club.id === id)
}

export function getNation(id: string): Club | undefined {
  return nations.find((nation) => nation.id === id)
}
