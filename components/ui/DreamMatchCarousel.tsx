"use client"

import { useEffect, useState } from "react"
import { MatchupRow } from "@/components/ui/MatchupRow"
import type { HistoricalTeam } from "@/types"

const PAGE_SIZE = 3
const INTERVAL_MS = 7000

export type DreamMatchItem = {
  href: string
  home: HistoricalTeam
  away: HistoricalTeam
}

export function DreamMatchCarousel({ items }: { items: DreamMatchItem[] }) {
  const pages: DreamMatchItem[][] = []
  for (let i = 0; i < items.length; i += PAGE_SIZE) {
    pages.push(items.slice(i, i + PAGE_SIZE))
  }
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (pages.length < 2 || paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      setPage((current) => (current + 1) % pages.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [pages.length, paused])

  if (pages.length === 0) return null

  function go(delta: number) {
    setPage((current) => (current + delta + pages.length) % pages.length)
  }

  return (
    <div
      className="dream-reel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false)
      }}
    >
      <div className="dream-reel-stage" aria-live="polite">
        {pages[page]!.map((row) => (
          <MatchupRow key={row.href} href={row.href} home={row.home} away={row.away} />
        ))}
      </div>
      {pages.length > 1 ? (
        <div className="dream-reel-nav">
          <button type="button" className="dream-reel-arrow" aria-label="Previous three matchups" onClick={() => go(-1)}>
            ‹
          </button>
          <div className="dream-reel-dots">
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={index === page ? "is-on" : ""}
                aria-label={`Show matchups ${index * PAGE_SIZE + 1} to ${index * PAGE_SIZE + pages[index]!.length}`}
                aria-current={index === page ? "true" : undefined}
                onClick={() => setPage(index)}
              />
            ))}
          </div>
          <button type="button" className="dream-reel-arrow" aria-label="Next three matchups" onClick={() => go(1)}>
            ›
          </button>
        </div>
      ) : null}
    </div>
  )
}
