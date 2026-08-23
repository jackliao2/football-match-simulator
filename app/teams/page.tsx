import type { Metadata } from "next"
import Link from "next/link"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { clubs } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Historical Football Teams",
  description:
    "Browse historical football squads by club and season — Barcelona, Real Madrid, Chelsea, Ajax, Tottenham, PSG, Napoli, Juventus, Dortmund and more. Open a squad, then simulate a match.",
  path: "/teams",
  keywords: [
    "historical football teams",
    "legendary football squads",
    "barcelona 2008/09 squad",
    "chelsea 2004/05 squad",
    "ajax 1995 squad",
    "football match simulator teams",
  ],
})

export default function TeamsPage() {
  const sections = clubs
    .map((club) => ({ club, teams: getTeamsByClub(club.id) }))
    .filter((section) => section.teams.length > 0)

  return (
    <div className="grid gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Historical Football Teams",
            description:
              "Legendary club squads by season for the football match simulator.",
            url: absoluteUrl("/teams"),
            hasPart: sections.map((section) => ({
              "@type": "SportsTeam",
              name: section.club.name,
              url: absoluteUrl(`/teams/${section.club.id}`),
            })),
          }),
        }}
      />
      <PageHeader
        kicker="Club database"
        title="Historical football teams"
        lead="Legendary club squads by season. Open a team for the starting XI, formation and ratings, then simulate a match against any era."
      >
        <Link href="/national-teams" className="font-mono text-sm text-gold hover:text-gold-2">
          World Cup national teams →
        </Link>
      </PageHeader>
      {sections.map(({ club, teams }) => (
        <section key={club.id} className="grid gap-3">
          <h2 className="font-mono text-lg font-semibold tracking-tight">
            <Link href={`/teams/${club.id}`} className="hover:text-gold">
              {club.name}
            </Link>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
