import type { Metadata } from "next"
import Link from "next/link"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { NATION_REGIONS, nations } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"
import { REGION_NOTES, catalogCounts } from "@/lib/page-copy"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { languageAlternates } from "@/lib/i18n"

const counts = catalogCounts()

export const metadata: Metadata = pageMetadata({
  title: "National teams by tournament year",
  description: `${counts.nationSides} national sides — Brazil 1970, Argentina 1986, Spain 2010, France 2026 — World Cup and Euros XIs you can play against club sides from any era.`,
  path: "/national-teams",
  keywords: ["historical soccer national teams", "World Cup teams simulator", "international football simulator", "soccer match simulator"],
})
metadata.alternates = { canonical: "/national-teams", languages: languageAlternates("/national-teams") }

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
            name: "National teams by tournament year",
            url: absoluteUrl("/national-teams"),
            description: `${counts.nationSides} World Cup and Euros squads, plus 2026 national sides.`,
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
        title="National teams, the years that stuck"
        lead={`${counts.nationSides} XIs from ${counts.nations} countries. Tournament years, not a roster of every friendly. A 2026 side can play 1970 Brazil; that is the point. Club pages live next door.`}
      >
        <Link href="/teams" className="font-mono text-sm text-gold hover:text-gold-2">
          Club teams instead →
        </Link>
      </PageHeader>
      {sections.map(({ region, nations: regionNations }) => (
        <section key={region.id} className="grid gap-4">
          <h2 className="font-display text-xs tracking-[0.18em] text-gold uppercase">{region.label}</h2>
          <p className="catalog-note">{REGION_NOTES[region.id]}</p>
          {regionNations.map(({ nation, teams }) => (
            <div key={nation.id} className="grid gap-3">
              <h3 className="font-mono text-lg font-semibold tracking-tight">
                <Link href={`/national-teams/${nation.id}`} className="hover:text-gold">
                  {nation.name}
                </Link>
                <span className="ml-2 font-mono text-xs font-normal text-muted">
                  {teams.map((team) => team.displaySeason).join(" / ")}
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
