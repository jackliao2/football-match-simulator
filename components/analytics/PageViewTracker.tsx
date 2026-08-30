"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { readConsent } from "@/lib/consent"
import { ensureGtag } from "@/lib/analytics"

export function PageViewTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  useEffect(() => {
    if (readConsent() !== "granted") return
    ensureGtag()("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
      send_to: measurementId,
    })
  }, [measurementId, pathname])
  return null
}
