import type { Metadata } from "next"
import { FEATURED_MATCHUPS, vsPath } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { PageHeader } from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Dream Football Matches — Who Would Win?",
  description:
    "Who would win: Barcelona 2009 vs Real Madrid 2017? Brazil 1970 vs Spain 2010? Current El Clásico? Simulate dream football matches. Model probabilities, not archive scores.",
  path: "/vs",
  keywords: [
    "who would win football",
    "dream football match",
    "barcelona vs real madrid",
    "prime barcelona vs prime real madrid",
    "brazil vs argentina",
    "football match simulator",
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
        lead="Who would win? Each page is a matchup you can simulate — legendary years and current squads. Percentages come from many seeded runs, not a single score presented as fact."
      />
      <div className="grid gap-2">
        {rows.map((row) =>
          row ? <MatchupRow key={row.href} href={row.href} home={row.home} away={row.away} /> : null,
        )}
      </div>
    </div>
  )
}
