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
        <span className="matchup-vs-kicker">Who wins</span>
        <span className="matchup-vs-mark">VS</span>
        <span className="matchup-vs-cta">Simulate</span>
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
            ATK <strong>{team.attackRating}</strong>
          </span>
          <span>
            MID <strong>{team.midfieldRating}</strong>
          </span>
          <span>
            DEF <strong>{team.defenseRating}</strong>
          </span>
        </div>
        {tags.length > 0 ? (
          <div className="matchup-tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
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
        <span>OVR</span>
      </div>
    </div>
  )
}
