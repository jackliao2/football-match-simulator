"use client"

import { useEffect } from "react"

export function AppError({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    const stale = /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module/i.test(
      `${error.name} ${error.message}`,
    )
    if (!stale) return
    const key = "lm-stale-reload"
    if (sessionStorage.getItem(key) === window.location.pathname) return
    sessionStorage.setItem(key, window.location.pathname)
    window.location.reload()
  }, [error])

  return (
    <div className="grid gap-4 py-10">
      <p className="page-kicker">LegendaryMatch</p>
      <h1 className="page-title">This page did not finish loading</h1>
      <p className="page-lead">
        Barcelona 2010/11 vs Madrid 2016/17 is still on the homepage. Reload this page, or go back there.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rail-btn rail-btn-primary rail-btn-inline"
          onClick={() => window.location.reload()}
        >
          Reload this page
        </button>
        <button
          type="button"
          className="rail-btn rail-btn-inline"
          onClick={() => {
            // Full document load: Next's client router is already in a failed state.
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.assign("/")
          }}
        >
          Barcelona 2010/11 vs Madrid 2016/17
        </button>
      </div>
    </div>
  )
}
