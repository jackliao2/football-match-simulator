"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { readConsent } from "@/lib/consent"
import { ensureGtag, trackSearchLanding } from "@/lib/analytics"
import { captureSearchEntry } from "@/lib/search-attribution"

export function PageViewTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  useEffect(() => {
    captureSearchEntry()
    function sendView() {
      if (readConsent() !== "granted") return
      trackSearchLanding()
      ensureGtag()("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
        send_to: measurementId,
      })
    }
    sendView()
    window.addEventListener("legendarymatch:consent", sendView)
    return () => window.removeEventListener("legendarymatch:consent", sendView)
  }, [measurementId, pathname])
  return null
}
