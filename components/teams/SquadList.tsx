import type { HistoricalTeam, Player } from "@/types"

function PlayerRow({ player, starter }: { player: Player; starter: boolean }) {
  return (
    <li className="grid grid-cols-[3rem_1fr_3rem] items-center gap-2 border-b border-line px-3 py-2 last:border-b-0">
      <span className="font-mono text-xs text-muted">{player.position}</span>
      <span className={starter ? "text-text" : "text-muted"}>
        {player.name}
        {starter ? <span className="ml-2 text-[10px] uppercase tracking-wider text-gold">XI</span> : null}
      </span>
      <span className="text-right font-mono text-sm text-gold">{player.overall}</span>
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
      <section className="border-2 border-line bg-panel">
        <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
          Starting XI
        </h2>
        <ol>
          {xi.map((player) => (
            <PlayerRow key={player.id} player={player} starter />
          ))}
        </ol>
      </section>
      <section className="border-2 border-line bg-panel">
        <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
          Full Squad
        </h2>
        <ol>
          {rest.map((player) => (
            <PlayerRow key={player.id} player={player} starter={false} />
          ))}
        </ol>
      </section>
    </div>
  )
}
