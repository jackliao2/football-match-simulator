import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { QuickMatch } from "@/components/simulator/QuickMatch"
import { PageHeader } from "@/components/ui/PageHeader"
import { compareParamSlugs, resolveClubCompare } from "@/data/compare"
import { getClub } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { vsPath } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"
import { EditorialByline, personSchema } from "@/components/ui/EditorialByline"

export const dynamicParams = false

export function generateStaticParams() {
  return compareParamSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const pair = resolveClubCompare(slug)
  if (!pair) return { title: "Club comparison" }
  return pageMetadata({
    title: pair.title,
    description: pair.description,
    path: `/compare/${pair.slug}`,
    keywords: pair.keywords,
  })
}

export default async function ClubComparePage({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params
  const pair = resolveClubCompare(slug)
  if (!pair) notFound()
  if (slug !== pair.slug) redirect(`/compare/${pair.slug}`)

  const leftClub = getClub(pair.leftClubId)
  const rightClub = getClub(pair.rightClubId)
  const left = getTeam(pair.leftPeakId)
  const right = getTeam(pair.rightPeakId)
  if (!leftClub || !rightClub || !left || !right) notFound()

  const leftPrime = getPrimeEntity(pair.leftClubId)
  const rightPrime = getPrimeEntity(pair.rightClubId)

  return (
    <div className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: pair.title,
            description: pair.description,
            mainEntityOfPage: absoluteUrl(`/compare/${pair.slug}`),
            author: personSchema(),
            publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
            datePublished: SITE.legalUpdatedIso,
            dateModified: SITE.legalUpdatedIso,
            about: [leftClub.name, rightClub.name],
          }),
        }}
      />
      <PageHeader
        kicker="Club comparison"
        title={`${leftClub.name} or ${rightClub.name}: which is better?`}
        lead={pair.lead}
        crumbs={[{ href: "/compare", label: "Compare" }]}
      />
      <EditorialByline />
      <section className="editorial-verdict p-4 sm:p-5">
        <p className="page-kicker">The call</p>
        <h2 className="section-title mt-2">{pair.verdictHeading}</h2>
        <div className="editorial-copy mt-3">
          {pair.verdict.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section>
        <p className="page-kicker">Argument by category</p>
        <h2 className="section-title mt-2 mb-3">Where each club has the edge</h2>
        <div className="comparison-table">
          <div className="comparison-row">
            <span>{leftClub.name}</span>
            <b>History</b>
            <span>{rightClub.name}</span>
          </div>
          {pair.rows.map(([leftEdge, label, rightEdge]) => (
            <div key={label} className="comparison-row">
              <span>{leftEdge}</span>
              <b>{label}</b>
              <span>{rightEdge}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-3">
        <div>
          <p className="page-kicker">Prime matchup</p>
          <h2 className="section-title mt-1">
            {left.clubName} {left.displaySeason} vs {right.clubName} {right.displaySeason}
          </h2>
        </div>
        <MatchupRow href={vsPath(left.id, right.id)} home={left} away={right} />
      </section>
      <QuickMatch home={left} away={right} />
      {leftPrime || rightPrime ? (
        <section className="grid gap-3 sm:grid-cols-2">
          {leftPrime ? (
            <Link href={`/prime/${leftPrime.slug}`} className="home-prime-card">
              <span>Prime dossier</span>
              <h2>When was {leftClub.name}&apos;s prime?</h2>
              <p>Compare candidate seasons, then send the argument into the simulator.</p>
              <b>Open {leftClub.name} →</b>
            </Link>
          ) : null}
          {rightPrime ? (
            <Link href={`/prime/${rightPrime.slug}`} className="home-prime-card">
              <span>Prime dossier</span>
              <h2>When was {rightClub.name}&apos;s prime?</h2>
              <p>Compare candidate seasons, then send the argument into the simulator.</p>
              <b>Open {rightClub.name} →</b>
            </Link>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
