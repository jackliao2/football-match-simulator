import { formatXg } from "@/lib/format"
import type { SimulatedMatch } from "@/types"

function StatRow({
  label,
  home,
  away,
  emphasize,
}: {
  label: string
  home: string
  away: string
  emphasize?: boolean
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0">
      <span className={`text-right font-mono ${emphasize ? "text-gold" : "text-text"}`}>{home}</span>
      <span className="min-w-[7rem] text-center font-display text-[10px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <span className={`font-mono ${emphasize ? "text-gold" : "text-text"}`}>{away}</span>
    </div>
  )
}

export function MatchStats({ match }: { match: SimulatedMatch }) {
  const s = match.stats
  return (
    <section className="border-2 border-line bg-panel">
      <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
        Match Statistics
      </h2>
      <StatRow label="Possession" home={`${s.possession[0]}%`} away={`${s.possession[1]}%`} />
      <StatRow label="Shots" home={String(s.shots[0])} away={String(s.shots[1])} />
      <StatRow label="On Target" home={String(s.shotsOnTarget[0])} away={String(s.shotsOnTarget[1])} />
      <StatRow label="xG" home={formatXg(s.xg[0])} away={formatXg(s.xg[1])} emphasize />
      <StatRow label="Corners" home={String(s.corners[0])} away={String(s.corners[1])} />
      <StatRow label="Fouls" home={String(s.fouls[0])} away={String(s.fouls[1])} />
      <StatRow label="Yellows" home={String(s.yellowCards[0])} away={String(s.yellowCards[1])} />
      <StatRow label="Reds" home={String(s.redCards[0])} away={String(s.redCards[1])} />
    </section>
  )
}
