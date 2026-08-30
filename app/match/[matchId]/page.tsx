import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TrackOnMount } from "@/components/TrackOnMount"
import { CommentaryPanel } from "@/components/simulator/CommentaryPanel"
import { MatchActions } from "@/components/simulator/MatchActions"
import { MatchReplay } from "@/components/simulator/MatchReplay"
import { MatchResult } from "@/components/simulator/MatchResult"
import { MatchStats } from "@/components/simulator/MatchStats"
import { MatchTimeline } from "@/components/simulator/MatchTimeline"
import { StarPlayers } from "@/components/teams/StarPlayers"
import { getTeam } from "@/data/teams"
import { isPublishedMatchup, vsPath } from "@/data/matchups"
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
    description: `Simulated football match: ${title}. Seed ${parsed.seed}. Replay the result or choose another era matchup.`,
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
    <div className="grid gap-5">
      <TrackOnMount
        event="match_simulated"
        payload={{ matchId, home: home.id, away: away.id, seed: parsed.seed }}
      />
      <header className="grid gap-2 text-center sm:text-left">
        <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold">
          <Link href="/" className="hover:text-gold-2">
            Simulator
          </Link>
          <span className="px-2 text-muted">/</span>
          Simulated match
        </p>
        <h1 className="page-title">
          {home.clubName} {home.displaySeason}
          <span className="mx-2 text-gold">vs</span>
          {away.clubName} {away.displaySeason}
        </h1>
      </header>
      <MatchResult match={match} home={home} away={away} />
      <div className="flex flex-wrap gap-2">
        <MatchReplay match={match} home={home} away={away} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <StarPlayers team={home} count={6} title={`${home.clubName} stars`} />
        <StarPlayers team={away} count={6} title={`${away.clubName} stars`} />
      </div>
      <MatchActions home={home} away={away} match={match} />
      <div className="grid gap-6 lg:grid-cols-2">
        <MatchTimeline match={match} home={home} away={away} />
        <MatchStats match={match} />
      </div>
      {match.tacticalNotes.length > 0 ? (
        <ul className="result-panel px-5 py-4 font-mono text-sm leading-7 text-muted">
          {match.tacticalNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
      <CommentaryPanel matchId={match.id} />
      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
        <Link href={teamPath(home)} className="text-gold hover:text-gold-2">
          {home.clubName} {home.displaySeason}
        </Link>
        <Link href={teamPath(away)} className="text-gold hover:text-gold-2">
          {away.clubName} {away.displaySeason}
        </Link>
        {isPublishedMatchup(home.id, away.id) ? (
          <Link href={vsPath(home.id, away.id)} className="text-muted hover:text-gold">Dream match dossier</Link>
        ) : (
          <Link href={`/simulate?home=${home.id}&away=${away.id}`} className="text-muted hover:text-gold">Change matchup</Link>
        )}
      </div>
    </div>
  )
}
