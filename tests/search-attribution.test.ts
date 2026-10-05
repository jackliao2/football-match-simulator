import { afterEach, describe, expect, it, vi } from "vitest"

function storage() {
  const values = new Map<string, string>()
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value) },
    removeItem: (key: string) => { values.delete(key) },
  }
}

async function browser(consent: string | null = "granted") {
  vi.resetModules()
  const localStorage = storage()
  if (consent) localStorage.setItem("legendarymatch_consent_v2", consent)
  const sessionStorage = storage()
  const gtag = vi.fn()
  const location = { href: "https://legendarymatch.com/teams/chelsea/2004-05?private=excluded", pathname: "/teams/chelsea/2004-05" }
  vi.stubGlobal("window", { location, localStorage, sessionStorage, gtag })
  vi.stubGlobal("document", { referrer: "https://www.google.co.uk/search?q=chelsea" })
  return { location, localStorage, sessionStorage, gtag, analytics: await import("@/lib/analytics"), attribution: await import("@/lib/search-attribution") }
}

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks() })

describe("organic search funnel", () => {
  it("retains the landing page through navigation and counts one conversion for repeated simulation starts", async () => {
    const { location, analytics, gtag } = await browser()
    analytics.trackSearchLanding()
    analytics.trackSearchLanding()
    location.href = "https://legendarymatch.com/simulate?home=chelsea-2004-05"
    location.pathname = "/simulate"
    analytics.track("simulator_started", { mode: "batch" })
    analytics.track("simulator_started")
    expect(gtag.mock.calls.filter((call) => call[1] === "organic_search_landing_view")).toHaveLength(1)
    const conversions = gtag.mock.calls.filter((call) => call[1] === "organic_search_simulator_started")
    expect(conversions).toHaveLength(1)
    expect(conversions[0][2]).toMatchObject({ landing_path: "/teams/chelsea/2004-05", search_engine: "google", page_path: "/simulate", mode: "batch" })
    expect(JSON.stringify(conversions)).not.toMatch(/private|q=chelsea/)
  })

  it("does not send or persist attribution before consent; supports consent granted later", async () => {
    const { analytics, attribution, localStorage, sessionStorage, gtag } = await browser(null)
    attribution.captureSearchEntry()
    analytics.trackSearchLanding()
    analytics.track("simulator_started")
    expect(gtag).not.toHaveBeenCalled()
    expect(sessionStorage.getItem("legendarymatch_search_visit_v1")).toBeNull()
    localStorage.setItem("legendarymatch_consent_v2", "granted")
    analytics.trackSearchLanding()
    expect(gtag.mock.calls[0][1]).toBe("organic_search_landing_view")
  })

  it("expires inactive attribution instead of treating a later start as search conversion", async () => {
    const { analytics, gtag } = await browser()
    const now = Date.now()
    vi.spyOn(Date, "now").mockReturnValue(now)
    analytics.trackSearchLanding()
    vi.spyOn(Date, "now").mockReturnValue(now + 31 * 60 * 1000)
    analytics.track("simulator_started")
    expect(gtag.mock.calls.some((call) => call[1] === "organic_search_simulator_started")).toBe(false)
  })

  it("keeps attribution on an internal reload and resets it on a new paid arrival", async () => {
    const { analytics, location, gtag } = await browser()
    analytics.trackSearchLanding()
    location.href = "https://legendarymatch.com/simulate"
    location.pathname = "/simulate"
    vi.stubGlobal("document", { referrer: "https://legendarymatch.com/teams/chelsea/2004-05" })
    vi.resetModules()
    const reloaded = await import("@/lib/analytics")
    reloaded.track("simulator_started")
    expect(gtag.mock.calls.filter((call) => call[1] === "organic_search_simulator_started")).toHaveLength(1)
    location.href = "https://legendarymatch.com/simulate?gclid=paid"
    vi.stubGlobal("document", { referrer: "https://www.google.com/" })
    vi.resetModules()
    const paid = await import("@/lib/analytics")
    gtag.mockClear()
    paid.trackSearchLanding()
    paid.track("simulator_started")
    expect(gtag.mock.calls.map((call) => call[1])).toEqual(["simulator_started"])
  })

  it("excludes campaign links, spoofed hosts, direct and internal traffic", async () => {
    const { attribution } = await browser()
    const url = "https://legendarymatch.com/compare/ac-milan-vs-inter-milan"
    expect(attribution.searchEntry(url + "?gclid=paid", "https://www.google.com/")).toBeNull()
    expect(attribution.searchEntry(url + "?utm_medium=cpc", "https://www.bing.com/")).toBeNull()
    expect(attribution.searchEntry(url, "https://google.com.example.com/")).toBeNull()
    expect(attribution.searchEntry(url, url)).toBeNull()
    expect(attribution.searchEntry(url, "")).toBeNull()
    expect(attribution.searchEntry(url, "https://www.bing.com/search?q=milan")?.search_engine).toBe("bing")
  })

  it("clears attribution when consent is denied and tolerates blocked storage", async () => {
    const { analytics, attribution, sessionStorage, localStorage, gtag } = await browser()
    analytics.trackSearchLanding()
    localStorage.setItem("legendarymatch_consent_v2", "denied")
    attribution.clearSearchVisit()
    expect(sessionStorage.getItem("legendarymatch_search_visit_v1")).toBeNull()
    gtag.mockClear()
    analytics.track("simulator_started")
    expect(gtag).not.toHaveBeenCalled()
    localStorage.getItem = () => { throw new Error("blocked") }
    expect(() => analytics.track("simulator_started")).not.toThrow()
  })
})
