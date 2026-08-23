"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { track } from "@/lib/analytics"
import { buildMatchId, createSeed } from "@/lib/match-id"
import { simulateMany } from "@/lib/simulation"
import type { HistoricalTeam, MonteCarloResult } from "@/types"

export function MatchActions({
  home,
  away,
}: {
  home: HistoricalTeam
  away: HistoricalTeam
}) {
  const router = useRouter()
  const [running, setRunning] = useState(false)
  const [batch, setBatch] = useState<MonteCarloResult | null>(null)
  const [copied, setCopied] = useState(false)

  function simulateAgain() {
    track("simulate_again", { home: home.id, away: away.id })
    router.push(`/match/${buildMatchId(home.id, away.id, createSeed())}`)
  }

  function simulateHundred() {
    setRunning(true)
    track("simulate_100", { home: home.id, away: away.id })
    const result = simulateMany(home, away, 100, createSeed())
    setBatch(result)
    setRunning(false)
  }

  useEffect(() => {
    if (!batch) return
    document.getElementById("batch-result")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [batch])

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
      <div className="grid gap-3 sm:grid-cols-3">
        <button type="button" className="rail-btn rail-btn-primary" onClick={simulateAgain}>
          Simulate again
        </button>
        <button type="button" className="rail-btn" onClick={simulateHundred} disabled={running}>
          {running ? "Running…" : "100 Matches"}
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
      {batch ? (
        <div id="batch-result" className="result-anchor">
          <MonteCarloResults result={batch} />
        </div>
      ) : null}
    </div>
  )
}
