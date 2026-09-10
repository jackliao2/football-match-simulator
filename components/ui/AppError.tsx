"use client"

import Link from "next/link"

export function AppError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="grid gap-4 py-10">
      <p className="page-kicker">LegendaryMatch</p>
      <h1 className="page-title">Barcelona 2010/11 vs Madrid 2016/17 failed to load</h1>
      <p className="page-lead">
        The named-season simulator is still here. Try this page again, or go back to Barcelona 2010/11 vs Madrid
        2016/17 on the homepage.
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={reset}>
          Try this page again
        </button>
        <Link href="/" className="rail-btn rail-btn-inline">
          Barcelona vs Madrid
        </Link>
      </div>
    </div>
  )
}
