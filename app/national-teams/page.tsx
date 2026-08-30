import type { Metadata } from "next"
import Link from "next/link"
import { FilteredCatalog } from "@/components/teams/FilteredCatalog"
import { PageHeader } from "@/components/ui/PageHeader"
import { NATION_REGIONS, nations } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"
import { parseCatalogTrophy } from "@/lib/catalog-filters"
import { REGION_NOTES, catalogCounts } from "@/lib/page-copy"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { languageAlternates } from "@/lib/i18n"

const counts = catalogCounts()

export async function generateMetadata({
  searchParams,
}: PageProps<"/national-teams">): Promise<Metadata> {
  const params = await searchParams
  const trophy = parseCatalogTrophy("nations", params.trophy)
  const meta = pageMetadata({
    title: "National teams by tournament year",
    description: `${counts.nationSides} national sides — Brazil 1970, Argentina 1986, Spain 2010, France 2026 — World Cup and Euros XIs you can play against club sides from any era.`,
    path: "/national-teams",
    keywords: ["historical soccer national teams", "World Cup teams simulator", "international football simulator", "soccer match simulator"],
  })
  meta.alternates = { canonical: "/national-teams", languages: languageAlternates("/national-teams") }
  if (trophy !== "all") meta.robots = { index: false, follow: true }
  return meta
}

export default async function NationalTeamsPage({ searchParams }: PageProps<"/national-teams">) {
  const params = await searchParams
  const trophy = parseCatalogTrophy("nations", params.trophy)
  const sections = NATION_REGIONS.map((region) => ({
    id: region.id,
    label: region.label,
    note: REGION_NOTES[region.id],
    orgs: nations
      .filter((nation) => nation.region === region.id)
      .map((nation) => ({ id: nation.id, name: nation.name, detail: "National team", href: `/national-teams/${nation.id}`, teamIds: getTeamsByClub(nation.id).map((team) => team.id) }))
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
            name: "National teams by tournament year",
            url: absoluteUrl("/national-teams"),
            description: `${counts.nationSides} World Cup and Euros squads, plus 2026 national sides.`,
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
        kicker="World Cup sides"
        title="National teams, the years that stuck"
        lead={`${counts.nationSides} XIs from ${counts.nations} countries. Tournament years, not a roster of every friendly. A 2026 side can play 1970 Brazil; that is the point. Club pages live next door.`}
      >
        <Link href="/teams" className="font-mono text-sm text-gold hover:text-gold-2">
          Club teams instead →
        </Link>
      </PageHeader>
      <FilteredCatalog mode="nations" sections={sections} initialFilter={trophy} />
    </div>
  )
}
