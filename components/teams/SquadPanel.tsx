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

export function FaceOffSquad({
  squad,
  align = "left",
}: {
  squad: SquadMember[]
  align?: "left" | "right"
}) {
  const xi = squad.filter((player) => player.starter)
  const bench = squad.filter((player) => !player.starter)
  const away = align === "right"

  return (
    <div className="grid gap-1.5">
      <p
        className={`font-display text-[9px] uppercase tracking-[0.18em] text-gold ${away ? "text-right" : ""}`}
      >
        Starting XI
      </p>
      <ul className="grid gap-[3px]">
        {xi.map((player) => (
          <FaceRow key={player.id} player={player} align={align} />
        ))}
      </ul>
      {bench.length > 0 ? (
        <>
          <p
            className={`mt-2 font-display text-[9px] uppercase tracking-[0.18em] text-muted ${away ? "text-right" : ""}`}
          >
            Bench
          </p>
          <ul className="grid gap-[3px]">
            {bench.map((player) => (
              <FaceRow key={player.id} player={player} align={align} dim />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

function FaceRow({
  player,
  dim,
  align,
}: {
  player: SquadMember
  dim?: boolean
  align: "left" | "right"
}) {
  const away = align === "right"
  const name = (
    <span className={`min-w-0 truncate font-mono text-[13px] font-medium leading-none ${dim ? "text-muted" : "text-text"}`}>
      {player.shortName}
    </span>
  )
  const pos = (
    <span className="font-mono text-[10px] font-medium tracking-wider text-gold">{player.position}</span>
  )
  const flag = <PixelFlag code={player.nation} size={14} />
  const ovr = (
    <span className={away ? "justify-self-start" : "justify-self-end"}>
      <StatTip overall={player.overall} stats={player.stats} size="md" />
    </span>
  )

  return (
    <li
      className={`faceoff-player relative z-0 hover:z-20 hover:bg-white/10 focus-within:z-20 ${away ? "away" : "home"}`}
    >
      {away ? (
        <>
          {ovr}
          {name}
          {pos}
          {flag}
        </>
      ) : (
        <>
          {flag}
          {pos}
          {name}
          {ovr}
        </>
      )}
    </li>
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
