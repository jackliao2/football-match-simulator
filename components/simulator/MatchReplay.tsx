"use client"

import { useState } from "react"
import { SimulationPlay } from "@/components/simulator/SimulationPlay"
import type { HistoricalTeam, SimulatedMatch } from "@/types"

export function MatchReplay({
  match,
  home,
  away,
}: {
  match: SimulatedMatch
  home: HistoricalTeam
  away: HistoricalTeam
}) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <SimulationPlay
        kind="match"
        home={home}
        away={away}
        match={match}
        onDone={() => setPlaying(false)}
      />
    )
  }

  return (
    <button type="button" className="rail-btn rail-btn-inline" onClick={() => setPlaying(true)}>
      Replay this night
    </button>
  )
}
