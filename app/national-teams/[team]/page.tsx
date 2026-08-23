import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { getNation } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { allNationIds, getTeamsByClub } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"

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
  const years = getTeamsByClub(team)
    .map((item) => item.displaySeason)
    .join(", ")
  return pageMetadata({
    title: `${nation.name} Historical Squads`,
    description: `Explore legendary ${nation.name} World Cup squads${years ? ` (${years})` : ""}. Lineup, formation and ratings, then simulate them against football teams from any era.`,
    path: `/national-teams/${team}`,
    keywords: [`${nation.name} world cup squad`, `${nation.name} historical team`, "football match simulator"],
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
        title={`${nation.name} historical squads`}
        lead={`Historical ${nation.name} sides in the simulator. Open a tournament year for the starting XI, formation, ratings and a one-click match.`}
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
