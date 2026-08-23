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
    <div className="grid grid-cols-[3rem_1fr_3rem] items-center gap-2 px-3 py-1 font-mono text-[12px] leading-5">
      <span className={`text-right tabular-nums ${emphasize ? "text-gold" : "text-text"}`}>{home}</span>
      <span className="text-center font-display text-[8px] uppercase tracking-[0.12em] text-muted">{label}</span>
      <span className={`tabular-nums ${emphasize ? "text-gold" : "text-text"}`}>{away}</span>
    </div>
  )
}

export function MatchStats({ match }: { match: SimulatedMatch }) {
  const s = match.stats
  return (
    <section className="result-panel">
      <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
        Stats
      </h2>
      <StatRow label="Possession" home={`${s.possession[0]}%`} away={`${s.possession[1]}%`} />
      <StatRow label="Shots" home={String(s.shots[0])} away={String(s.shots[1])} />
      <StatRow label="On target" home={String(s.shotsOnTarget[0])} away={String(s.shotsOnTarget[1])} />
      <StatRow label="xG" home={formatXg(s.xg[0])} away={formatXg(s.xg[1])} emphasize />
      <StatRow label="Corners" home={String(s.corners[0])} away={String(s.corners[1])} />
      <StatRow label="Fouls" home={String(s.fouls[0])} away={String(s.fouls[1])} />
      <StatRow label="Yellows" home={String(s.yellowCards[0])} away={String(s.yellowCards[1])} />
      <StatRow label="Reds" home={String(s.redCards[0])} away={String(s.redCards[1])} />
    </section>
  )
}
