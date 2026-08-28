import Link from "next/link"
import { TrackOnMount } from "@/components/TrackOnMount"
import { Formation } from "@/components/teams/Formation"
import { SquadList } from "@/components/teams/SquadList"
import { StarPlayers } from "@/components/teams/StarPlayers"
import { TeamRatings } from "@/components/teams/TeamRatings"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { TrophyBadges } from "@/components/teams/TrophyBadges"
import { eraGlow } from "@/data/trophies"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { defaultOpponent, vsPath } from "@/data/matchups"
import { getPrimeEntity } from "@/data/prime"
import { getTeam, getTeamsByClub } from "@/data/teams"
import { orgIndexPath, orgPath, teamPath } from "@/lib/paths"
import { relatedMatchups, teamPageCopy } from "@/lib/page-copy"
import { absoluteUrl } from "@/lib/site"
import type { HistoricalTeam } from "@/types"

export function HistoricalTeamView({ team }: { team: HistoricalTeam }) {
  const siblings = getTeamsByClub(team.clubId).filter((item) => item.id !== team.id)
  const prime = getPrimeEntity(team.clubId)
  const opponentId = defaultOpponent(team.id)
  const opponent = getTeam(opponentId)
  const popular = relatedMatchups(team, 4)
  const copy = teamPageCopy(team, opponent)
  const indexLabel = team.kind === "nation" ? "National teams" : "Teams"
  const orgHref = orgPath(team.kind, team.clubId)
  const orgIndexHref = orgIndexPath(team.kind)

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
            description: copy.description,
            athlete: team.players.map((player) => ({
              "@type": "Person",
              name: player.name,
            })),
            coach: { "@type": "Person", name: team.manager },
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
              { "@type": "ListItem", position: 1, name: indexLabel, item: absoluteUrl(orgIndexHref) },
              { "@type": "ListItem", position: 2, name: team.clubName, item: absoluteUrl(orgHref) },
              {
                "@type": "ListItem",
                position: 3,
                name: `${team.clubName} ${team.displaySeason}`,
                item: absoluteUrl(teamPath(team)),
              },
            ],
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
          {copy.kicker}
        </p>
        <div className={`flex items-start gap-4 ${eraGlow(team.trophies) ? "era-sheen" : ""}`}>
          <PixelCrest clubId={team.clubId} size={64} />
          <div className="min-w-0 flex-1">
            <h1 className="page-title leading-snug">
              {team.clubName} {team.displaySeason}
            </h1>
            <p className="mt-1 font-mono text-sm text-muted">{copy.deck}</p>
            <p className="mt-0.5 font-mono text-xs text-muted">
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
        <div className="team-essay">
          <p>{team.summary}</p>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link
          href={`/simulate?home=${team.id}&away=${opponentId}`}
          className="rail-btn rail-btn-primary rail-btn-inline"
        >
          Simulate this team
        </Link>
      </header>

      <StarPlayers team={team} count={6} title="Key Players" />
      <Formation team={team} />
      <SquadList team={team} />
      <TeamRatings team={team} />

      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          {copy.playHeading}
        </h2>
        <p className="px-3 py-3 font-mono text-[12px] leading-6 text-muted">{copy.playNotes}</p>
      </section>

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
          <h2 className="section-title">{copy.matchupHeading}</h2>
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
