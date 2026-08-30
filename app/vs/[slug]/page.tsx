import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { FaceOffSquad } from "@/components/teams/SquadPanel"
import { TeamRatings } from "@/components/teams/TeamRatings"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { PageHeader } from "@/components/ui/PageHeader"
import { EditorialByline, personSchema } from "@/components/ui/EditorialByline"
import { allVsPairs, isPublishedMatchup, vsSimulationRuns } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { matchupFeature } from "@/data/vs-editorial"
import { canonicalVsSlug, parseVsSlug } from "@/lib/match-id"
import { vsPageCopy } from "@/lib/page-copy"
import { teamPath } from "@/lib/paths"
import { SITE, absoluteUrl } from "@/lib/site"
import { cachedMatchupModel } from "@/lib/matchup-model"
import { teamSquad } from "@/lib/stars"
import type { HistoricalTeam } from "@/types"

// Published matchups are prebuilt. Other valid pairs render a noindex playable page.
export const dynamicParams = true

export function generateStaticParams() {
  return allVsPairs().map(([a, b]) => ({ slug: `${a}-vs-${b}` }))
}

export async function generateMetadata({
  params,
}: PageProps<"/vs/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseVsSlug(slug)
  if (!parsed) return { title: "Dream Match" }
  const home = getTeam(parsed.homeId)
  const away = getTeam(parsed.awayId)
  if (!home || !away) return { title: "Dream Match" }
  const copy = vsPageCopy(home, away, vsSimulationRuns(home.id, away.id))
  const canonical = canonicalVsSlug(home.id, away.id)
  const indexable = slug === canonical && isPublishedMatchup(home.id, away.id)
  return {
    title: { absolute: `${copy.title} | ${SITE.name}` },
    description: copy.description,
    alternates: { canonical: `/vs/${canonical}` },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(`/vs/${canonical}`),
    },
  }
}

export default async function VsPage({ params }: PageProps<"/vs/[slug]">) {
  const { slug } = await params
  const parsed = parseVsSlug(slug)
  if (!parsed) notFound()
  const home = getTeam(parsed.homeId)
  const away = getTeam(parsed.awayId)
  if (!home || !away) notFound()
  const canonical = canonicalVsSlug(home.id, away.id)
  if (slug !== canonical) redirect(`/vs/${canonical}`)
  if (!isPublishedMatchup(home.id, away.id)) {
    return (
      <div className="grid gap-6">
        <PageHeader
          kicker="Playable matchup"
          title={`${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}`}
          lead="Both squads are in the database, but this pairing is not one of the curated dream-match dossiers. Simulate it here, or open the written matchups."
          crumbs={[{ href: "/vs", label: "Dream matches" }]}
        />
        <MatchSetup defaultHome={home.id} defaultAway={away.id} />
        <Link href="/vs" className="font-mono text-sm text-gold hover:text-gold-2">
          Browse curated dream matches →
        </Link>
      </div>
    )
  }

  const VS_RUNS = vsSimulationRuns(home.id, away.id)
  const model = cachedMatchupModel(home, away, VS_RUNS, `vs:${slug}`)

  const copy = vsPageCopy(home, away, VS_RUNS)
  const feature = matchupFeature(home, away)
  const faqs = [
    {
      q: `Who would win between ${home.clubName} ${home.displaySeason} and ${away.clubName} ${away.displaySeason}?`,
      a: `Across ${VS_RUNS} seeded simulations, ${home.clubName} won ${model.homeWinPct}%, ${away.clubName} won ${model.awayWinPct}%, and ${model.drawPct}% finished level. The most common score was ${model.mostCommonScore.replace("-", "–")}. This is a modelled hypothetical, not a prediction of a real fixture.`,
    },
    {
      q: `What was the ${home.clubName} vs ${away.clubName} simulated score?`,
      a: `There is no single official score. The model's most frequent scoreline across ${VS_RUNS} matches was ${model.mostCommonScore.replace("-", "–")}, with average goals ${model.avgHomeGoals}–${model.avgAwayGoals}.`,
    },
    {
      q: `How do I simulate ${home.clubName} ${home.displaySeason} against ${away.clubName} ${away.displaySeason}?`,
      a: `The simulator on this page is already loaded with both squads. Run one match for a fresh seed, or read the ${VS_RUNS}-match distribution above for the model's range of results.`,
    },
  ]

  return (
    <div className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: copy.title,
            url: absoluteUrl(`/vs/${slug}`),
            description: copy.description,
            author: personSchema(),
            datePublished: SITE.legalUpdatedIso,
            dateModified: SITE.legalUpdatedIso,
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
              { "@type": "ListItem", position: 1, name: "Dream matches", item: absoluteUrl("/vs") },
              { "@type": "ListItem", position: 2, name: `${home.clubName} vs ${away.clubName}`, item: absoluteUrl(`/vs/${slug}`) },
            ],
          }),
        }}
      />
      {feature ? (
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
      ) : null}
      <PageHeader
        kicker={copy.kicker}
        title={`${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}`}
        lead={copy.lead}
        crumbs={[{ href: "/vs", label: "Dream matches" }]}
      />
      {feature ? <EditorialByline /> : null}

      <section className="matchup-editorial">
        <div><p className="page-kicker">Why this matchup matters</p><h2 className="section-title mt-1">Two football ideas, one impossible night</h2></div>
        <div className="matchup-editorial-facts">
          <span><b>{home.clubName}</b>{home.manager} · {home.formation} · {home.styleTags.slice(0, 2).join(" · ")}</span>
          <i aria-hidden="true">VS</i>
          <span><b>{away.clubName}</b>{away.manager} · {away.formation} · {away.styleTags.slice(0, 2).join(" · ")}</span>
        </div>
      </section>

      {feature ? (
        <article className="grid gap-4" aria-labelledby="long-read-heading">
          <div>
            <p className="page-kicker">The long read</p>
            <h2 id="long-read-heading" className="section-title mt-1">{feature.title}</h2>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <section className="result-panel p-4 sm:p-5">
              <p className="page-kicker">Why this game</p>
              <h3 className="mt-2 font-brand text-lg font-semibold text-text">The argument behind the teams</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{feature.context}</p>
            </section>
            <section className="result-panel p-4 sm:p-5">
              <p className="page-kicker">Tactical hinge</p>
              <h3 className="mt-2 font-brand text-lg font-semibold text-text">Where the match turns</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{feature.hinge}</p>
            </section>
            <section className="result-panel p-4 sm:p-5">
              <p className="page-kicker">Reading the game</p>
              <h3 className="mt-2 font-brand text-lg font-semibold text-text">What a convincing result looks like</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{feature.reading}</p>
            </section>
          </div>
        </article>
      ) : null}

      <section className="result-panel p-4 sm:p-5" aria-labelledby="matchup-snapshot">
        <p className="page-kicker">Rating snapshot</p>
        <h2 id="matchup-snapshot" className="section-title mt-2">How the two sides compare on the model</h2>
        <div className="comparison-table mt-3">
          <div className="comparison-row">
            <span>{home.clubName} {home.displaySeason}</span>
            <b>Axis</b>
            <span>{away.clubName} {away.displaySeason}</span>
          </div>
          {[
            ["Attack", home.attackRating, away.attackRating],
            ["Midfield", home.midfieldRating, away.midfieldRating],
            ["Defence", home.defenseRating, away.defenseRating],
            ["Goalkeeping", home.goalkeeperRating, away.goalkeeperRating],
            ["Possession", home.possession, away.possession],
            ["Pressing", home.pressing, away.pressing],
          ].map(([label, left, right]) => (
            <div key={String(label)} className="comparison-row">
              <span>{left}</span>
              <b>{label}</b>
              <span>{right}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          Percentages below come from {VS_RUNS} seeded simulations using these squads and ratings. They are a modelled matchup, not a record of a real fixture and not betting advice.
        </p>
      </section>

      <MonteCarloResults result={model} />

      {feature ? (
        <section className="result-panel p-4 sm:p-5">
          <p className="page-kicker">FAQ</p>
          <h2 className="section-title mt-1">Questions about this matchup</h2>
          <dl className="mt-3 grid gap-3">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-brand text-base font-semibold text-text">{item.q}</dt>
                <dd className="mt-1 text-sm leading-6 text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <VsSquadCard team={home} />
        <VsSquadCard team={away} away />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TeamRatings team={home} />
        <TeamRatings team={away} />
      </div>

      <section className="grid gap-3" aria-labelledby="replay-this-matchup">
        <div>
          <p className="page-kicker">Your turn</p>
          <h2 id="replay-this-matchup" className="section-title mt-1">
            Simulate this matchup
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
            The teams are already selected. Run the match yourself for a fresh seeded result, or ask
            Expert AI for a tactical verdict backed by 100 alternate matches.
          </p>
        </div>
        <MatchSetup defaultHome={home.id} defaultAway={away.id} />
      </section>

      <Link href="/simulate" className="font-mono text-sm text-gold hover:text-gold-2">
        Choose different teams →
      </Link>
    </div>
  )
}

function VsSquadCard({ team, away = false }: { team: HistoricalTeam; away?: boolean }) {
  return (
    <section className={`vs-squad-card ${away ? "away" : "home"}`}>
      <Link href={teamPath(team)} className={`faceoff-identity flex items-center gap-3 no-underline hover:bg-white/5 ${away ? "flex-row-reverse text-right" : ""}`}>
        <PixelCrest clubId={team.clubId} size={48} />
        <span className="min-w-0 flex-1">
          <span className={`block font-display text-[8px] uppercase tracking-[0.2em] ${away ? "text-danger" : "text-gold"}`}>{away ? "Away XI" : "Home XI"}</span>
          <span className="mt-1 block truncate font-brand text-xl font-semibold text-text">{team.clubName}</span>
          <span className="mt-0.5 block font-mono text-xs text-gold">{team.displaySeason}</span>
          <span className="mt-1 block truncate font-mono text-[10px] text-muted">{team.manager} · {team.formation}</span>
        </span>
        <OvrStamp value={team.overallRating} size="md" align={away ? "left" : "right"} />
      </Link>
      <div className="border-t border-line px-2 py-2">
        <FaceOffSquad squad={teamSquad(team)} />
      </div>
    </section>
  )
}
