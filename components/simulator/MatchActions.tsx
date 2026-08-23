"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { SimulationPlay } from "@/components/simulator/SimulationPlay"
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
  const [play, setPlay] = useState<MonteCarloResult | null>(null)
  const [copied, setCopied] = useState(false)

  function simulateAgain() {
    track("simulate_again", { home: home.id, away: away.id })
    router.push(`/match/${buildMatchId(home.id, away.id, createSeed())}`)
  }

  function simulateHundred() {
    if (play) return
    setRunning(true)
    track("simulate_100", { home: home.id, away: away.id })
    const result = simulateMany(home, away, 100, createSeed())
    setBatch(null)
    setPlay(result)
    setRunning(false)
  }

  useEffect(() => {
    if (!batch && !play) return
    document.getElementById("batch-result")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [batch, play])

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
        <button type="button" className="rail-btn" onClick={simulateHundred} disabled={running || Boolean(play)}>
          {play ? "Running…" : "100 Matches"}
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
      {play ? (
        <div id="batch-result" className="result-anchor">
          <SimulationPlay
            kind="batch"
            home={home}
            away={away}
            batch={play}
            onDone={() => {
              setBatch(play)
              setPlay(null)
            }}
          />
        </div>
      ) : batch ? (
        <div id="batch-result" className="result-anchor">
          <MonteCarloResults result={batch} />
        </div>
      ) : null}
    </div>
  )
}
