"use client"

import { useEffect, useRef, useState } from "react"
import { isCurrentSquad } from "@/lib/seo"
import type { HistoricalTeam } from "@/types"

export type EraOption = {
  id: string
  displaySeason: string
  team: HistoricalTeam
}

export function EraSelect({
  seasons,
  value,
  align = "left",
  labels = { latest: "Latest squad", season: "Season" },
  onChange,
}: {
  seasons: EraOption[]
  value: EraOption
  align?: "left" | "right"
  labels?: { latest: string; season: string }
  onChange: (teamId: string) => void
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const cups = value.team.trophies
  const current = isCurrentSquad(value.team)

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <div ref={root} className={`era-select ${align === "right" ? "is-right" : ""}`}>
      <button
        type="button"
        className={`era-select-btn${open ? " is-open" : ""}${cups.length > 0 ? " is-cup" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((open) => !open)}
      >
        <span className="era-select-kicker">{current ? labels.latest : labels.season}</span>
        <span className="era-select-year">{value.displaySeason}</span>
        <Cups trophies={cups} />
        <span className="era-select-caret" aria-hidden>
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open ? (
        <ul className="era-select-menu" role="listbox">
          {seasons.map((season) => {
            const active = season.id === value.id
            const now = isCurrentSquad(season.team)
            return (
              <li key={season.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`era-select-item${active ? " is-on" : ""}`}
                  onClick={() => {
                    onChange(season.id)
                    setOpen(false)
                  }}
                >
                  <span className="era-select-item-year">{season.displaySeason}</span>
                  <span className="era-select-item-meta">
                    {now ? labels.latest : season.team.manager}
                  </span>
                  <Cups trophies={season.team.trophies} />
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

function Cups({ trophies }: { trophies: HistoricalTeam["trophies"] }) {
  if (trophies.length === 0) return null
  return (
    <span className="era-cups">
      {trophies.map((trophy) => (
        <span key={trophy.code}>{trophy.label}</span>
      ))}
    </span>
  )
}
