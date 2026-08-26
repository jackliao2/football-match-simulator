"use client"

import { MatchupRow } from "@/components/ui/MatchupRow"
import { PagedReel } from "@/components/ui/PagedReel"
import type { HistoricalTeam } from "@/types"

const PAGE_SIZE = 3

export type DreamMatchItem = {
  href: string
  home: HistoricalTeam
  away: HistoricalTeam
}

export function DreamMatchCarousel({ items }: { items: DreamMatchItem[] }) {
  const pages: DreamMatchItem[][] = []
  for (let i = 0; i < items.length; i += PAGE_SIZE) {
    pages.push(items.slice(i, i + PAGE_SIZE))
  }

  return (
    <PagedReel
      pageCount={pages.length}
      previousLabel="Previous three matchups"
      nextLabel="Next three matchups"
      dotLabel={(index) =>
        `Show matchups ${index * PAGE_SIZE + 1} to ${index * PAGE_SIZE + (pages[index]?.length ?? 0)}`
      }
    >
      {(page) =>
        pages[page]!.map((row) => (
          <MatchupRow key={row.href} href={row.href} home={row.home} away={row.away} />
        ))
      }
    </PagedReel>
  )
}
