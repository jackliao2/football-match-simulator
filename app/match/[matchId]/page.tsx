import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TrackOnMount } from "@/components/TrackOnMount"
import { CommentaryPanel } from "@/components/simulator/CommentaryPanel"
import { MatchActions } from "@/components/simulator/MatchActions"
import { MatchResult } from "@/components/simulator/MatchResult"
import { MatchStats } from "@/components/simulator/MatchStats"
import { MatchTimeline } from "@/components/simulator/MatchTimeline"
import { StarPlayers } from "@/components/teams/StarPlayers"
import { PixelButton } from "@/components/ui/PixelButton"
import { getTeam } from "@/data/teams"
import { vsPath } from "@/data/matchups"
import { parseMatchId } from "@/lib/match-id"
import { teamPath } from "@/lib/paths"
import { absoluteUrl } from "@/lib/site"
import { simulateMatch } from "@/lib/simulation"

export const dynamicParams = true

export async function generateMetadata({
  params,
}: PageProps<"/match/[matchId]">): Promise<Metadata> {
  const { matchId } = await params
  const parsed = parseMatchId(matchId)
  if (!parsed) return { title: "Simulated Match", robots: { index: false, follow: true } }
  const home = getTeam(parsed.homeId)
  const away = getTeam(parsed.awayId)
  if (!home || !away) return { title: "Simulated Match", robots: { index: false, follow: true } }
  const match = simulateMatch(home, away, parsed.seed)
  const title = `${home.clubName} ${home.displaySeason} ${match.score.home}–${match.score.away} ${away.clubName} ${away.displaySeason}`
  return {
    title,
    description: `Simulated football match: ${title}. Seed ${parsed.seed}. Replay it or run 100 matches.`,
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description: `Simulated match · seed ${parsed.seed}`,
      url: absoluteUrl(`/match/${matchId}`),
    },
  }
}

export default async function MatchPage({ params }: PageProps<"/match/[matchId]">) {
  const { matchId } = await params
  const parsed = parseMatchId(matchId)
  if (!parsed) notFound()
  const home = getTeam(parsed.homeId)
  const away = getTeam(parsed.awayId)
  if (!home || !away) notFound()
  const match = simulateMatch(home, away, parsed.seed)

  return (
    <div className="grid gap-6">
      <TrackOnMount
        event="match_simulated"
        payload={{ matchId, home: home.id, away: away.id, seed: parsed.seed }}
      />
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
        <Link href="/simulate" className="hover:text-gold">
          Simulator
        </Link>
        <span className="px-2">/</span>
        Simulated match
      </p>
      <h1 className="font-display text-[13px] uppercase leading-relaxed tracking-[0.08em] sm:text-xl">
        {match.homeTeam} vs {match.awayTeam}
      </h1>
      <MatchResult match={match} home={home} away={away} />
      <div className="grid gap-6 lg:grid-cols-2">
        <StarPlayers team={home} count={6} title={`${home.clubName} stars`} />
        <StarPlayers team={away} count={6} title={`${away.clubName} stars`} />
      </div>
      <MatchActions home={home} away={away} />
      <div className="grid gap-6 lg:grid-cols-2">
        <MatchTimeline match={match} />
        <MatchStats match={match} />
      </div>
      {match.tacticalNotes.length > 0 ? (
        <ul className="border-2 border-line bg-panel px-6 py-4 text-sm leading-7 text-muted">
          {match.tacticalNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
      <CommentaryPanel matchId={match.id} />
      <div className="flex flex-wrap gap-3">
        <PixelButton href={teamPath(home)}>
          {home.clubName} {home.displaySeason}
        </PixelButton>
        <PixelButton href={teamPath(away)}>
          {away.clubName} {away.displaySeason}
        </PixelButton>
        <PixelButton href={vsPath(home.id, away.id)} variant="ghost">
          Dream match page
        </PixelButton>
      </div>
    </div>
  )
}
