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
  const candidateTeams = page.candidates.map((candidate) => getTeam(candidate.teamId)).filter(Boolean)
  return {
    title: { absolute: `${page.seoTitle} | ${SITE.name}` },
    description: page.seoDescription,
    keywords: [
      page.title.toLowerCase(),
      `prime ${page.name.toLowerCase()}`,
      `${page.name.toLowerCase()} prime`,
      ...candidateTeams.map((team) => `${page.name.toLowerCase()} ${team!.displaySeason}`),
      "football match simulator",
    ],
    alternates: { canonical: `/prime/${page.slug}` },
    openGraph: {
      type: "article",
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
  const related = primeEntities.filter((item) => item.slug !== page.slug).slice(0, 4)
  const pageUrl = absoluteUrl(`/prime/${page.slug}`)

  return (
    <div className="grid gap-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: page.title,
        description: page.seoDescription,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        author: { "@type": "Organization", name: SITE.name },
        about: { "@type": page.kind === "player" ? "Person" : "SportsTeam", name: page.name },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Prime", item: absoluteUrl("/prime") },
          { "@type": "ListItem", position: 2, name: page.title, item: pageUrl },
        ],
      }) }} />
      <PageHeader
        kicker="Prime"
        title={page.title}
        lead={page.description}
        crumbs={[{ href: "/prime", label: "Prime" }]}
      />

      <section className="result-panel overflow-hidden border-2 border-gold/40 shadow-[6px_6px_0_#000]">
        <div className="border-b border-white/10 bg-gold/[0.05] px-4 py-3 sm:px-5">
          <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold">Editorial verdict</p>
          <h2 className="mt-1 font-brand text-xl font-semibold tracking-wide text-text">Our answer</h2>
        </div>
        <p className="max-w-4xl px-4 py-4 text-[15px] leading-7 text-text/90 sm:px-5">{page.verdict}</p>
      </section>

      <div className="grid gap-4">
        {candidates.map((candidate, index) => (
          <article key={candidate.teamId} className="result-panel grid gap-4 p-4 sm:grid-cols-[1fr_16rem] sm:items-center">
            <div>
              <p className="font-display text-[8px] uppercase tracking-[0.18em] text-gold">
                Candidate {index + 1}
              </p>
              <h2 className="mt-2 font-brand text-lg font-semibold tracking-wide">
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
          <h2 className="font-brand text-lg font-semibold tracking-wide">Settle it in the simulator</h2>
          <p className="mt-2 font-mono text-sm text-muted">
            {first.clubName} {first.displaySeason} vs {second.clubName} {second.displaySeason}
          </p>
          <Link href={vsPath(first.id, second.id)} className="mt-3 inline-block font-mono text-sm text-gold hover:text-gold-2">
            Open this dream match →
          </Link>
        </section>
      ) : null}

      <section className="grid gap-3 border-t border-white/10 pt-5">
        <div>
          <p className="font-display text-[8px] uppercase tracking-[0.2em] text-gold">More era debates</p>
          <h2 className="mt-1 font-brand text-lg font-semibold text-text">Other primes worth arguing about</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {related.map((item) => <Link key={item.slug} href={`/prime/${item.slug}`} className="result-panel p-3 no-underline hover:border-gold"><span className="font-brand text-sm font-semibold tracking-wide text-text">{item.title}</span><span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted">{item.description}</span></Link>)}
        </div>
      </section>
    </div>
  )
}
