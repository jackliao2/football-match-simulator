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
        <RatingBar label={`${team.displaySeason} attack`} value={team.attackRating} />
        <RatingBar label={`${team.displaySeason} midfield`} value={team.midfieldRating} />
        <RatingBar label={`${team.displaySeason} defence`} value={team.defenseRating} />
        <RatingBar label={`${team.displaySeason} keeper`} value={team.goalkeeperRating} />
        <RatingBar label={`${team.displaySeason} chemistry`} value={team.chemistryRating} />
        <RatingBar label={`${team.displaySeason} overall`} value={team.overallRating} />
      </div>
    </section>
  )
}
