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
]

export function getClub(id: string): Club | undefined {
  return clubs.find((club) => club.id === id)
}
