export const CONSENT_KEY = "legendarymatch_consent_v2"

export type ConsentChoice = "granted" | "denied"

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  const saved = window.localStorage.getItem(CONSENT_KEY)
  return saved === "granted" || saved === "denied" ? saved : null
}

export function consentSignals(value: ConsentChoice) {
  const ads = value === "granted" ? "granted" : "denied"
  return {
    analytics_storage: value,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  }
}
