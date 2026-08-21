import { RatingBar } from "@/components/ui/RatingBar"
import { PixelCard, PixelCardHeader } from "@/components/ui/PixelCard"
import type { HistoricalTeam } from "@/types"

export function TeamRatings({ team }: { team: HistoricalTeam }) {
  return (
    <PixelCard>
      <PixelCardHeader>Team Ratings</PixelCardHeader>
      <div className="space-y-3 p-4">
        <RatingBar label="Attack" value={team.attackRating} />
        <RatingBar label="Midfield" value={team.midfieldRating} />
        <RatingBar label="Defence" value={team.defenseRating} />
        <RatingBar label="Goalkeeping" value={team.goalkeeperRating} />
        <RatingBar label="Chemistry" value={team.chemistryRating} />
        <RatingBar label="Overall" value={team.overallRating} />
      </div>
    </PixelCard>
  )
}
