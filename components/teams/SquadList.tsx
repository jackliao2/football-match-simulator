import { PixelFlag } from "@/components/teams/PixelFlag"
import { StatStrip } from "@/components/teams/StatTip"
import { faceStats } from "@/lib/player-stats"
import { nationOf } from "@/lib/nationality"
import { ovrTone } from "@/lib/stars"
import type { HistoricalTeam, Player } from "@/types"

function PlayerRow({
  player,
  team,
  dim,
}: {
  player: Player
  team: HistoricalTeam
  dim?: boolean
}) {
  const stats = faceStats(player)
  const nation = player.nation ?? nationOf(player.name, team)
  return (
    <li tabIndex={0} className="group relative z-0 cursor-help outline-none hover:z-30 focus:z-30">
      <div className="faceoff-player">
        <span className="font-mono text-[10px] font-medium tracking-wider text-gold">{player.position}</span>
        <span className={`flex min-w-0 items-center gap-1.5 ${dim ? "text-muted" : "text-text"}`}>
          <span className="min-w-0 truncate font-mono text-[13px] font-medium leading-none">{player.name}</span>
          <PixelFlag code={nation} size={14} />
        </span>
        <span className={`justify-self-end font-mono text-[13px] font-medium tabular-nums ${ovrTone(player.overall)}`}>
          {player.overall}
        </span>
      </div>
      <div className="pointer-events-none absolute top-[calc(100%-2px)] right-0 left-0 z-30 hidden border border-gold bg-ink px-2 py-2 shadow-[4px_4px_0_0_#000] group-hover:block group-focus:block">
        <p className="mb-1.5 truncate font-mono text-xs text-text">{player.name}</p>
        <StatStrip stats={stats} />
      </div>
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
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Starting XI
        </h2>
        <ol className="p-1">
          {xi.map((player) => (
            <PlayerRow key={player.id} player={player} team={team} />
          ))}
        </ol>
      </section>
      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Bench
        </h2>
        <ol className="p-1">
          {rest.map((player) => (
            <PlayerRow key={player.id} player={player} team={team} dim />
          ))}
        </ol>
      </section>
    </div>
  )
}
