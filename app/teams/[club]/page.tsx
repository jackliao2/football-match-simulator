import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TeamCard } from "@/components/teams/TeamCard"
import { PixelButton } from "@/components/ui/PixelButton"
import { getClub } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { allClubIds, getTeamsByClub } from "@/data/teams"

export const dynamicParams = false

export function generateStaticParams() {
  return allClubIds().map((club) => ({ club }))
}

export async function generateMetadata({
  params,
}: PageProps<"/teams/[club]">): Promise<Metadata> {
  const { club } = await params
  const clubMeta = getClub(club)
  if (!clubMeta) return { title: "Club" }
  return {
    title: `${clubMeta.name} Historical Squads`,
    description: `Explore legendary ${clubMeta.name} squads by season, including lineup, formation and team ratings, then simulate them in a football match simulator.`,
    alternates: { canonical: `/teams/${club}` },
  }
}

export default async function ClubPage({ params }: PageProps<"/teams/[club]">) {
  const { club } = await params
  const clubMeta = getClub(club)
  const clubTeams = getTeamsByClub(club)
  if (!clubMeta || clubTeams.length === 0) notFound()
  const prime = getPrimeEntity(club)

  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <Link href="/teams" className="text-muted hover:text-gold">
            Teams
          </Link>
        </p>
        <h1 className="font-display text-lg uppercase tracking-[0.08em] sm:text-xl">
          {clubMeta.name}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Historical {clubMeta.name} squads in the simulator. Open a season for the starting XI,
          formation, ratings and a one-click match.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clubTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
      {prime ? (
        <PixelButton href={`/prime/${club}`} className="w-fit">
          When Was {clubMeta.name}&apos;s Prime?
        </PixelButton>
      ) : null}
    </div>
  )
}
