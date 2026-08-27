import type { Metadata } from "next"
import Link from "next/link"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { LEAGUES, clubs } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"
import { LEAGUE_NOTES, catalogCounts } from "@/lib/page-copy"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

const counts = catalogCounts()

export const metadata: Metadata = pageMetadata({
  title: "Club squads by season",
  description: `${counts.clubSides} playable club sides across ${counts.clubs} clubs — Guardiola’s Barça, Istanbul, the Invincibles, plus 2025/26 squads. Not a shirt shop. Open a year and run the match.`,
  path: "/teams",
  keywords: ["historical soccer teams", "legendary football squads", "soccer teams by season", "football match simulator"],
})

export default function TeamsPage() {
  const sections = LEAGUES.map((league) => ({
    league,
    clubs: clubs
      .filter((club) => club.league === league.id)
      .map((club) => ({ club, teams: getTeamsByClub(club.id) }))
      .filter((section) => section.teams.length > 0),
  })).filter((section) => section.clubs.length > 0)

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
              section.clubs.map((item) => ({
                "@type": "SportsTeam",
                name: item.club.name,
                url: absoluteUrl(`/teams/${item.club.id}`),
              })),
            ),
          }),
        }}
      />
      <PageHeader
        kicker="Club database"
        title="Club squads, by the year that mattered"
        lead={`${counts.clubSides} sides, ${counts.clubs} clubs. Grouped by country so you can find Forest next to United, Athletic next to Madrid. Current 2025/26 XIs are in here too — they sit next to the vintage pages, not in a separate toy league.`}
      >
        <Link href="/national-teams" className="font-mono text-sm text-gold hover:text-gold-2">
          National teams instead →
        </Link>
      </PageHeader>
      {sections.map(({ league, clubs: leagueClubs }) => (
        <section key={league.id} className="grid gap-4">
          <h2 className="font-display text-xs tracking-[0.18em] text-gold uppercase">{league.label}</h2>
          <p className="catalog-note">{LEAGUE_NOTES[league.id]}</p>
          {leagueClubs.map(({ club, teams }) => (
            <div key={club.id} className="grid gap-3">
              <h3 className="font-mono text-lg font-semibold tracking-tight">
                <Link href={`/teams/${club.id}`} className="hover:text-gold">
                  {club.name}
                </Link>
                <span className="ml-2 font-mono text-xs font-normal text-muted">
                  {club.city} · {teams.map((team) => team.displaySeason).join(" / ")}
                </span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
