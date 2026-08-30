export const CLUB_TROPHIES = ["europe", "league", "treble"] as const
export const NATION_TROPHIES = ["world", "euros", "copa", "finalists"] as const

const ALIASES: Record<string, string> = {
  ucl: "europe",
  "champions-league": "europe",
  "european-cup": "europe",
  "world-cup": "world",
  euro: "euros",
  "copa-america": "copa",
  copa: "copa",
}

export function parseCatalogTrophy(mode: "clubs" | "nations", value: unknown): string {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : ""
  if (!raw || raw === "all") return "all"
  const mapped = ALIASES[raw] ?? raw
  const allowed = mode === "nations" ? NATION_TROPHIES : CLUB_TROPHIES
  return (allowed as readonly string[]).includes(mapped) ? mapped : "all"
}

export function catalogFilterQuery(trophy: string) {
  return trophy === "all" ? "" : `?trophy=${trophy}`
}
