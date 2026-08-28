"use client"

import { useEffect, useState } from "react"
import { track } from "@/lib/analytics"

const CONSENT_KEY = "legendarymatch_analytics_consent"
type Consent = "granted" | "denied"

function updateConsent(value: Consent) {
  window.gtag?.("consent", "update", { analytics_storage: value, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" })
}

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY) as Consent | null
    if (saved === "granted" || saved === "denied") updateConsent(saved)
    else {
      const timer = window.setTimeout(() => setVisible(true), 0)
      return () => window.clearTimeout(timer)
    }
  }, [])

  function choose(value: Consent) {
    window.localStorage.setItem(CONSENT_KEY, value)
    updateConsent(value)
    setVisible(false)
    if (value === "granted") track("analytics_consent_updated", { analytics_storage: value })
  }

  if (!visible) return null
  return <aside className="consent-banner" aria-label="Analytics preferences">
    <div><p>Help improve LegendaryMatch</p><span>We use Google Analytics to understand which teams and simulator features people use. No advertising cookies, accounts or personal profiles.</span></div>
    <div className="consent-actions"><button type="button" onClick={() => choose("denied")}>Essential only</button><button type="button" className="is-primary" onClick={() => choose("granted")}>Allow analytics</button><a href="/privacy">Privacy</a></div>
  </aside>
}
