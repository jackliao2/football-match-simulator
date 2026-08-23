import type { Club } from "@/types"

export const clubs: Club[] = [
  { id: "barcelona", name: "Barcelona", code: "BAR", city: "Barcelona", country: "Spain" },
  { id: "real-madrid", name: "Real Madrid", code: "RMA", city: "Madrid", country: "Spain" },
  {
    id: "manchester-united",
    name: "Manchester United",
    code: "MUN",
    city: "Manchester",
    country: "England",
  },
  { id: "arsenal", name: "Arsenal", code: "ARS", city: "London", country: "England" },
  { id: "liverpool", name: "Liverpool", code: "LIV", city: "Liverpool", country: "England" },
  { id: "ac-milan", name: "AC Milan", code: "ACM", city: "Milan", country: "Italy" },
  { id: "inter-milan", name: "Inter Milan", code: "INT", city: "Milan", country: "Italy" },
  { id: "bayern-munich", name: "Bayern Munich", code: "BAY", city: "Munich", country: "Germany" },
  {
    id: "manchester-city",
    name: "Manchester City",
    code: "MCI",
    city: "Manchester",
    country: "England",
  },
  { id: "chelsea", name: "Chelsea", code: "CHE", city: "London", country: "England" },
  { id: "juventus", name: "Juventus", code: "JUV", city: "Turin", country: "Italy" },
  { id: "ajax", name: "Ajax", code: "AJA", city: "Amsterdam", country: "Netherlands" },
  {
    id: "borussia-dortmund",
    name: "Borussia Dortmund",
    code: "BVB",
    city: "Dortmund",
    country: "Germany",
  },
  { id: "porto", name: "Porto", code: "FCP", city: "Porto", country: "Portugal" },
  {
    id: "atletico-madrid",
    name: "Atlético Madrid",
    code: "ATM",
    city: "Madrid",
    country: "Spain",
  },
  { id: "tottenham", name: "Tottenham", code: "TOT", city: "London", country: "England" },
  {
    id: "paris-saint-germain",
    name: "Paris Saint-Germain",
    code: "PSG",
    city: "Paris",
    country: "France",
  },
  { id: "napoli", name: "Napoli", code: "NAP", city: "Naples", country: "Italy" },
]

export const nations: Club[] = [
  { id: "brazil", name: "Brazil", code: "BRA", city: "Rio de Janeiro", country: "Brazil", kind: "nation" },
  { id: "argentina", name: "Argentina", code: "ARG", city: "Buenos Aires", country: "Argentina", kind: "nation" },
  { id: "france", name: "France", code: "FRA", city: "Paris", country: "France", kind: "nation" },
  { id: "spain", name: "Spain", code: "ESP", city: "Madrid", country: "Spain", kind: "nation" },
  { id: "germany", name: "Germany", code: "GER", city: "Berlin", country: "Germany", kind: "nation" },
  { id: "italy", name: "Italy", code: "ITA", city: "Rome", country: "Italy", kind: "nation" },
  { id: "netherlands", name: "Netherlands", code: "NED", city: "Amsterdam", country: "Netherlands", kind: "nation" },
  { id: "england", name: "England", code: "ENG", city: "London", country: "England", kind: "nation" },
  { id: "portugal", name: "Portugal", code: "POR", city: "Lisbon", country: "Portugal", kind: "nation" },
  { id: "croatia", name: "Croatia", code: "CRO", city: "Zagreb", country: "Croatia", kind: "nation" },
  { id: "uruguay", name: "Uruguay", code: "URU", city: "Montevideo", country: "Uruguay", kind: "nation" },
  { id: "belgium", name: "Belgium", code: "BEL", city: "Brussels", country: "Belgium", kind: "nation" },
  { id: "hungary", name: "Hungary", code: "HUN", city: "Budapest", country: "Hungary", kind: "nation" },
  { id: "colombia", name: "Colombia", code: "COL", city: "Bogotá", country: "Colombia", kind: "nation" },
  { id: "denmark", name: "Denmark", code: "DEN", city: "Copenhagen", country: "Denmark", kind: "nation" },
]

export const orgs: Club[] = [...clubs, ...nations]

export function getClub(id: string): Club | undefined {
  return orgs.find((club) => club.id === id)
}

export function getNation(id: string): Club | undefined {
  return nations.find((nation) => nation.id === id)
}
