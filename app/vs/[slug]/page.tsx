import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { TeamRatings } from "@/components/teams/TeamRatings"
import { PixelButton } from "@/components/ui/PixelButton"
import { allVsPairs } from "@/data/matchups"
import { getTeam, teams } from "@/data/teams"
import { parseVsSlug } from "@/lib/match-id"
import { simulateMany } from "@/lib/simulation"

const VS_RUNS = 1000

export const dynamicParams = false

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
    title: { absolute: `${title}` },
    description: `Simulate ${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}. Model probabilities, squads and a football match simulator — not a recorded historical result.`,
    alternates: { canonical: `/vs/${slug}` },
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
  const options = teams.map((team) => ({
    id: team.id,
    clubId: team.clubId,
    clubName: team.clubName,
    clubCode: team.clubCode,
    season: team.season,
    displaySeason: team.displaySeason,
  }))

  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold">
          Dream Match Simulator
        </p>
        <h1 className="font-display text-lg uppercase leading-relaxed tracking-[0.06em] sm:text-2xl">
          {home.clubName} {home.displaySeason} vs {away.clubName} {away.displaySeason}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted">
          This page does not pick a winner. Simulate the match yourself. The percentages below are
          model output from {VS_RUNS.toLocaleString()} seeded runs, not a historical result.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`/teams/${home.clubId}/${home.season}`}
          className="border-2 border-line bg-panel p-4 no-underline hover:border-gold"
        >
          <div className="font-display text-[11px] uppercase">{home.clubName}</div>
          <div className="text-sm text-muted">{home.displaySeason} squad</div>
        </Link>
        <Link
          href={`/teams/${away.clubId}/${away.season}`}
          className="border-2 border-line bg-panel p-4 no-underline hover:border-gold"
        >
          <div className="font-display text-[11px] uppercase">{away.clubName}</div>
          <div className="text-sm text-muted">{away.displaySeason} squad</div>
        </Link>
      </div>

      <MonteCarloResults result={model} />

      <div className="grid gap-6 lg:grid-cols-2">
        <TeamRatings team={home} />
        <TeamRatings team={away} />
      </div>

      <MatchSetup teams={options} defaultHome={home.id} defaultAway={away.id} />

      <PixelButton href="/simulate" variant="ghost" className="w-fit">
        Choose different teams
      </PixelButton>
    </div>
  )
}
