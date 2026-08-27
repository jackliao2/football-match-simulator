import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { FaceOffSquad } from "@/components/teams/SquadPanel"
import { TeamRatings } from "@/components/teams/TeamRatings"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { PageHeader } from "@/components/ui/PageHeader"
import { allVsPairs } from "@/data/matchups"
import { getTeam, teams, toTeamOption } from "@/data/teams"
import { parseVsSlug } from "@/lib/match-id"
import { vsPageCopy } from "@/lib/page-copy"
import { teamPath } from "@/lib/paths"
import { SITE, absoluteUrl } from "@/lib/site"
import { simulateMany } from "@/lib/simulation"
import { teamSquad } from "@/lib/stars"
import type { HistoricalTeam } from "@/types"

const VS_RUNS = 400

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
  const copy = vsPageCopy(home, away, VS_RUNS)
  return {
    title: { absolute: `${copy.title} | ${SITE.name}` },
    description: copy.description,
    alternates: { canonical: `/vs/${slug}` },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(`/vs/${slug}`),
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

  const model = simulateMany(home, away, VS_RUNS, `vs:${slug}`)
  const options = teams.map(toTeamOption)

  const copy = vsPageCopy(home, away, VS_RUNS)

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
          }),
        }}
      />
      <PageHeader
        kicker={copy.kicker}
        title={`${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}`}
        lead={copy.lead}
        crumbs={[{ href: "/vs", label: "Dream matches" }]}
      />

      <MonteCarloResults result={model} />

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
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold">Your turn</p>
          <h2 id="replay-this-matchup" className="mt-1 text-2xl font-semibold tracking-tight text-ink">
            Simulate this matchup
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
            The teams are already selected. Run the match yourself for a fresh seeded result, or test
            the matchup 100 times.
          </p>
        </div>
        <MatchSetup teams={options} defaultHome={home.id} defaultAway={away.id} />
      </section>

      <Link href="/simulate" className="font-mono text-sm text-gold hover:text-gold-2">
        Choose different teams →
      </Link>
    </div>
  )
}

function VsSquadCard({ team, away = false }: { team: HistoricalTeam; away?: boolean }) {
  return (
    <section className={`faceoff-card overflow-visible ${away ? "away faceoff-away" : "home faceoff-home"}`}>
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
