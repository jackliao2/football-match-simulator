import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { getClub } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { allClubIds, getTeamsByClub } from "@/data/teams"
import { firstSentence, orgHubCopy } from "@/lib/page-copy"
import { teamPath } from "@/lib/paths"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

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
  const copy = orgHubCopy(clubMeta, clubTeams)
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/teams/${club}`,
  })
}

export default async function ClubPage({ params }: PageProps<"/teams/[club]">) {
  const { club } = await params
  const clubMeta = getClub(club)
  const clubTeams = getTeamsByClub(club)
  if (!clubMeta || clubTeams.length === 0) notFound()
  const prime = getPrimeEntity(club)
  const copy = orgHubCopy(clubMeta, clubTeams)

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
            url: absoluteUrl(`/teams/${club}`),
            hasPart: clubTeams.map((team) => ({
              "@type": "SportsTeam",
              name: `${team.clubName} ${team.displaySeason}`,
              url: absoluteUrl(teamPath(team)),
            })),
          }),
        }}
      />
      <PageHeader
        kicker={copy.kicker}
        title={copy.title}
        lead={copy.lead}
        crumbs={[{ href: "/teams", label: "Teams" }]}
      >
        {prime ? (
          <Link href={`/prime/${club}`} className="font-mono text-sm text-gold hover:text-gold-2">
            When was {clubMeta.name}&apos;s prime? →
          </Link>
        ) : null}
      </PageHeader>
      <div className="season-sketches">
        {clubTeams.map((team) => (
          <p key={team.id}>
            <Link href={teamPath(team)}>{team.displaySeason}</Link>
            {" — "}
            {firstSentence(team.summary)} {team.manager}, {team.formation}, OVR {team.overallRating}.
          </p>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clubTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}
