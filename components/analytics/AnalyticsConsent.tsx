"use client"

import { useEffect, useState } from "react"
import { CONSENT_KEY, consentSignals, readConsent, type ConsentChoice } from "@/lib/consent"
import { ensureGtag, track } from "@/lib/analytics"

function updateConsent(value: ConsentChoice) {
  ensureGtag()("consent", "update", consentSignals(value))
}

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const saved = readConsent()
    if (saved) updateConsent(saved)
    else {
      const timer = window.setTimeout(() => setVisible(true), 0)
      return () => window.clearTimeout(timer)
    }
  }, [])

  function choose(value: ConsentChoice) {
    window.localStorage.setItem(CONSENT_KEY, value)
    updateConsent(value)
    setVisible(false)
    if (value === "granted") track("analytics_consent_updated", { analytics_storage: value })
  }

  if (!visible) return null
  return (
    <aside className="consent-banner" aria-label="Privacy preferences">
      <div>
        <p>Help keep LegendaryMatch free</p>
        <span>
          We use Google Analytics to see which teams and simulator features people use, and Google AdSense to show ads.
          Essential cookies are not used for advertising. Choose whether analytics and advertising cookies can be stored.
          Details are on the privacy page.
        </span>
      </div>
      <div className="consent-actions">
        <button type="button" onClick={() => choose("denied")}>
          Essential only
        </button>
        <button type="button" className="is-primary" onClick={() => choose("granted")}>
          Accept analytics & ads
        </button>
        <a href="/privacy">Privacy</a>
      </div>
    </aside>
  )
}
