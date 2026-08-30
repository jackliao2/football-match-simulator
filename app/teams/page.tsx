import type { Metadata } from "next"
import Link from "next/link"
import { FilteredCatalog } from "@/components/teams/FilteredCatalog"
import { PageHeader } from "@/components/ui/PageHeader"
import { LEAGUES, clubs } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"
import { LEAGUE_NOTES, catalogCounts } from "@/lib/page-copy"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { languageAlternates } from "@/lib/i18n"

const counts = catalogCounts()

export const metadata: Metadata = pageMetadata({
  title: "Club squads by season",
  description: `${counts.clubSides} playable club sides across ${counts.clubs} clubs — Guardiola’s Barça, Istanbul, the Invincibles and the 2025/26 season. Open a year and run the match.`,
  path: "/teams",
  keywords: ["historical soccer teams", "legendary football squads", "soccer teams by season", "football match simulator"],
})
metadata.alternates = { canonical: "/teams", languages: languageAlternates("/teams") }

export default function TeamsPage() {
  const sections = LEAGUES.map((league) => ({
    id: league.id,
    label: league.label,
    note: LEAGUE_NOTES[league.id],
    orgs: clubs
      .filter((club) => club.league === league.id)
      .map((club) => ({ id: club.id, name: club.name, detail: club.city, href: `/teams/${club.id}`, teamIds: getTeamsByClub(club.id).map((team) => team.id) }))
      .filter((section) => section.teamIds.length > 0),
  })).filter((section) => section.orgs.length > 0)

  return (
    <div className="grid gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Club squads by season",
            description: `${counts.clubSides} historical and current club squads for the football and soccer match simulator.`,
            url: absoluteUrl("/teams"),
            hasPart: sections.flatMap((section) =>
              section.orgs.map((item) => ({
                "@type": "SportsTeam",
                name: item.name,
                url: absoluteUrl(item.href),
              })),
            ),
          }),
        }}
      />
      <PageHeader
        kicker="Club database"
        title="Club squads, by the year that mattered"
        lead={`${counts.clubSides} sides, ${counts.clubs} clubs. Grouped by country so you can find Forest next to United, Athletic next to Madrid. The 2025/26 dataset sits next to the vintage pages as a named season, not a claim that it is live.`}
      >
        <Link href="/national-teams" className="font-mono text-sm text-gold hover:text-gold-2">
          National teams instead →
        </Link>
      </PageHeader>
      <FilteredCatalog mode="clubs" sections={sections} />
    </div>
  )
}
