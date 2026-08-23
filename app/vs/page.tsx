import type { Metadata } from "next"
import { FEATURED_MATCHUPS, vsPath } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { PageHeader } from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Dream Matches",
  description:
    "Simulate legendary dream matches: Barcelona 2008/09 vs Real Madrid 2016/17, Brazil 2002 vs Argentina 2022, and more historical football matchups. Model probabilities, not archive scores.",
  path: "/vs",
  keywords: [
    "dream football matches",
    "barcelona vs real madrid simulator",
    "brazil vs argentina simulator",
    "historical football matchup",
  ],
})

export default function VsIndexPage() {
  const rows = FEATURED_MATCHUPS.map(([homeId, awayId]) => {
    const home = getTeam(homeId)
    const away = getTeam(awayId)
    if (!home || !away) return null
    return { home, away, href: vsPath(homeId, awayId) }
  }).filter(Boolean)

  return (
    <div className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Dream Matches",
            url: absoluteUrl("/vs"),
            description: "Indexable historical football matchups for the match simulator.",
          }),
        }}
      />
      <PageHeader
        kicker="Matchups"
        title="Dream matches"
        lead="Each page is a historical matchup you can simulate. Percentages come from many seeded runs — not a single score presented as fact."
      />
      <div className="grid gap-2">
        {rows.map((row) =>
          row ? <MatchupRow key={row.href} href={row.href} home={row.home} away={row.away} /> : null,
        )}
      </div>
    </div>
  )
}
