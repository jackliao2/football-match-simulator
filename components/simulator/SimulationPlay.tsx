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

export function SimulationStage({
  mode,
  home,
  away,
  progress,
  primary,
  secondary,
}: {
  mode: "match" | "batch" | "ai"
  home: HistoricalTeam
  away: HistoricalTeam
  progress: number
  primary: string
  secondary: string
}) {
  const ai = mode === "ai"
  const label = ai ? "Expert AI match lab" : mode === "batch" ? "100-match model" : "Live match simulation"
  return (
    <section
      className={`simulation-stage ${ai ? "simulation-stage-ai" : ""}`}
      aria-live="polite"
      aria-label={`${label}: ${home.clubName} versus ${away.clubName}`}
    >
      <header className="simulation-stage-head">
        <span>{label}</span>
        <span className={ai ? "text-[#9ee7ff]" : "text-muted"}>{ai ? "AI EXPERT ONLINE" : "MATCH ENGINE"}</span>
      </header>

      <div className="simulation-stage-body">
        <SideMark team={home} />
        <div className="simulation-lab" aria-hidden="true">
          <div className="simulation-pitch">
            <i className="simulation-scan" />
            <i className="simulation-ball" />
            {ai ? <><i className="simulation-node node-a" /><i className="simulation-node node-b" /><i className="simulation-node node-c" /></> : null}
          </div>
          <p className="simulation-primary">{primary}</p>
        </div>
        <SideMark team={away} flip />
      </div>

      <div className="simulation-progress" aria-hidden="true">
        <span style={{ width: `${Math.max(3, Math.min(100, progress))}%` }} />
      </div>
      <div className="simulation-stage-foot">
        <span>{secondary}</span>
        <span className="tabular-nums">{Math.round(progress)}%</span>
      </div>
    </section>
  )
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

  useEffect(() => {
    done.current = onDone
  }, [onDone])

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

  return <SimulationStage mode="match" home={home} away={away} progress={(minute / 90) * 100} primary={`${homeGoals}–${awayGoals}  ·  ${minute}′`} secondary={line} />
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

  useEffect(() => {
    finish.current = onDone
  }, [onDone])

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

  return <SimulationStage mode="batch" home={home} away={away} progress={(done / batch.runs) * 100} primary={`${line}  ·  ${done}/${batch.runs}`} secondary="Testing alternate nights, tactics and scoring patterns…" />
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
