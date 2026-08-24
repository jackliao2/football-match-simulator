"use client"

import { useEffect, useRef, useState } from "react"
import { eraGlow } from "@/data/trophies"
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
  onChange,
}: {
  seasons: EraOption[]
  value: EraOption
  align?: "left" | "right"
  onChange: (teamId: string) => void
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const glow = eraGlow(value.team.trophies)
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
        className={`era-select-btn${open ? " is-open" : ""}${glow ? " is-cup" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="era-select-kicker">{current ? "Now" : "Era"}</span>
        <span className="era-select-year">{value.displaySeason}</span>
        {glow ? <span className="trophy-mark" aria-hidden /> : null}
        <span className="era-select-caret" aria-hidden>
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open ? (
        <ul className="era-select-menu" role="listbox">
          {seasons.map((season) => {
            const active = season.id === value.id
            const cup = eraGlow(season.team.trophies)
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
                    {now ? "Now" : season.team.manager}
                  </span>
                  {cup ? <span className="trophy-mark" aria-hidden /> : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
