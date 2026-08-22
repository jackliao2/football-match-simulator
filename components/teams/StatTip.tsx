import { statTone, statsSummary, type FaceStats } from "@/lib/player-stats"
import { ovrTone } from "@/lib/stars"

export function StatStrip({ stats }: { stats: FaceStats }) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[10px] leading-none sm:gap-x-2.5 sm:text-[11px]">
      {stats.items.map((item) => (
        <span key={item.key} className="inline-flex items-baseline gap-1">
          <span className="text-[9px] tracking-wider text-muted">{item.key}</span>
          <span className={`tabular-nums ${statTone(item.value)}`}>{item.value}</span>
        </span>
      ))}
    </span>
  )
}

export function StatTip({
  overall,
  stats,
  size = "md",
}: {
  overall: number
  stats: FaceStats
  size?: "sm" | "md" | "lg"
}) {
  const number =
    size === "lg" ? "text-base sm:text-lg" : size === "sm" ? "text-[11px]" : "text-sm"
  return (
    <span className="group relative inline-flex justify-end">
      <span
        tabIndex={0}
        title={statsSummary(stats)}
        className={`cursor-help font-mono tabular-nums ${number} ${ovrTone(overall)}`}
      >
        {overall}
      </span>
      <span className="pointer-events-none absolute right-0 bottom-[calc(100%+8px)] z-30 hidden w-[11rem] grid-cols-2 gap-x-3 gap-y-1 border-2 border-gold bg-ink px-2.5 py-2 shadow-[4px_4px_0_0_#000] group-focus-within:grid group-hover:grid">
        {stats.items.map((item) => (
          <span key={item.key} className="flex justify-between gap-2 font-mono text-[10px] leading-4">
            <span className="tracking-wider text-muted">{item.key}</span>
            <span className={statTone(item.value)}>{item.value}</span>
          </span>
        ))}
      </span>
    </span>
  )
}
