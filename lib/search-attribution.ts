import { readConsent } from "@/lib/consent"

const KEY = "legendarymatch_search_visit_v1"
const SESSION_MS = 30 * 60 * 1000

type Entry = { landing_path: string; search_engine: string }
type Visit = Entry & { lastActive: number; viewed: boolean; converted: boolean }
let entry: Entry | null | undefined
let replaceVisit = false

function hasCampaign(url: URL): boolean {
  return [...url.searchParams.keys()].some((key) => /^(utm_.+|gclid|dclid|gbraid|wbraid|msclkid)$/i.test(key))
}

export function searchEntry(location: string, referrer: string): Entry | null {
  try {
    const url = new URL(location)
    // Campaign URLs must not be counted as organic search visits.
    if (hasCampaign(url)) return null
    const host = new URL(referrer).hostname.toLowerCase()
    const engine = /^(www\.)?google\.(com|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/.test(host) ? "google"
      : /^(www\.)?bing\.com$/.test(host) ? "bing"
      : /^(www\.)?duckduckgo\.com$/.test(host) ? "duckduckgo"
      : /(^|\.)search\.yahoo\.com$/.test(host) ? "yahoo"
      : /^(www\.)?baidu\.com$/.test(host) ? "baidu" : null
    return engine ? { landing_path: url.pathname, search_engine: engine } : null
  } catch { return null }
}

export function captureSearchEntry(): void {
  if (entry === undefined && typeof window !== "undefined") {
    entry = searchEntry(window.location.href, document.referrer)
    try {
      const url = new URL(window.location.href)
      replaceVisit = hasCampaign(url) || Boolean(document.referrer && new URL(document.referrer).origin !== url.origin)
    } catch { replaceVisit = false }
  }
}

export function clearSearchVisit(): void {
  try { window.sessionStorage.removeItem(KEY) } catch { /* Storage may be unavailable. */ }
  entry = null
  replaceVisit = false
}

export function searchVisit(event: "context" | "view" | "conversion" = "context"): Entry | null {
  if (typeof window === "undefined" || readConsent() !== "granted") return null
  captureSearchEntry()
  try {
    const now = Date.now()
    if (replaceVisit) {
      window.sessionStorage.removeItem(KEY)
      replaceVisit = false
    }
    const saved = window.sessionStorage.getItem(KEY)
    let visit: Visit | null = saved ? JSON.parse(saved) : null
    if (visit && (!Number.isFinite(visit.lastActive) || now - visit.lastActive > SESSION_MS)) {
      window.sessionStorage.removeItem(KEY)
      visit = null
      entry = null
    }
    if (!visit && entry) visit = { ...entry, lastActive: now, viewed: false, converted: false }
    if (!visit) return null
    const duplicate = event === "view" ? visit.viewed : event === "conversion" ? visit.converted : false
    if (event === "view") visit.viewed = true
    if (event === "conversion") visit.converted = true
    visit.lastActive = now
    window.sessionStorage.setItem(KEY, JSON.stringify(visit))
    return duplicate ? null : { landing_path: visit.landing_path, search_engine: visit.search_engine }
  } catch { return null }
}
