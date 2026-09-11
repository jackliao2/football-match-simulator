"use client"

import { useEffect } from "react"
import Link from "next/link"

export function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="grid gap-4 py-10">
      <p className="page-kicker">LegendaryMatch</p>
      <h1 className="page-title">This page did not finish loading</h1>
      <p className="page-lead">
        Barcelona 2010/11 vs Madrid 2016/17 is still on the homepage. Reload this page, or go back there.
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={reset}>
          Reload this page
        </button>
        <Link href="/" className="rail-btn rail-btn-inline">
          Barcelona 2010/11 vs Madrid 2016/17
        </Link>
      </div>
    </div>
  )
}
