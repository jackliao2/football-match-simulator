import { teamStars, type StarPlayer } from "@/lib/stars"
import type { HistoricalTeam } from "@/types"

function OvrBar({ value }: { value: number }) {
  const blocks = 12
  const filled = Math.max(0, Math.min(blocks, Math.round((value / 99) * blocks)))
  return (
    <span aria-hidden className="flex min-w-[5rem] gap-[2px]">
      {Array.from({ length: blocks }, (_, i) => (
        <span key={i} className={`h-2.5 flex-1 ${i < filled ? "bg-home" : "bg-line"}`} />
      ))}
    </span>
  )
}

export function StarPlayers({
  team,
  stars,
  count = 8,
  variant = "full",
  title = "Star Players",
}: {
  team?: HistoricalTeam
  stars?: StarPlayer[]
  count?: number
  variant?: "full" | "compact" | "setup"
  title?: string
}) {
  const list = stars ?? (team ? teamStars(team, count) : [])
  if (list.length === 0) return null

  if (variant === "compact") {
    return (
      <ul className="mt-3 grid gap-1 font-mono text-xs">
        {list.map((player) => (
          <li key={player.id} className="flex items-center justify-between gap-2">
            <span className="truncate text-muted">
              <span className="text-text">{player.shortName}</span>
              <span className="ml-2 text-[10px] uppercase tracking-wider">{player.position}</span>
            </span>
            <span className="text-gold">{player.overall}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (variant === "setup") {
    return (
      <div className="border-2 border-line bg-panel-2">
        <div className="border-b border-line px-3 py-2 font-display text-[9px] uppercase tracking-[0.16em] text-gold">
          Stars · OVR
        </div>
        <ul>
          {list.map((player) => (
            <li
              key={player.id}
              className="grid grid-cols-[2.5rem_1fr_2.25rem] items-center gap-2 border-b border-line px-3 py-1.5 last:border-b-0 font-mono text-xs"
            >
              <span className="text-muted">{player.position}</span>
              <span className="truncate">{player.name}</span>
              <span className="text-right text-gold">{player.overall}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <section className="border-2 border-line bg-panel">
      <div className="flex items-center justify-between border-b-2 border-line bg-panel-2 px-4 py-3">
        <h2 className="font-display text-[10px] uppercase tracking-[0.16em] text-gold">{title}</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">OVR 综合</span>
      </div>
      <ul>
        {list.map((player, index) => (
          <li
            key={player.id}
            className="grid grid-cols-[1.5rem_2.75rem_1fr_2.5rem] items-center gap-2 border-b border-line px-4 py-2.5 last:border-b-0 sm:grid-cols-[1.5rem_3rem_1fr_2.5rem_minmax(5rem,1fr)] sm:gap-3"
          >
            <span className="font-mono text-xs text-muted">{index + 1}</span>
            <span className="font-mono text-xs text-muted">{player.position}</span>
            <span className="truncate text-sm">{player.name}</span>
            <span className="text-right font-mono text-base text-gold">{player.overall}</span>
            <span className="hidden sm:block">
              <OvrBar value={player.overall} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
