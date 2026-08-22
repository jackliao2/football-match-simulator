export type AnalyticsEvent =
  | "team_page_view"
  | "simulator_started"
  | "match_simulated"
  | "simulate_again"
  | "simulate_100"
  | "ai_report_generated"
  | "ai_analysis"
  | "match_shared"
  | "team_selected"
  | "season_selected"

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return

  const cleaned: Record<string, unknown> = { event }
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined) cleaned[key] = value
  }

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(cleaned)

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload)
  }
}
