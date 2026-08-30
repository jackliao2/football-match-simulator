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
  | "simulation_completed"
  | "next_dream_match_started"
  | "ai_analysis_completed"
  | "ai_analysis_failed"
  | "language_changed"
  | "analytics_consent_updated"

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function ensureGtag(): (...args: unknown[]) => void {
  window.dataLayer = window.dataLayer ?? []
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args))
  return window.gtag
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return

  const cleaned: Record<string, unknown> = { event }
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined) cleaned[key] = value
  }

  ensureGtag()("event", event, cleaned)
}
