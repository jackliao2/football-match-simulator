"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PixelButton } from "@/components/ui/PixelButton"
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
        <PixelButton variant="primary" onClick={simulateAgain} className="w-full">
          Simulate Again
        </PixelButton>
        <PixelButton onClick={simulateHundred} disabled={running} className="w-full">
          {running ? "Running…" : "Simulate 100 Matches"}
        </PixelButton>
        <PixelButton variant="ghost" onClick={shareMatch} className="w-full">
          {copied ? "Copied" : "Share Match"}
        </PixelButton>
      </div>
      <PixelButton
        variant="ghost"
        className="w-full"
        onClick={() => router.push(`/match/${buildMatchId(away.id, home.id, createSeed())}`)}
      >
        Reverse fixture
      </PixelButton>
      {batch ? <MonteCarloResults result={batch} /> : null}
    </div>
  )
}
