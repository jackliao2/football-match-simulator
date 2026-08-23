import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { getClub } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { allClubIds, getTeamsByClub } from "@/data/teams"
import { clubHubKeywords, pageMetadata } from "@/lib/seo"

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
  const clubTeams = getTeamsByClub(club)
  const seasons = clubTeams.map((team) => team.displaySeason).join(", ")
  return pageMetadata({
    title: `${clubMeta.name} Squads — ${seasons}`,
    description: `Explore ${clubMeta.name} squads (${seasons}): lineup, formation and team ratings. Open a season — including the current squad — then simulate a football match.`,
    path: `/teams/${club}`,
    keywords: clubHubKeywords(clubMeta.name, club, clubTeams),
  })
}

export default async function ClubPage({ params }: PageProps<"/teams/[club]">) {
  const { club } = await params
  const clubMeta = getClub(club)
  const clubTeams = getTeamsByClub(club)
  if (!clubMeta || clubTeams.length === 0) notFound()
  const prime = getPrimeEntity(club)

  return (
    <div className="grid gap-6">
      <PageHeader
        kicker="Club squads"
        title={`${clubMeta.name} squads`}
        lead={`${clubMeta.name} teams in the simulator, newest first. Open a season for the starting XI, formation, ratings and a one-click football match.`}
        crumbs={[{ href: "/teams", label: "Teams" }]}
      >
        {prime ? (
          <Link href={`/prime/${club}`} className="font-mono text-sm text-gold hover:text-gold-2">
            When was {clubMeta.name}&apos;s prime? →
          </Link>
        ) : null}
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clubTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}
