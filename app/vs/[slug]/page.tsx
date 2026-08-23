import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { StarPlayers } from "@/components/teams/StarPlayers"
import { TeamRatings } from "@/components/teams/TeamRatings"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { PageHeader } from "@/components/ui/PageHeader"
import { allVsPairs } from "@/data/matchups"
import { getTeam, teams, toTeamOption } from "@/data/teams"
import { parseVsSlug } from "@/lib/match-id"
import { teamPath } from "@/lib/paths"
import { absoluteUrl } from "@/lib/site"
import { simulateMany } from "@/lib/simulation"

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
  const title = `${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason} — Match Simulator`
  return {
    title: { absolute: title },
    description: `Simulate ${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}. Model probabilities from ${VS_RUNS} runs, squads and a football match simulator — not a recorded historical result.`,
    alternates: { canonical: `/vs/${slug}` },
    openGraph: {
      title,
      description: `Simulate this dream match. Model probabilities, not a recorded historical result.`,
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

  return (
    <div className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}`,
            url: absoluteUrl(`/vs/${slug}`),
            description: `Football match simulator matchup. Model output from ${VS_RUNS} seeded runs.`,
          }),
        }}
      />
      <PageHeader
        kicker="Dream match simulator"
        title={`${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}`}
        lead={`This page does not pick a winner. Simulate it yourself. The percentages are model output from ${VS_RUNS.toLocaleString()} seeded runs, not a historical result.`}
        crumbs={[{ href: "/vs", label: "Dream matches" }]}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={teamPath(home)} className="result-panel flex items-center gap-3 p-3 no-underline hover:border-gold">
          <PixelCrest clubId={home.clubId} size={40} />
          <span>
            <span className="block font-mono text-sm font-semibold">{home.clubName}</span>
            <span className="font-mono text-xs text-gold">{home.displaySeason} squad</span>
          </span>
        </Link>
        <Link href={teamPath(away)} className="result-panel flex items-center gap-3 p-3 no-underline hover:border-gold">
          <PixelCrest clubId={away.clubId} size={40} />
          <span>
            <span className="block font-mono text-sm font-semibold">{away.clubName}</span>
            <span className="font-mono text-xs text-gold">{away.displaySeason} squad</span>
          </span>
        </Link>
      </div>

      <MonteCarloResults result={model} />

      <div className="grid gap-4 lg:grid-cols-2">
        <StarPlayers team={home} count={11} title={`${home.clubName} stars`} />
        <StarPlayers team={away} count={11} title={`${away.clubName} stars`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TeamRatings team={home} />
        <TeamRatings team={away} />
      </div>

      <MatchSetup teams={options} defaultHome={home.id} defaultAway={away.id} />

      <Link href="/simulate" className="font-mono text-sm text-gold hover:text-gold-2">
        Choose different teams →
      </Link>
    </div>
  )
}
