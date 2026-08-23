import Link from "next/link"
import { PixelCrest } from "@/components/teams/PixelCrest"
import type { HistoricalTeam } from "@/types"

export function MatchupRow({
  href,
  home,
  away,
}: {
  href: string
  home: HistoricalTeam
  away: HistoricalTeam
}) {
  return (
    <Link
      href={href}
      className="result-panel grid gap-2 p-3 no-underline hover:border-gold sm:grid-cols-[1fr_auto_1fr] sm:items-center"
    >
      <span className="flex min-w-0 items-center gap-2">
        <PixelCrest clubId={home.clubId} size={28} />
        <span className="min-w-0">
          <span className="block truncate font-mono text-sm font-semibold">{home.clubName}</span>
          <span className="font-mono text-xs text-gold">{home.displaySeason}</span>
        </span>
      </span>
      <span className="font-display text-[10px] tracking-[0.3em] text-gold">VS</span>
      <span className="flex min-w-0 items-center gap-2 sm:justify-end">
        <span className="min-w-0 sm:text-right">
          <span className="block truncate font-mono text-sm font-semibold">{away.clubName}</span>
          <span className="font-mono text-xs text-gold">{away.displaySeason}</span>
        </span>
        <PixelCrest clubId={away.clubId} size={28} />
      </span>
    </Link>
  )
}
