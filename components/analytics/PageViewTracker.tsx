"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { ensureGtag } from "@/lib/analytics"

export function PageViewTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  useEffect(() => {
    ensureGtag()("event", "page_view", { page_title: document.title, page_location: window.location.href, page_path: pathname, send_to: measurementId })
  }, [measurementId, pathname])
  return null
}
