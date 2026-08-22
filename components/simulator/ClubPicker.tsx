"use client"

import { useEffect } from "react"
import { PixelCrest } from "@/components/teams/PixelCrest"

export interface ClubPick {
  clubId: string
  clubName: string
  overallRating: number
}

export function ClubPicker({
  clubs,
  nations,
  currentId,
  onSelect,
  onClose,
}: {
  clubs: ClubPick[]
  nations: ClubPick[]
  currentId: string
  onSelect: (clubId: string) => void
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[88dvh] w-full max-w-3xl overflow-y-auto border-2 border-gold bg-panel pixel-border"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-line bg-panel-2 px-4 py-3">
          <span className="font-display text-[10px] uppercase tracking-[0.18em] text-gold">
            Select team
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-display text-[10px] uppercase tracking-widest text-muted hover:text-gold"
          >
            Close
          </button>
        </div>
        <Group title="Clubs" items={clubs} currentId={currentId} onSelect={onSelect} />
        {nations.length > 0 ? (
          <Group title="National teams" items={nations} currentId={currentId} onSelect={onSelect} />
        ) : null}
      </div>
    </div>
  )
}

function Group({
  title,
  items,
  currentId,
  onSelect,
}: {
  title: string
  items: ClubPick[]
  currentId: string
  onSelect: (clubId: string) => void
}) {
  return (
    <section className="p-4">
      <h3 className="mb-3 font-display text-[9px] uppercase tracking-[0.18em] text-muted">{title}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item) => {
          const active = item.clubId === currentId
          return (
            <button
              key={item.clubId}
              type="button"
              onClick={() => onSelect(item.clubId)}
              className={`flex items-center gap-3 border-2 px-3 py-3 text-left transition-colors ${
                active
                  ? "border-gold bg-panel-2"
                  : "border-line bg-ink/40 hover:border-line-hi"
              }`}
            >
              <PixelCrest clubId={item.clubId} size={40} />
              <span className="min-w-0">
                <span className="block truncate font-display text-[9px] uppercase tracking-wide text-text">
                  {item.clubName}
                </span>
                <span className="font-display text-lg text-gold">{item.overallRating}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
