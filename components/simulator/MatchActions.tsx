"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { track } from "@/lib/analytics"
import { buildMatchId, createSeed } from "@/lib/match-id"
import { copyOrShare, matchShareCopy } from "@/lib/share"
import type { HistoricalTeam, SimulatedMatch } from "@/types"

export function MatchActions({
  home,
  away,
  match,
}: {
  home: HistoricalTeam
  away: HistoricalTeam
  match: SimulatedMatch
}) {
  const router = useRouter()
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared">("idle")

  function simulateAgain() {
    track("simulate_again", { home: home.id, away: away.id })
    router.push(`/match/${buildMatchId(home.id, away.id, createSeed())}`)
  }

  async function shareMatch() {
    const url = window.location.href
    const copy = matchShareCopy(
      home.clubName,
      home.displaySeason,
      match.score.home,
      away.clubName,
      away.displaySeason,
      match.score.away,
    )
    const result = await copyOrShare({ url, ...copy })
    track("match_shared", { method: result, home: home.id, away: away.id })
    if (result === "copied" || result === "shared") {
      setShareStatus(result)
      setTimeout(() => setShareStatus("idle"), 1600)
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" className="rail-btn rail-btn-primary" onClick={simulateAgain}>
          Simulate again
        </button>
        <button type="button" className="rail-btn" onClick={shareMatch}>
          {shareStatus === "shared" ? "Shared" : shareStatus === "copied" ? "Copied" : "Share match"}
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
