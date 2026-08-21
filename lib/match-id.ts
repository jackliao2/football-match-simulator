import { slugify } from "@/lib/format"

const SEED_PATTERN = /^[a-f0-9]{6}$/

export function createSeed(source?: number): string {
  if (typeof source === "number") {
    return (source >>> 0).toString(16).padStart(6, "0").slice(-6)
  }
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const bytes = new Uint32Array(1)
    crypto.getRandomValues(bytes)
    return (bytes[0] >>> 0).toString(16).padStart(8, "0").slice(0, 6)
  }
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")
}

export function isSeed(value: string): boolean {
  return SEED_PATTERN.test(value)
}

export function buildMatchId(homeId: string, awayId: string, seed: string): string {
  return `${homeId}-vs-${awayId}-${seed}`
}

export function parseMatchId(matchId: string): {
  homeId: string
  awayId: string
  seed: string
} | null {
  const idx = matchId.indexOf("-vs-")
  if (idx <= 0) return null
  const homeId = matchId.slice(0, idx)
  const rest = matchId.slice(idx + 4)
  const seedIdx = rest.lastIndexOf("-")
  if (seedIdx <= 0) return null
  const awayId = rest.slice(0, seedIdx)
  const seed = rest.slice(seedIdx + 1)
  if (!homeId || !awayId || !isSeed(seed)) return null
  return { homeId, awayId, seed }
}

export function buildVsSlug(homeId: string, awayId: string): string {
  return `${homeId}-vs-${awayId}`
}

export function parseVsSlug(slug: string): { homeId: string; awayId: string } | null {
  const idx = slug.indexOf("-vs-")
  if (idx <= 0) return null
  const homeId = slug.slice(0, idx)
  const awayId = slug.slice(idx + 4)
  if (!homeId || !awayId) return null
  return { homeId, awayId }
}

export function canonicalVsPair(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a]
}

export function canonicalVsSlug(a: string, b: string): string {
  const [left, right] = canonicalVsPair(a, b)
  return buildVsSlug(left, right)
}

export function clubSeasonPath(clubId: string, season: string): string {
  return `/teams/${clubId}/${season}`
}

export function teamPathFromIds(clubId: string, season: string): string {
  return clubSeasonPath(clubId, season)
}

export function safeTeamId(clubId: string, season: string): string {
  return `${slugify(clubId)}-${slugify(season)}`
}
