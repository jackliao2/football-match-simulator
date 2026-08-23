"use client"

import { useEffect, useRef, useState } from "react"
import { PixelCrest } from "@/components/teams/PixelCrest"
import type { HistoricalTeam, MonteCarloResult, SimulatedMatch } from "@/types"

export function SimulationPlay({
  kind,
  home,
  away,
  match,
  batch,
  onDone,
}: {
  kind: "match" | "batch"
  home: HistoricalTeam
  away: HistoricalTeam
  match?: SimulatedMatch
  batch?: MonteCarloResult
  onDone: () => void
}) {
  if (kind === "batch" && batch) {
    return <BatchPlay home={home} away={away} batch={batch} onDone={onDone} />
  }
  if (kind === "match" && match) {
    return <MatchPlay home={home} away={away} match={match} onDone={onDone} />
  }
  return null
}

function MatchPlay({
  home,
  away,
  match,
  onDone,
}: {
  home: HistoricalTeam
  away: HistoricalTeam
  match: SimulatedMatch
  onDone: () => void
}) {
  const [minute, setMinute] = useState(0)
  const [homeGoals, setHomeGoals] = useState(0)
  const [awayGoals, setAwayGoals] = useState(0)
  const [line, setLine] = useState("Kick-off")

  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const goals = match.events
      .filter((event) => event.type === "goal")
      .sort((a, b) => a.minute - b.minute)
    let cursor = 0
    let clock = 0
    const id = window.setInterval(() => {
      clock = Math.min(90, clock + 6)
      setMinute(clock)
      while (cursor < goals.length && goals[cursor]!.minute <= clock) {
        const goal = goals[cursor]!
        if (goal.team === "home") setHomeGoals((value) => value + 1)
        else setAwayGoals((value) => value + 1)
        setLine(`${goal.displayMinute}  ${goal.player}`)
        cursor += 1
      }
      if (clock >= 90) {
        window.clearInterval(id)
        window.setTimeout(() => done.current(), 640)
      }
    }, 155)
    return () => window.clearInterval(id)
  }, [match])

  return (
    <section className="result-panel sim-play">
      <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold">Live simulation</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <SideMark team={home} />
        <div className="text-center">
          <div className="sim-score">
            {homeGoals}–{awayGoals}
          </div>
          <div className="sim-clock mt-1">{minute}′</div>
        </div>
        <SideMark team={away} flip />
      </div>
      <div className="sim-meter mt-4">
        <span style={{ width: `${(minute / 90) * 100}%` }} />
      </div>
      <p className="mt-3 truncate font-mono text-[12px] text-muted">{line}</p>
    </section>
  )
}

function BatchPlay({
  home,
  away,
  batch,
  onDone,
}: {
  home: HistoricalTeam
  away: HistoricalTeam
  batch: MonteCarloResult
  onDone: () => void
}) {
  const [done, setDone] = useState(0)
  const [line, setLine] = useState("0–0")

  const finish = useRef(onDone)
  finish.current = onDone

  useEffect(() => {
    const samples = batch.samples.length > 0 ? batch.samples : [{ home: 1, away: 1 }]
    let n = 0
    const id = window.setInterval(() => {
      n = Math.min(batch.runs, n + 4)
      setDone(n)
      const sample = samples[(n / 4 - 1) % samples.length] ?? samples[0]!
      setLine(`${sample.home}–${sample.away}`)
      if (n >= batch.runs) {
        window.clearInterval(id)
        window.setTimeout(() => finish.current(), 480)
      }
    }, 95)
    return () => window.clearInterval(id)
  }, [batch])

  return (
    <section className="result-panel sim-play">
      <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold">
        Simulating {batch.runs} matches
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <SideMark team={home} />
        <div className="text-center">
          <div className="sim-score">{line}</div>
          <div className="mt-1 font-mono text-sm tabular-nums text-gold">
            {done}/{batch.runs}
          </div>
        </div>
        <SideMark team={away} flip />
      </div>
      <div className="sim-meter mt-4">
        <span style={{ width: `${(done / batch.runs) * 100}%` }} />
      </div>
      <p className="mt-3 font-mono text-[12px] text-muted">Running seeded Poisson trials…</p>
    </section>
  )
}

function SideMark({ team, flip }: { team: HistoricalTeam; flip?: boolean }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 ${flip ? "flex-row-reverse text-right" : ""}`}>
      <PixelCrest clubId={team.clubId} size={36} />
      <span className="min-w-0">
        <span className="block truncate font-mono text-xs font-semibold">{team.clubName}</span>
        <span className="font-mono text-[10px] text-gold">{team.displaySeason}</span>
      </span>
    </div>
  )
}
