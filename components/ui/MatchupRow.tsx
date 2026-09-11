import Link from "next/link"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { TrophyBadges } from "@/components/teams/TrophyBadges"
import { eraGlow } from "@/data/trophies"
import { teamStars } from "@/lib/stars"
import type { HistoricalTeam } from "@/types"

export function MatchupRow({
  href,
  home,
  away,
}: {
  href: string
  home: HistoricalTeam
  away: HistoricalTeam
}) {
  const glow = eraGlow(home.trophies) || eraGlow(away.trophies)
  return (
    <Link
      href={href}
      className={`matchup-row result-panel ${glow ? "era-sheen" : ""}`}
    >
      <MatchupSide team={home} />
      <div className="matchup-vs" aria-hidden="true">
        <span className="matchup-vs-kicker">{home.displaySeason}</span>
        <span className="matchup-vs-mark">{home.clubCode}</span>
        <span className="matchup-vs-cta">Play {home.clubCode}</span>
      </div>
      <MatchupSide team={away} away />
    </Link>
  )
}

function MatchupSide({ team, away = false }: { team: HistoricalTeam; away?: boolean }) {
  const stars = teamStars(team, 3)
    .map((player) => player.shortName)
    .join(" · ")
  const tags = team.styleTags.slice(0, 2)

  return (
    <div className={`matchup-side ${away ? "is-away" : ""}`}>
      <PixelCrest clubId={team.clubId} size={48} />
      <div className="matchup-meta">
        <div className="matchup-club">{team.clubName}</div>
        <div className="matchup-era">
          {team.displaySeason}
          <span className="matchup-dot">·</span>
          {team.manager}
        </div>
        {stars ? <div className="matchup-stars">{stars}</div> : null}
        <div className="matchup-lines">
          <span>
            {team.clubCode} ATK <strong>{team.attackRating}</strong>
          </span>
          <span>
            {team.clubCode} MID <strong>{team.midfieldRating}</strong>
          </span>
          <span>
            {team.clubCode} DEF <strong>{team.defenseRating}</strong>
          </span>
        </div>
        {tags.length > 0 ? (
          <div className="matchup-tags">
            {tags.map((tag) => (
              <span key={tag}>
                {team.clubCode} {tag}
              </span>
            ))}
          </div>
        ) : null}
        {team.trophies.length > 0 ? (
          <div className="matchup-cups">
            <TrophyBadges trophies={team.trophies} align={away ? "right" : "left"} />
          </div>
        ) : null}
      </div>
      <div className="matchup-ovr">
        <strong>{team.overallRating}</strong>
        <span>{team.clubCode}</span>
      </div>
    </div>
  )
}
