import Link from "next/link"
import { TrackOnMount } from "@/components/TrackOnMount"
import { Formation } from "@/components/teams/Formation"
import { SquadList } from "@/components/teams/SquadList"
import { StarPlayers } from "@/components/teams/StarPlayers"
import { TeamRatings } from "@/components/teams/TeamRatings"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { TrophyBadges } from "@/components/teams/TrophyBadges"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { FEATURED_MATCHUPS, defaultOpponent, vsPath } from "@/data/matchups"
import { getPrimeEntity } from "@/data/prime"
import { getTeam, getTeamsByClub, teams } from "@/data/teams"
import { orgIndexPath, orgPath, teamPath } from "@/lib/paths"
import { absoluteUrl } from "@/lib/site"
import type { HistoricalTeam } from "@/types"

export function HistoricalTeamView({ team }: { team: HistoricalTeam }) {
  const siblings = getTeamsByClub(team.clubId).filter((item) => item.id !== team.id)
  const prime = getPrimeEntity(team.clubId)
  const opponentId = defaultOpponent(team.id)
  const opponent = getTeam(opponentId)
  const battles = FEATURED_MATCHUPS.map(([a, b]) => {
    if (a === team.id) return getTeam(b)
    if (b === team.id) return getTeam(a)
    return undefined
  }).filter((item): item is NonNullable<typeof item> => Boolean(item))

  const extraOpponents = teams
    .filter((item) => item.id !== team.id && !battles.some((battle) => battle.id === item.id))
    .slice(0, 2)
  const popular = [...battles, ...extraOpponents].slice(0, 4)
  const indexLabel = team.kind === "nation" ? "National teams" : "Teams"

  return (
    <div className="grid gap-6">
      <TrackOnMount event="team_page_view" payload={{ teamId: team.id, club: team.clubId }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: `${team.clubName} ${team.displaySeason}`,
            sport: "Soccer",
            url: absoluteUrl(teamPath(team)),
            athlete: team.players.map((player) => ({
              "@type": "Person",
              name: player.name,
            })),
            coach: { "@type": "Person", name: team.manager },
          }),
        }}
      />
      <header className="grid gap-3">
        <p className="font-mono text-xs text-muted">
          <Link href={orgIndexPath(team.kind)} className="hover:text-gold">
            {indexLabel}
          </Link>
          <span className="px-2 text-line-hi">/</span>
          <Link href={orgPath(team.kind, team.clubId)} className="hover:text-gold">
            {team.clubName}
          </Link>
        </p>
        <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold">
          {team.kind === "nation" ? "World Cup squad" : "Historical squad"}
        </p>
        <div className="flex items-start gap-4">
          <PixelCrest clubId={team.clubId} size={64} />
          <div className="min-w-0 flex-1">
            <h1 className="font-mono text-xl font-semibold leading-snug tracking-tight sm:text-3xl">
              {team.clubName} {team.displaySeason}
            </h1>
            <p className="mt-1 font-mono text-sm text-muted">
              {team.manager}
              <span className="mx-2 text-line-hi">·</span>
              {team.formation}
            </p>
            <div className="mt-2">
              <TrophyBadges trophies={team.trophies} />
            </div>
          </div>
          <OvrStamp value={team.overallRating} size="xl" />
        </div>
        <p className="max-w-3xl font-mono text-sm leading-6 text-muted">{team.summary}</p>
        <Link
          href={`/simulate?home=${team.id}&away=${opponentId}`}
          className="rail-btn rail-btn-primary rail-btn-inline"
        >
          Simulate this team
        </Link>
      </header>

      <StarPlayers team={team} count={11} />
      <Formation team={team} />
      <SquadList team={team} />
      <TeamRatings team={team} />

      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Style
        </h2>
        <div className="flex flex-wrap gap-1.5 p-3">
          {team.styleTags.map((tag) => (
            <span key={tag} className="border border-white/15 px-2 py-1 font-mono text-[11px] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Achievements
        </h2>
        <ul className="grid gap-1 px-3 py-2 font-mono text-[12px] leading-5">
          {team.achievements.map((item) => (
            <li key={item} className="text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {popular.length > 0 ? (
        <section className="grid gap-2">
          <h2 className="font-mono text-lg font-semibold tracking-tight">Popular matchups</h2>
          {popular.map((other) => (
            <MatchupRow key={other.id} href={vsPath(team.id, other.id)} home={team} away={other} />
          ))}
        </section>
      ) : null}

      <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
        {siblings.map((item) => (
          <Link key={item.id} href={teamPath(item)} className="text-gold hover:text-gold-2">
            {item.displaySeason}
          </Link>
        ))}
        {prime ? (
          <Link href={`/prime/${team.clubId}`} className="text-muted hover:text-gold">
            Prime {team.clubName}
          </Link>
        ) : null}
        {opponent ? (
          <Link href={teamPath(opponent)} className="text-muted hover:text-gold">
            {opponent.clubName} {opponent.displaySeason}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
