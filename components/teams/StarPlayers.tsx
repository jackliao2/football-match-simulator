import { PixelFlag } from "@/components/teams/PixelFlag"
import { StatStrip, StatTip } from "@/components/teams/StatTip"
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
    <section className="result-panel overflow-hidden border-2 border-gold/35 shadow-[6px_6px_0_#000]">
      <div className="flex items-end justify-between gap-3 border-b border-white/10 bg-[radial-gradient(circle_at_85%_0%,rgba(212,180,90,0.12),transparent_45%)] px-4 py-3">
        <h2 className="font-display text-[8px] uppercase tracking-[0.18em] text-gold">{title}</h2>
        <span className="font-mono text-[9px] text-muted">Hover or tap for player attributes</span>
      </div>
      <ul className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((player, index) => (
          <StarProfile key={player.id} player={player} rank={index + 1} />
        ))}
      </ul>
    </section>
  )
}

function StarProfile({ player, rank }: { player: StarPlayer; rank: number }) {
  return (
    <li className="group relative min-w-0 bg-[#0b100b] p-3 outline-none transition-colors hover:bg-[#111811] focus-within:bg-[#111811]" tabIndex={0}>
      <div className="flex items-center gap-3">
        <span className="font-display text-[8px] text-gold/55">{String(rank).padStart(2, "0")}</span>
        <PixelFlag code={player.nation} size={18} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-brand text-sm font-semibold tracking-wide text-text">{player.name}</span>
          <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{player.position} · {player.nation}</span>
        </span>
        <span className="text-right">
          <strong className="block font-mono text-xl leading-none text-gold">{player.overall}</strong>
          <small className="font-display text-[6px] tracking-[0.16em] text-muted">PEAK</small>
        </span>
      </div>
      <div className="mt-3 border-t border-white/10 pt-2 opacity-70 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <StatStrip stats={player.stats} />
      </div>
    </li>
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
