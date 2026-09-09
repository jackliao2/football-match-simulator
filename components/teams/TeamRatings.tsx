import { RatingBar } from "@/components/ui/RatingBar"
import { teamPageCopy } from "@/lib/page-copy"
import type { HistoricalTeam } from "@/types"

export function TeamRatings({ team }: { team: HistoricalTeam }) {
  const copy = teamPageCopy(team)
  return (
    <section className="result-panel">
      <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
        {copy.ratingsHeading}
      </h2>
      <div className="grid gap-1 px-3 py-2">
        <RatingBar label="Attack" value={team.attackRating} />
        <RatingBar label="Midfield" value={team.midfieldRating} />
        <RatingBar label="Defence" value={team.defenseRating} />
        <RatingBar label="Goalkeeping" value={team.goalkeeperRating} />
        <RatingBar label="Chemistry" value={team.chemistryRating} />
        <RatingBar label="Overall" value={team.overallRating} />
      </div>
    </section>
  )
}
