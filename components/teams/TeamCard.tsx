import Link from "next/link"
import type { HistoricalTeam } from "@/types"
import { teamPath } from "@/lib/paths"

export function TeamCard({ team }: { team: HistoricalTeam }) {
  return (
    <Link
      href={teamPath(team)}
      className="block border-2 border-line bg-panel p-4 no-underline shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-x-px hover:-translate-y-px hover:border-gold"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="border border-line-hi px-2 py-1 font-display text-[10px] text-gold">
          [ {team.clubCode} ]
        </span>
        <span className="font-mono text-xs text-gold">{team.overallRating}</span>
      </div>
      <h3 className="mt-3 font-display text-[11px] uppercase leading-relaxed tracking-wide text-text">
        {team.clubName}
      </h3>
      <p className="mt-1 font-mono text-sm text-muted">{team.displaySeason}</p>
      <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted">{team.styleTags.slice(0, 3).join(" · ")}</p>
    </Link>
  )
}

export function TeamBadge({
  code,
  name,
  season,
}: {
  code: string
  name: string
  season: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="border-2 border-line-hi bg-panel-2 px-2 py-2 font-display text-[10px] text-gold">
        [ {code} ]
      </span>
      <span>
        <span className="block font-display text-[11px] uppercase tracking-wide">{name}</span>
        <span className="font-mono text-sm text-muted">{season}</span>
      </span>
    </div>
  )
}
