import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PixelButton } from "@/components/ui/PixelButton"
import { TeamCard } from "@/components/teams/TeamCard"
import { getPrimeEntity, primeEntities } from "@/data/prime"
import { getTeam } from "@/data/teams"
import { vsPath } from "@/data/matchups"

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
    title: { absolute: `${page.seoTitle} | Football Match Simulator` },
    description: page.seoDescription,
    alternates: { canonical: `/prime/${page.slug}` },
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
    <div className="grid gap-8">
      <header className="grid gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <Link href="/prime" className="hover:text-gold">
            Prime
          </Link>
        </p>
        <h1 className="font-display text-lg uppercase leading-relaxed tracking-[0.08em] sm:text-2xl">
          {page.title}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted">{page.description}</p>
      </header>

      <div className="grid gap-4">
        {candidates.map((candidate, index) => (
          <article key={candidate.teamId} className="grid gap-4 border-2 border-line bg-panel p-4 sm:grid-cols-[1fr_16rem] sm:items-center">
            <div>
              <p className="font-display text-[10px] text-gold">Candidate {index + 1}</p>
              <h2 className="mt-2 font-display text-[12px] uppercase tracking-wide">
                {candidate.team.clubName} {candidate.team.displaySeason}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{candidate.argument}</p>
              <div className="mt-4">
                <PixelButton href={`/teams/${candidate.team.clubId}/${candidate.team.season}`}>
                  Open squad page
                </PixelButton>
              </div>
            </div>
            <TeamCard team={candidate.team} />
          </article>
        ))}
      </div>

      {first && second ? (
        <section className="grid gap-3 border-2 border-gold bg-panel p-4">
          <h2 className="font-display text-[11px] uppercase tracking-[0.16em] text-gold">
            Settle it in the simulator
          </h2>
          <p className="text-sm text-muted">
            {first.clubName} {first.displaySeason} vs {second.clubName} {second.displaySeason}
          </p>
          <PixelButton href={vsPath(first.id, second.id)} variant="primary" className="w-fit">
            Open this dream match
          </PixelButton>
        </section>
      ) : null}
    </div>
  )
}
