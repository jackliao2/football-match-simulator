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
      <p className="page-kicker">Something broke</p>
      <h1 className="page-title">This page failed to load</h1>
      <p className="page-lead">The simulator is still here. Try again, or go back to the homepage.</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" onClick={reset}>
          Try again
        </button>
        <Link href="/" className="rail-btn rail-btn-inline">
          Home
        </Link>
      </div>
    </div>
  )
}
