"use client"

import { useState } from "react"
import Link from "next/link"
import { MatchResult } from "@/components/simulator/MatchResult"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { SimulationPlay } from "@/components/simulator/SimulationPlay"
import { createSeed } from "@/lib/match-id"
import { copyOrShare, matchShareCopy } from "@/lib/share"
import { absoluteUrl } from "@/lib/site"
import { simulateMany, simulateMatch } from "@/lib/simulation"
import { track } from "@/lib/analytics"
import type { HistoricalTeam, MonteCarloResult, SimulatedMatch } from "@/types"

export function QuickMatch({
  home,
  away,
}: {
  home: HistoricalTeam
  away: HistoricalTeam
}) {
  const [play, setPlay] = useState<
    | { kind: "match"; match: SimulatedMatch }
    | { kind: "batch"; batch: MonteCarloResult }
    | null
  >(null)
  const [match, setMatch] = useState<SimulatedMatch | null>(null)
  const [batch, setBatch] = useState<MonteCarloResult | null>(null)
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared">("idle")

  function simulateOnce() {
    if (play) return
    track("simulator_started", { home: home.id, away: away.id, source: "quick" })
    setMatch(null)
    setPlay({ kind: "match", match: simulateMatch(home, away, createSeed()) })
  }

  function runHundred() {
    if (play) return
    track("simulate_100", { home: home.id, away: away.id, source: "quick" })
    setPlay({ kind: "batch", batch: simulateMany(home, away, 100, `quick:${home.id}|${away.id}|${Date.now()}`) })
  }

  function finishPlay() {
    if (play?.kind === "match") {
      setMatch(play.match)
      track("simulation_completed", { mode: "single", home: home.id, away: away.id })
    } else if (play?.kind === "batch") {
      setBatch(play.batch)
      track("simulation_completed", { mode: "batch", home: home.id, away: away.id })
    }
    setPlay(null)
  }

  async function shareMatch() {
    if (!match) return
    const url = absoluteUrl(`/match/${match.id}`)
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
      window.setTimeout(() => setShareStatus("idle"), 1600)
    }
  }

  return (
    <section className="grid gap-3">
      <div>
        <p className="page-kicker">Play this matchup</p>
        <h2 className="section-title mt-1">
          {home.clubName} {home.displaySeason} vs {away.clubName} {away.displaySeason}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="rail-btn rail-btn-primary rail-btn-inline" disabled={Boolean(play)} onClick={simulateOnce}>
          {play?.kind === "match" ? "Playing…" : "Simulate"}
        </button>
        <button type="button" className="rail-btn rail-btn-inline" disabled={Boolean(play)} onClick={runHundred}>
          {play?.kind === "batch" ? "Running 100…" : "100 matches"}
        </button>
        <Link href={`/simulate?home=${home.id}&away=${away.id}`} className="rail-btn rail-btn-inline">
          Change opponent
        </Link>
      </div>
      {play?.kind === "match" ? (
        <SimulationPlay kind="match" home={home} away={away} match={play.match} onDone={finishPlay} />
      ) : play?.kind === "batch" ? (
        <SimulationPlay kind="batch" home={home} away={away} batch={play.batch} onDone={finishPlay} />
      ) : null}
      {match && !play ? (
        <div className="grid gap-3">
          <MatchResult match={match} home={home} away={away} />
          <button type="button" className="rail-btn rail-btn-inline justify-self-start" onClick={shareMatch}>
            {shareStatus === "shared" ? "Shared" : shareStatus === "copied" ? "Copied" : "Copy link"}
          </button>
        </div>
      ) : null}
      {batch && !play ? <MonteCarloResults result={batch} /> : null}
    </section>
  )
}
