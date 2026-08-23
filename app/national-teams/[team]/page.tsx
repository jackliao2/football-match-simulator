import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { getNation } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { allNationIds, getTeamsByClub } from "@/data/teams"
import { clubHubKeywords, pageMetadata } from "@/lib/seo"

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
  const years = nationTeams.map((item) => item.displaySeason).join(", ")
  return pageMetadata({
    title: `${nation.name} Squads — ${years}`,
    description: `Explore ${nation.name} squads (${years}): World Cup sides and the current national team. Lineup, formation and ratings, then simulate them against football teams from any era.`,
    path: `/national-teams/${team}`,
    keywords: clubHubKeywords(nation.name, team, nationTeams),
  })
}

export default async function NationPage({ params }: PageProps<"/national-teams/[team]">) {
  const { team } = await params
  const nation = getNation(team)
  const nationTeams = getTeamsByClub(team)
  if (!nation || nationTeams.length === 0) notFound()
  const prime = getPrimeEntity(team)

  return (
    <div className="grid gap-6">
      <PageHeader
        kicker="National squads"
        title={`${nation.name} squads`}
        lead={`${nation.name} sides in the simulator, newest first. Open a year for the starting XI, formation, ratings and a one-click football match.`}
        crumbs={[{ href: "/national-teams", label: "National teams" }]}
      >
        {prime ? (
          <Link href={`/prime/${team}`} className="font-mono text-sm text-gold hover:text-gold-2">
            When was {nation.name}&apos;s prime? →
          </Link>
        ) : null}
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {nationTeams.map((item) => (
          <TeamCard key={item.id} team={item} />
        ))}
      </div>
    </div>
  )
}
