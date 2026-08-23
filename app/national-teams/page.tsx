import type { Metadata } from "next"
import Link from "next/link"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { nations } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Historical National Teams",
  description:
    "Simulate legendary World Cup squads: Brazil 1970, Brazil 2002, Argentina 1986, Argentina 2022, France 1998, Spain 2010, Germany 2014, Italy 2006 and the Netherlands 1974.",
  path: "/national-teams",
  keywords: [
    "world cup squads",
    "brazil 1970",
    "argentina 1986",
    "france 1998",
    "historical national teams",
    "football match simulator",
  ],
})

export default function NationalTeamsPage() {
  const sections = nations
    .map((nation) => ({ nation, teams: getTeamsByClub(nation.id) }))
    .filter((section) => section.teams.length > 0)

  return (
    <div className="grid gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Historical National Teams",
            url: absoluteUrl("/national-teams"),
            hasPart: sections.map((section) => ({
              "@type": "SportsTeam",
              name: section.nation.name,
              url: absoluteUrl(`/national-teams/${section.nation.id}`),
            })),
          }),
        }}
      />
      <PageHeader
        kicker="World Cup sides"
        title="Historical national teams"
        lead="World Cup squads as historical teams. Same engine as the clubs — pick a year, then simulate them against any era."
      >
        <Link href="/teams" className="font-mono text-sm text-gold hover:text-gold-2">
          Club teams →
        </Link>
      </PageHeader>
      {sections.map(({ nation, teams }) => (
        <section key={nation.id} className="grid gap-3">
          <h2 className="font-mono text-lg font-semibold tracking-tight">
            <Link href={`/national-teams/${nation.id}`} className="hover:text-gold">
              {nation.name}
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
