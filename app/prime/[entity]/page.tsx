import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { getPrimeEntity, primeEntities } from "@/data/prime"
import { getTeam } from "@/data/teams"
import { vsPath } from "@/data/matchups"
import { teamPath } from "@/lib/paths"
import { SITE, absoluteUrl } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return primeEntities.map((entity) => ({ entity: entity.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/prime/[entity]">): Promise<Metadata> {
  const { entity } = await params
  const page = getPrimeEntity(entity)
  if (!page) return { title: "Prime" }
  return {
    title: { absolute: `${page.seoTitle} | ${SITE.name}` },
    description: page.seoDescription,
    keywords: [
      page.title.toLowerCase(),
      `prime ${page.name.toLowerCase()}`,
      `${page.name.toLowerCase()} prime`,
      "football match simulator",
    ],
    alternates: { canonical: `/prime/${page.slug}` },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: absoluteUrl(`/prime/${page.slug}`),
    },
  }
}

export default async function PrimePage({ params }: PageProps<"/prime/[entity]">) {
  const { entity } = await params
  const page = getPrimeEntity(entity)
  if (!page) notFound()
  const candidates = page.candidates
    .map((candidate) => ({ ...candidate, team: getTeam(candidate.teamId) }))
    .filter((candidate): candidate is typeof candidate & { team: NonNullable<typeof candidate.team> } =>
      Boolean(candidate.team),
    )

  const first = candidates[0]?.team
  const second = candidates[1]?.team

  return (
    <div className="grid gap-6">
      <PageHeader
        kicker="Prime"
        title={page.title}
        lead={page.description}
        crumbs={[{ href: "/prime", label: "Prime" }]}
      />

      <div className="grid gap-4">
        {candidates.map((candidate, index) => (
          <article key={candidate.teamId} className="result-panel grid gap-4 p-4 sm:grid-cols-[1fr_16rem] sm:items-center">
            <div>
              <p className="font-display text-[8px] uppercase tracking-[0.18em] text-gold">
                Candidate {index + 1}
              </p>
              <h2 className="mt-2 font-mono text-base font-semibold tracking-tight">
                {candidate.team.clubName} {candidate.team.displaySeason}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{candidate.argument}</p>
              <Link
                href={teamPath(candidate.team)}
                className="mt-3 inline-block font-mono text-sm text-gold hover:text-gold-2"
              >
                Open squad page →
              </Link>
            </div>
            <TeamCard team={candidate.team} />
          </article>
        ))}
      </div>

      {first && second ? (
        <section className="result-panel p-4">
          <h2 className="font-mono text-base font-semibold tracking-tight">Settle it in the simulator</h2>
          <p className="mt-2 font-mono text-sm text-muted">
            {first.clubName} {first.displaySeason} vs {second.clubName} {second.displaySeason}
          </p>
          <Link href={vsPath(first.id, second.id)} className="mt-3 inline-block font-mono text-sm text-gold hover:text-gold-2">
            Open this dream match →
          </Link>
        </section>
      ) : null}
    </div>
  )
}
