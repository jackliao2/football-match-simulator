"use client"

import { TeamCard } from "@/components/teams/TeamCard"
import { PagedReel } from "@/components/ui/PagedReel"
import type { HistoricalTeam } from "@/types"

const PAGE_SIZE = 3

export function TeamCardCarousel({
  teams,
  kind,
}: {
  teams: HistoricalTeam[]
  kind: "club" | "nation"
}) {
  const pages: HistoricalTeam[][] = []
  for (let i = 0; i < teams.length; i += PAGE_SIZE) {
    pages.push(teams.slice(i, i + PAGE_SIZE))
  }
  const noun = kind === "club" ? "clubs" : "nations"

  return (
    <PagedReel
      pageCount={pages.length}
      stageClassName="team-reel-grid"
      previousLabel={`Previous three ${noun}`}
      nextLabel={`Next three ${noun}`}
      dotLabel={(index) =>
        `Show ${noun} ${index * PAGE_SIZE + 1} to ${index * PAGE_SIZE + (pages[index]?.length ?? 0)}`
      }
    >
      {(page) => pages[page]!.map((team) => <TeamCard key={team.id} team={team} />)}
    </PagedReel>
  )
}
