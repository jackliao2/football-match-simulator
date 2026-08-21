import Link from "next/link"
import { TrackOnMount } from "@/components/TrackOnMount"
import { PixelButton } from "@/components/ui/PixelButton"
import { Formation } from "@/components/teams/Formation"
import { SquadList } from "@/components/teams/SquadList"
import { TeamRatings } from "@/components/teams/TeamRatings"
import { FEATURED_MATCHUPS, defaultOpponent, vsPath } from "@/data/matchups"
import { getPrimeEntity } from "@/data/prime"
import { getTeam, getTeamsByClub, teams } from "@/data/teams"
import { orgIndexPath, orgPath, teamPath } from "@/lib/paths"
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
  const keyPlayers = [...team.players].sort((a, b) => b.overall - a.overall).slice(0, 6)
  const indexLabel = team.kind === "nation" ? "National teams" : "Teams"

  return (
    <div className="grid gap-8">
      <TrackOnMount event="team_page_view" payload={{ teamId: team.id, club: team.clubId }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: `${team.clubName} ${team.displaySeason}`,
            sport: "Soccer",
            athlete: team.players.map((player) => ({
              "@type": "Person",
              name: player.name,
            })),
          }),
        }}
      />
      <header className="grid gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <Link href={orgIndexPath(team.kind)} className="hover:text-gold">
            {indexLabel}
          </Link>
          <span className="px-2">/</span>
          <Link href={orgPath(team.kind, team.clubId)} className="hover:text-gold">
            {team.clubName}
          </Link>
        </p>
        <h1 className="font-display text-[13px] uppercase leading-relaxed tracking-[0.08em] sm:text-xl md:text-2xl">
          {team.clubName} {team.displaySeason}
        </h1>
        <p className="text-sm text-muted">Squad, Starting XI, Formation & Team Ratings</p>
        <p className="max-w-3xl text-sm leading-7 text-text">{team.summary}</p>
      </header>

      <PixelButton
        href={`/simulate?home=${team.id}&away=${opponentId}`}
        variant="primary"
        size="lg"
        className="w-full sm:w-fit"
      >
        Simulate {team.clubName} {team.displaySeason}
      </PixelButton>

      <Formation team={team} />
      <SquadList team={team} />

      <div className="grid gap-6 lg:grid-cols-2">
        <TeamRatings team={team} />
        <section className="border-2 border-line bg-panel">
          <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
            Key Players
          </h2>
          <ul>
            {keyPlayers.map((player) => (
              <li
                key={player.id}
                className="grid grid-cols-[3rem_1fr_3rem] gap-2 border-b border-line px-4 py-2 last:border-b-0"
              >
                <span className="text-xs text-muted">{player.position}</span>
                <span>{player.name}</span>
                <span className="text-right text-gold">{player.overall}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="border-2 border-line bg-panel">
        <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
          Playing Style
        </h2>
        <div className="flex flex-wrap gap-2 p-4">
          {team.styleTags.map((tag) => (
            <span key={tag} className="border border-line-hi px-3 py-2 text-xs uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="border-2 border-line bg-panel">
        <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
          Season Achievements
        </h2>
        <ul className="list-disc px-8 py-4 text-sm leading-7">
          {team.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3">
        <h2 className="font-display text-[11px] uppercase tracking-[0.16em] text-gold">
          Popular Battles
        </h2>
        <div className="grid gap-3">
          {popular.map((other) => (
            <Link
              key={other.id}
              href={vsPath(team.id, other.id)}
              className="flex flex-wrap items-center justify-between gap-2 border-2 border-line bg-panel p-4 no-underline hover:border-gold"
            >
              <span>
                {team.clubName} {team.displaySeason}
              </span>
              <span className="font-display text-[10px] text-gold">VS</span>
              <span>
                {other.clubName} {other.displaySeason}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        {siblings.map((item) => (
          <PixelButton key={item.id} href={teamPath(item)}>
            {item.displaySeason}
          </PixelButton>
        ))}
        {prime ? (
          <PixelButton href={`/prime/${team.clubId}`} variant="ghost">
            Prime {team.clubName}
          </PixelButton>
        ) : null}
        {opponent ? (
          <PixelButton href={teamPath(opponent)} variant="ghost">
            {opponent.clubName} {opponent.displaySeason}
          </PixelButton>
        ) : null}
      </div>
    </div>
  )
}
