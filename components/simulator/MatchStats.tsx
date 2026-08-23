import { formatXg } from "@/lib/format"
import type { SimulatedMatch } from "@/types"

function StatRow({
  label,
  home,
  away,
  homeValue,
  awayValue,
  emphasize,
}: {
  label: string
  home: string
  away: string
  homeValue: number
  awayValue: number
  emphasize?: boolean
}) {
  const total = homeValue + awayValue
  const homePct = total === 0 ? 50 : (homeValue / total) * 100
  return (
    <div className="border-b border-white/10 px-4 py-3 last:border-b-0">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span className={`text-right font-mono ${emphasize ? "text-gold" : "text-text"}`}>{home}</span>
        <span className="min-w-[7rem] text-center font-display text-[8px] uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        <span className={`font-mono ${emphasize ? "text-gold" : "text-text"}`}>{away}</span>
      </div>
      <div className="mt-2 flex h-[5px] overflow-hidden bg-white/10">
        <span className="h-full bg-gold" style={{ width: `${homePct}%` }} />
        <span className="h-full bg-danger" style={{ width: `${100 - homePct}%` }} />
      </div>
    </div>
  )
}

export function MatchStats({ match }: { match: SimulatedMatch }) {
  const s = match.stats
  return (
    <section className="result-panel">
      <h2 className="border-b border-white/10 px-4 py-3 font-mono text-lg font-semibold tracking-tight">
        <span className="mb-1 block font-display text-[8px] uppercase tracking-[0.22em] text-gold">Statistics</span>
        Match stats
      </h2>
      <StatRow
        label="Possession"
        home={`${s.possession[0]}%`}
        away={`${s.possession[1]}%`}
        homeValue={s.possession[0]}
        awayValue={s.possession[1]}
      />
      <StatRow
        label="Shots"
        home={String(s.shots[0])}
        away={String(s.shots[1])}
        homeValue={s.shots[0]}
        awayValue={s.shots[1]}
      />
      <StatRow
        label="On Target"
        home={String(s.shotsOnTarget[0])}
        away={String(s.shotsOnTarget[1])}
        homeValue={s.shotsOnTarget[0]}
        awayValue={s.shotsOnTarget[1]}
      />
      <StatRow
        label="xG"
        home={formatXg(s.xg[0])}
        away={formatXg(s.xg[1])}
        homeValue={s.xg[0]}
        awayValue={s.xg[1]}
        emphasize
      />
      <StatRow
        label="Corners"
        home={String(s.corners[0])}
        away={String(s.corners[1])}
        homeValue={s.corners[0]}
        awayValue={s.corners[1]}
      />
      <StatRow
        label="Fouls"
        home={String(s.fouls[0])}
        away={String(s.fouls[1])}
        homeValue={s.fouls[0]}
        awayValue={s.fouls[1]}
      />
      <StatRow
        label="Yellows"
        home={String(s.yellowCards[0])}
        away={String(s.yellowCards[1])}
        homeValue={s.yellowCards[0]}
        awayValue={s.yellowCards[1]}
      />
      <StatRow
        label="Reds"
        home={String(s.redCards[0])}
        away={String(s.redCards[1])}
        homeValue={s.redCards[0]}
        awayValue={s.redCards[1]}
      />
    </section>
  )
}
