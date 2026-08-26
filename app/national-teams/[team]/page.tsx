import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { getNation } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { allNationIds, getTeamsByClub } from "@/data/teams"
import { firstSentence, orgHubCopy } from "@/lib/page-copy"
import { teamPath } from "@/lib/paths"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return allNationIds().map((team) => ({ team }))
}

export async function generateMetadata({
  params,
}: PageProps<"/national-teams/[team]">): Promise<Metadata> {
  const { team } = await params
  const nation = getNation(team)
  if (!nation) return { title: "National Team" }
  const nationTeams = getTeamsByClub(team)
  const copy = orgHubCopy(nation, nationTeams)
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/national-teams/${team}`,
  })
}

export default async function NationPage({ params }: PageProps<"/national-teams/[team]">) {
  const { team } = await params
  const nation = getNation(team)
  const nationTeams = getTeamsByClub(team)
  if (!nation || nationTeams.length === 0) notFound()
  const prime = getPrimeEntity(team)
  const copy = orgHubCopy(nation, nationTeams)

  return (
    <div className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: copy.title,
            description: copy.description,
            url: absoluteUrl(`/national-teams/${team}`),
            hasPart: nationTeams.map((item) => ({
              "@type": "SportsTeam",
              name: `${item.clubName} ${item.displaySeason}`,
              url: absoluteUrl(teamPath(item)),
            })),
          }),
        }}
      />
      <PageHeader
        kicker={copy.kicker}
        title={copy.title}
        lead={copy.lead}
        crumbs={[{ href: "/national-teams", label: "National teams" }]}
      >
        {prime ? (
          <Link href={`/prime/${team}`} className="font-mono text-sm text-gold hover:text-gold-2">
            When was {nation.name}&apos;s prime? →
          </Link>
        ) : null}
      </PageHeader>
      <div className="season-sketches">
        {nationTeams.map((item) => (
          <p key={item.id}>
            <Link href={teamPath(item)}>{item.displaySeason}</Link>
            {" — "}
            {firstSentence(item.summary)} {item.manager}, {item.formation}, OVR {item.overallRating}.
          </p>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {nationTeams.map((item) => (
          <TeamCard key={item.id} team={item} />
        ))}
      </div>
    </div>
  )
}
