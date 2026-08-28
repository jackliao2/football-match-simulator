"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { track } from "@/lib/analytics"
import { buildMatchId, createSeed } from "@/lib/match-id"
import type { HistoricalTeam } from "@/types"

export function MatchActions({
  home,
  away,
}: {
  home: HistoricalTeam
  away: HistoricalTeam
}) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  function simulateAgain() {
    track("simulate_again", { home: home.id, away: away.id })
    router.push(`/match/${buildMatchId(home.id, away.id, createSeed())}`)
  }

  async function shareMatch() {
    track("match_shared", { home: home.id, away: away.id })
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt("Copy this match URL", url)
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" className="rail-btn rail-btn-primary" onClick={simulateAgain}>
          Simulate again
        </button>
        <button type="button" className="rail-btn" onClick={shareMatch}>
          {copied ? "Copied" : "Share match"}
        </button>
      </div>
      <button
        type="button"
        className="rail-swap"
        onClick={() => router.push(`/match/${buildMatchId(away.id, home.id, createSeed())}`)}
      >
        Reverse fixture
      </button>
    </div>
  )
}
