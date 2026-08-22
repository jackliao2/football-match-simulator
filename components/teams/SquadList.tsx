import { PixelFlag } from "@/components/teams/PixelFlag"
import { StatTip } from "@/components/teams/StatTip"
import { faceStats } from "@/lib/player-stats"
import { nationOf } from "@/lib/nationality"
import type { HistoricalTeam, Player } from "@/types"

function PlayerRow({
  player,
  team,
  starter,
}: {
  player: Player
  team: HistoricalTeam
  starter: boolean
}) {
  const stats = faceStats(player)
  const nation = player.nation ?? nationOf(player.name, team)
  return (
    <li className="relative z-0 grid grid-cols-[1.2rem_2.6rem_1fr_2.4rem] items-center gap-2 border-b border-line/80 px-3 py-2 last:border-b-0 hover:z-20 hover:bg-panel-2/80 focus-within:z-20 sm:px-4">
      <PixelFlag code={nation} size={15} />
      <span className="font-mono text-[10px] tracking-wider text-gold">{player.position}</span>
      <span className={`truncate ${starter ? "text-text" : "text-muted"}`}>
        {player.name}
        {starter ? <span className="ml-2 text-[10px] uppercase tracking-wider text-gold">XI</span> : null}
      </span>
      <span className="text-right">
        <StatTip overall={player.overall} stats={stats} />
      </span>
    </li>
  )
}

export function SquadList({ team }: { team: HistoricalTeam }) {
  const starting = new Set(team.startingXI)
  const xi = team.startingXI
    .map((id) => team.players.find((player) => player.id === id))
    .filter((player): player is Player => Boolean(player))
  const rest = team.players.filter((player) => !starting.has(player.id))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="border-2 border-line bg-panel pixel-border">
        <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
          Starting XI
        </h2>
        <ol>
          {xi.map((player) => (
            <PlayerRow key={player.id} player={player} team={team} starter />
          ))}
        </ol>
      </section>
      <section className="border-2 border-line bg-panel pixel-border">
        <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
          Full Squad
        </h2>
        <ol>
          {rest.map((player) => (
            <PlayerRow key={player.id} player={player} team={team} starter={false} />
          ))}
        </ol>
      </section>
    </div>
  )
}
