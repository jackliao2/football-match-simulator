import Link from "next/link"
import type { HistoricalTeam } from "@/types"
import { teamPath } from "@/lib/paths"
import { teamSquad } from "@/lib/stars"
import { CompactSquad } from "@/components/teams/SquadPanel"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { TrophyBadges } from "@/components/teams/TrophyBadges"
import { OvrStamp } from "@/components/ui/OvrStamp"

export function TeamCard({ team }: { team: HistoricalTeam }) {
  return (
    <Link href={teamPath(team)} className="result-panel block p-3 no-underline hover:border-gold">
      <div className="flex items-start gap-3">
        <PixelCrest clubId={team.clubId} size={48} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-mono text-base font-semibold tracking-tight text-text">
            {team.clubName}
          </h3>
          <p className="font-mono text-sm text-gold">{team.displaySeason}</p>
          <p className="mt-0.5 truncate font-mono text-[11px] text-muted">{team.manager}</p>
          {team.trophies.length > 0 ? (
            <div className="mt-1.5">
              <TrophyBadges trophies={team.trophies} />
            </div>
          ) : null}
        </div>
        <OvrStamp value={team.overallRating} size="md" />
      </div>
      <div className="mt-3">
        <CompactSquad squad={teamSquad(team)} showBench={false} />
      </div>
    </Link>
  )
}

export function TeamBadge({
  clubId,
  code,
  name,
  season,
}: {
  clubId?: string
  code: string
  name: string
  season: string
}) {
  return (
    <div className="flex items-center gap-3">
      {clubId ? (
        <PixelCrest clubId={clubId} size={40} />
      ) : (
        <span className="border-2 border-line-hi bg-panel-2 px-2 py-2 font-display text-[10px] text-gold">
          [ {code} ]
        </span>
      )}
      <span>
        <span className="block font-display text-[11px] uppercase tracking-wide">{name}</span>
        <span className="font-mono text-sm text-muted">{season}</span>
      </span>
    </div>
  )
}
