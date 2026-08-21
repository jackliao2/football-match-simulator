"use client"

import { useEffect } from "react"
import { track, type AnalyticsEvent } from "@/lib/analytics"

export function TrackOnMount({
  event,
  payload,
}: {
  event: AnalyticsEvent
  payload?: Record<string, string | number | boolean>
}) {
  const serialized = JSON.stringify(payload ?? {})
  useEffect(() => {
    track(event, JSON.parse(serialized) as Record<string, string | number | boolean>)
  }, [event, serialized])
  return null
}
