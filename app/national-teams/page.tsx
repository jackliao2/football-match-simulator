import type { Metadata } from "next"
import Link from "next/link"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { NATION_REGIONS, nations } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Historical National Teams",
  description:
    "Simulate national teams from any era: Brazil 1970, Argentina 1986, England 1966, Spain 2010, plus 2026 current squads. World Cup and Euros sides as historical teams you can play.",
  path: "/national-teams",
  keywords: [
    "world cup squads",
    "world cup simulator",
    "brazil 1970",
    "argentina 1986",
    "england 1966",
    "spain 2010",
    "france 1998",
    "hungary 1954",
    "portugal 2016",
    "croatia 2018",
    "brazil 2026 squad",
    "historical national teams",
    "football match simulator",
  ],
})

export default function NationalTeamsPage() {
  const sections = NATION_REGIONS.map((region) => ({
    region,
    nations: nations
      .filter((nation) => nation.region === region.id)
      .map((nation) => ({ nation, teams: getTeamsByClub(nation.id) }))
      .filter((section) => section.teams.length > 0),
  })).filter((section) => section.nations.length > 0)

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
            hasPart: sections.flatMap((section) =>
              section.nations.map((item) => ({
                "@type": "SportsTeam",
                name: item.nation.name,
                url: absoluteUrl(`/national-teams/${item.nation.id}`),
              })),
            ),
          }),
        }}
      />
      <PageHeader
        kicker="World Cup sides"
        title="Historical national teams"
        lead="World Cup and Euros squads grouped by region, plus 2026 current sides. Same engine as the clubs — pick a year, then simulate them against any era."
      >
        <Link href="/teams" className="font-mono text-sm text-gold hover:text-gold-2">
          Club teams →
        </Link>
      </PageHeader>
      {sections.map(({ region, nations: regionNations }) => (
        <section key={region.id} className="grid gap-4">
          <h2 className="font-display text-xs tracking-[0.18em] text-gold uppercase">{region.label}</h2>
          {regionNations.map(({ nation, teams }) => (
            <div key={nation.id} className="grid gap-3">
              <h3 className="font-mono text-lg font-semibold tracking-tight">
                <Link href={`/national-teams/${nation.id}`} className="hover:text-gold">
                  {nation.name}
                </Link>
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
