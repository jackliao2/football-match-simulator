"use client"

import { useEffect, useState, type ReactNode } from "react"

const INTERVAL_MS = 7000

export function PagedReel({
  pageCount,
  previousLabel,
  nextLabel,
  dotLabel,
  stageClassName = "dream-reel-stage",
  children,
}: {
  pageCount: number
  previousLabel: string
  nextLabel: string
  dotLabel: (index: number) => string
  stageClassName?: string
  children: (page: number) => ReactNode
}) {
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (pageCount < 2 || paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      setPage((current) => (current + 1) % pageCount)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [pageCount, paused])

  if (pageCount <= 0) return null

  const current = ((page % pageCount) + pageCount) % pageCount

  function go(delta: number) {
    setPage((value) => (value + delta + pageCount) % pageCount)
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
      <div className={stageClassName} aria-live="polite">
        {children(current)}
      </div>
      {pageCount > 1 ? (
        <div className="dream-reel-nav">
          <button type="button" className="dream-reel-arrow" aria-label={previousLabel} onClick={() => go(-1)}>
            ‹
          </button>
          <div className="dream-reel-dots">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={index === current ? "is-on" : ""}
                aria-label={dotLabel(index)}
                aria-current={index === current ? "true" : undefined}
                onClick={() => setPage(index)}
              />
            ))}
          </div>
          <button type="button" className="dream-reel-arrow" aria-label={nextLabel} onClick={() => go(1)}>
            ›
          </button>
        </div>
      ) : null}
    </div>
  )
}
