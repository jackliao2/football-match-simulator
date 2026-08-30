const LAST_KEY = "lm-last-matchup"
const HISTORY_KEY = "lm-match-history"
const HISTORY_LIMIT = 10

export type StoredMatchup = {
  homeId: string
  awayId: string
}

export type StoredMatch = StoredMatchup & {
  id: string
  homeName: string
  awayName: string
  homeSeason: string
  awaySeason: string
  homeScore: number
  awayScore: number
  seed: string
  at: number
}

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function loadLastMatchup(): StoredMatchup | null {
  const stored = readJson<StoredMatchup>(LAST_KEY)
  if (!stored?.homeId || !stored.awayId || stored.homeId === stored.awayId) return null
  return stored
}

export function saveLastMatchup(homeId: string, awayId: string) {
  if (!homeId || !awayId || homeId === awayId) return
  try {
    window.localStorage.setItem(LAST_KEY, JSON.stringify({ homeId, awayId }))
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadMatchHistory(): StoredMatch[] {
  const stored = readJson<StoredMatch[]>(HISTORY_KEY)
  if (!Array.isArray(stored)) return []
  return stored.filter((item) => item?.id && item.homeId && item.awayId).slice(0, HISTORY_LIMIT)
}

export function pushMatchHistory(item: StoredMatch) {
  const next = [item, ...loadMatchHistory().filter((row) => row.id !== item.id)].slice(0, HISTORY_LIMIT)
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
  } catch {
    /* ignore quota / private mode */
  }
}
