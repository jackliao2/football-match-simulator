import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TeamCard } from "@/components/teams/TeamCard"
import { PixelButton } from "@/components/ui/PixelButton"
import { getNation } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { allNationIds, getTeamsByClub } from "@/data/teams"

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
  return {
    title: `${nation.name} Historical Squads`,
    description: `Explore legendary ${nation.name} World Cup squads, including lineup, formation and team ratings, then simulate them against football teams from any era.`,
    alternates: { canonical: `/national-teams/${team}` },
  }
}

export default async function NationPage({ params }: PageProps<"/national-teams/[team]">) {
  const { team } = await params
  const nation = getNation(team)
  const nationTeams = getTeamsByClub(team)
  if (!nation || nationTeams.length === 0) notFound()
  const prime = getPrimeEntity(team)

  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <Link href="/national-teams" className="hover:text-gold">
            National teams
          </Link>
        </p>
        <h1 className="font-display text-[13px] uppercase tracking-[0.08em] sm:text-xl">
          {nation.name}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Historical {nation.name} squads in the simulator. Open a tournament year for the starting
          XI, formation, ratings and a one-click match.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {nationTeams.map((item) => (
          <TeamCard key={item.id} team={item} />
        ))}
      </div>
      {prime ? (
        <PixelButton href={`/prime/${team}`} className="w-fit">
          When Was {nation.name}&apos;s Prime?
        </PixelButton>
      ) : null}
    </div>
  )
}
