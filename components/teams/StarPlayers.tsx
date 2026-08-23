import { PixelFlag } from "@/components/teams/PixelFlag"
import { StatTip } from "@/components/teams/StatTip"
import { teamStars, type StarPlayer } from "@/lib/stars"
import type { HistoricalTeam } from "@/types"

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
      <ul className="mt-3 grid gap-1">
        {list.map((player) => (
          <StarRow key={player.id} player={player} compact />
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
            <StarRow key={player.id} player={player} />
          ))}
        </ul>
      </div>
    )
  }

  return (
    <section className="result-panel">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="font-mono text-lg font-semibold tracking-tight">{title}</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          OVR · hover stats
        </span>
      </div>
      <ul>
        {list.map((player, index) => (
          <StarRow key={player.id} player={player} rank={index + 1} />
        ))}
      </ul>
    </section>
  )
}

function StarRow({
  player,
  rank,
  compact,
}: {
  player: StarPlayer
  rank?: number
  compact?: boolean
}) {
  if (compact) {
    return (
      <li className="relative z-0 flex items-center gap-2 hover:z-20 focus-within:z-20">
        <PixelFlag code={player.nation} size={14} />
        <span className="w-7 shrink-0 font-mono text-[10px] text-muted">{player.position}</span>
        <span className="min-w-0 flex-1 truncate text-xs">{player.shortName}</span>
        <StatTip overall={player.overall} stats={player.stats} size="sm" />
      </li>
    )
  }

  return (
    <li className="relative z-0 grid grid-cols-[1.6rem_1.15rem_2.4rem_1fr_2.4rem] items-center gap-2 border-b border-line/80 px-3 py-2.5 last:border-b-0 hover:z-20 hover:bg-panel-2/80 focus-within:z-20 sm:grid-cols-[1.75rem_1.25rem_2.6rem_1fr_2.6rem] sm:px-4">
      {rank != null ? (
        <span className="font-mono text-[11px] text-muted">{String(rank).padStart(2, "0")}</span>
      ) : (
        <span />
      )}
      <PixelFlag code={player.nation} size={16} />
      <span className="font-mono text-[10px] tracking-wider text-gold">{player.position}</span>
      <span className="truncate text-sm">{player.name}</span>
      <span className="text-right">
        <StatTip overall={player.overall} stats={player.stats} size="md" />
      </span>
    </li>
  )
}
