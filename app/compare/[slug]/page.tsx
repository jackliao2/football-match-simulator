import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { QuickMatch } from "@/components/simulator/QuickMatch"
import { LandingEvidence } from "@/components/ui/LandingEvidence"
import { HistoricalRecord } from "@/components/ui/HistoricalRecord"
import { SEARCH_PRIORITY_RECORDS, PRIORITY_REVIEW_DATE, PRIORITY_REVIEW_LABEL } from "@/data/search-priority"
import { SEARCH_LANDING_EVIDENCE, LANDING_REVIEW_DATE, LANDING_REVIEW_LABEL } from "@/data/search-landing-evidence"
import { PageHeader } from "@/components/ui/PageHeader"
import { compareFaqs, compareParamSlugs, compareSearchDescription, compareSeoTitle, resolveClubCompare } from "@/data/compare"
import { getClub } from "@/data/clubs"
import { getPrimeEntity } from "@/data/prime"
import { vsPath } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { firstSentence } from "@/lib/page-copy"
import { teamPath } from "@/lib/paths"
import { pageMetadata } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"
import { EditorialByline, personSchema } from "@/components/ui/EditorialByline"
import { SEARCH_REVIEW_PATHS, SEARCH_REVIEW_DATE, SEARCH_REVIEW_LABEL } from "@/data/search-review"

export const dynamicParams = false

export function generateStaticParams() {
  return compareParamSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const pair = resolveClubCompare(slug)
  if (!pair) return { title: "Named-season comparison" }
  const leftClub = getClub(pair.leftClubId)
  const rightClub = getClub(pair.rightClubId)
  const title =
    leftClub && rightClub ? compareSeoTitle(pair, leftClub.name, rightClub.name) : pair.title
  return pageMetadata({
    title,
    description: compareSearchDescription(pair),
    path: `/compare/${pair.slug}`,
    keywords: pair.keywords,
  })
}

export default async function ClubComparePage({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params
  const pair = resolveClubCompare(slug)
  if (!pair) notFound()
  if (slug !== pair.slug) permanentRedirect(`/compare/${pair.slug}`)

  const leftClub = getClub(pair.leftClubId)
  const rightClub = getClub(pair.rightClubId)
  const left = getTeam(pair.leftPeakId)
  const right = getTeam(pair.rightPeakId)
  if (!leftClub || !rightClub || !left || !right) notFound()

  const leftPrime = getPrimeEntity(pair.leftClubId)
  const rightPrime = getPrimeEntity(pair.rightClubId)
  const leftPeak = `${left.clubName} ${left.displaySeason}`
  const rightPeak = `${right.clubName} ${right.displaySeason}`
  const historicalRecord = SEARCH_PRIORITY_RECORDS[`/compare/${pair.slug}`]
  const faqs = [...(historicalRecord?.faqs ?? []), ...compareFaqs(pair, leftClub.name, rightClub.name, leftPeak, rightPeak)]
  const evidence = SEARCH_LANDING_EVIDENCE[`/compare/${pair.slug}`]
  const reviewed = SEARCH_REVIEW_PATHS.has(`/compare/${pair.slug}`)
  const updatedDate = historicalRecord ? PRIORITY_REVIEW_DATE : reviewed ? SEARCH_REVIEW_DATE : evidence ? LANDING_REVIEW_DATE : SITE.contentUpdatedIso
  const updatedLabel = historicalRecord ? PRIORITY_REVIEW_LABEL : reviewed ? SEARCH_REVIEW_LABEL : evidence ? LANDING_REVIEW_LABEL : SITE.contentUpdated

  return (
    <div className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: compareSeoTitle(pair, leftClub.name, rightClub.name),
            description: compareSearchDescription(pair),
            mainEntityOfPage: absoluteUrl(`/compare/${pair.slug}`),
            author: personSchema(),
            publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
            datePublished: SITE.legalUpdatedIso,
            dateModified: updatedDate,
            about: [leftClub.name, rightClub.name],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Compare", item: absoluteUrl("/compare") },
              {
                "@type": "ListItem",
                position: 2,
                name: `${leftClub.name} vs ${rightClub.name}`,
                item: absoluteUrl(`/compare/${pair.slug}`),
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <PageHeader
        kicker={`Who is better, ${leftClub.name} or ${rightClub.name}?`}
        title={historicalRecord ? `${leftClub.name} vs ${rightClub.name}: who is better?` : pair.verdictHeading}
        lead={pair.lead}
        crumbs={[{ href: "/compare", label: "Compare" }]}
      />
      {historicalRecord ? <HistoricalRecord record={historicalRecord} /> : null}
      {pair.criteria ? (
        <section className="grid gap-3" aria-labelledby="comparison-answer">
          <h2 id="comparison-answer" className="section-title">Which is better? Choose the comparison</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {pair.criteria.map((criterion) => (
              <article key={criterion.label} className="result-panel p-4">
                <h3 className="font-brand text-lg font-semibold text-text">{criterion.label}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{criterion.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <section className="editorial-verdict p-4 sm:p-5">
        <h2 className="section-title">Why we reach this verdict</h2>
        <div className="editorial-copy mt-3">
          {pair.verdict.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {!evidence && pair.historicalNotes?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {!evidence && pair.sources ? (
          <p className="mt-4 text-xs leading-6 text-muted">
            Historical records: {pair.sources.map((source, index) => (
              <span key={source.url}>
                {index > 0 ? " · " : ""}
                <a href={source.url} className="text-gold hover:text-gold-2">{source.label}</a>
              </span>
            ))}
          </p>
        ) : null}
      </section>
      <EditorialByline date={updatedLabel} dateTime={updatedDate} />
      {evidence ? <LandingEvidence evidence={evidence} /> : null}
      <section>
        <p className="page-kicker">
          {leftClub.name} vs {rightClub.name}
        </p>
        <h2 className="section-title mt-2 mb-3">
          {leftClub.name} vs {rightClub.name} by category
        </h2>
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
          <p className="page-kicker">
            {left.manager} vs {right.manager}
          </p>
          <h2 className="section-title mt-1">
            {left.clubName} {left.displaySeason} vs {right.clubName} {right.displaySeason}
          </h2>
        </div>
        <MatchupRow href={vsPath(left.id, right.id)} home={left} away={right} />
        <p className="text-sm leading-6 text-muted">
          Check the named-season squads: <Link href={teamPath(left)} className="text-gold hover:text-gold-2">{leftPeak} lineup</Link>
          {" · "}
          <Link href={teamPath(right)} className="text-gold hover:text-gold-2">{rightPeak} lineup</Link>
        </p>
      </section>
      <QuickMatch home={left} away={right} />
      {leftPrime || rightPrime ? (
        <section className="grid gap-3 sm:grid-cols-2">
          {leftPrime ? (
            <Link href={`/prime/${leftPrime.slug}`} className="home-prime-card">
              <span>Pick: {leftPrime.pick}</span>
              <h2>{leftPrime.title}</h2>
              <p>{firstSentence(leftPrime.description)}</p>
              <b>Open {leftClub.name} →</b>
            </Link>
          ) : null}
          {rightPrime ? (
            <Link href={`/prime/${rightPrime.slug}`} className="home-prime-card">
              <span>Pick: {rightPrime.pick}</span>
              <h2>{rightPrime.title}</h2>
              <p>{firstSentence(rightPrime.description)}</p>
              <b>Open {rightClub.name} →</b>
            </Link>
          ) : null}
        </section>
      ) : null}
      <section className="grid gap-3" aria-labelledby="compare-faq">
        <h2 id="compare-faq" className="section-title">
          {leftPeak} or {rightPeak} — what people ask
        </h2>
        <div className="home-faq-list">
          {faqs.map((item) => (
            <details key={item.q} className="home-faq-item group">
              <summary>
                {item.q}
                <span className="home-faq-plus">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
