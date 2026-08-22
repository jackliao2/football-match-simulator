import { PixelFlag } from "@/components/teams/PixelFlag"
import { StatTip } from "@/components/teams/StatTip"
import { type SquadMember } from "@/lib/stars"

export function SquadPanel({
  squad,
  teamOvr,
}: {
  squad: SquadMember[]
  teamOvr: number
}) {
  const xi = squad.filter((player) => player.starter)
  const bench = squad.filter((player) => !player.starter)

  return (
    <div className="overflow-hidden border-2 border-line bg-ink/50">
      <div className="flex items-center justify-between border-b-2 border-line bg-panel-2 px-3 py-2">
        <span className="font-display text-[9px] uppercase tracking-[0.16em] text-gold">Squad</span>
        <span className="font-mono text-xs text-gold">OVR {teamOvr}</span>
      </div>
      <div className="squad-scroll max-h-[22rem] overflow-y-auto overflow-x-visible">
        <p className="sticky top-0 z-10 bg-panel px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.14em] text-muted">
          Starting XI
        </p>
        <ul>
          {xi.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </ul>
        {bench.length > 0 ? (
          <>
            <p className="sticky top-0 z-10 border-t border-line bg-panel px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.14em] text-muted">
              Bench
            </p>
            <ul>
              {bench.map((player) => (
                <PlayerRow key={player.id} player={player} dim />
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  )
}

export function CompactSquad({
  squad,
  showBench = true,
}: {
  squad: SquadMember[]
  showBench?: boolean
}) {
  const xi = squad.filter((player) => player.starter)
  const bench = squad.filter((player) => !player.starter)

  return (
    <div className="grid gap-2">
      <p className="font-display text-[8px] uppercase tracking-[0.16em] text-muted">Starting XI</p>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {xi.map((player) => (
          <MiniRow key={player.id} player={player} />
        ))}
      </ul>
      {showBench && bench.length > 0 ? (
        <>
          <p className="font-display text-[8px] uppercase tracking-[0.16em] text-muted">Bench</p>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
            {bench.map((player) => (
              <MiniRow key={player.id} player={player} dim />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

function MiniRow({ player, dim }: { player: SquadMember; dim?: boolean }) {
  return (
    <li className="relative z-0 flex items-center justify-between gap-1 font-mono text-[11px] leading-5 hover:z-20 focus-within:z-20">
      <span className={`flex min-w-0 items-center gap-1 ${dim ? "text-muted" : "text-text"}`}>
        <PixelFlag code={player.nation} size={13} />
        <span className="shrink-0 text-[9px] text-muted">{player.position}</span>
        <span className="truncate">{player.shortName}</span>
      </span>
      <StatTip overall={player.overall} stats={player.stats} size="sm" />
    </li>
  )
}

function PlayerRow({ player, dim }: { player: SquadMember; dim?: boolean }) {
  return (
    <li className="relative z-0 grid grid-cols-[1.1rem_2.4rem_1fr_2.1rem] items-center gap-2 border-b border-line/80 px-3 py-1.5 font-mono text-xs last:border-b-0 hover:z-20 hover:bg-panel-2/70 focus-within:z-20">
      <PixelFlag code={player.nation} size={14} />
      <span className="text-muted">{player.position}</span>
      <span className={`truncate ${dim ? "text-muted" : "text-text"}`}>{player.name}</span>
      <span className="text-right">
        <StatTip overall={player.overall} stats={player.stats} size="sm" />
      </span>
    </li>
  )
}
