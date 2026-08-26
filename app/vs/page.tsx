import type { Metadata } from "next"
import { FEATURED_MATCHUPS, vsPath } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { PageHeader } from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Dream matches you can actually play",
  description:
    "Barcelona 2008/09 vs Madrid 2016/17, Brazil 1970 vs Spain 2010, and the rest of the arguments. Each page runs hundreds of seeds. No archive score pretending to be a result.",
  path: "/vs",
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
            description: "Hypothetical football matchups. Percentages from many seeded runs, not archive scores.",
          }),
        }}
      />
      <PageHeader
        kicker="Matchups"
        title="Dream matches"
        lead="These are fights that never happened, or happened in a different year. Open a row, look at the 400-run table, then play a single match if you want a night’s scoreline."
      />
      <div className="grid gap-2">
        {rows.map((row) =>
          row ? <MatchupRow key={row.href} href={row.href} home={row.home} away={row.away} /> : null,
        )}
      </div>
    </div>
  )
}
