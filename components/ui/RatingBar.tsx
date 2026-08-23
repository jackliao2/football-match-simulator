import { formatRating } from "@/lib/format"

export function RatingBar({
  label,
  value,
  max = 99,
}: {
  label: string
  value: number
  max?: number
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="grid grid-cols-[6.5rem_2rem_1fr] items-center gap-2 font-mono text-[12px] leading-5 sm:grid-cols-[7.5rem_2.25rem_1fr]">
      <span className="text-muted">{label}</span>
      <span className="tabular-nums text-gold">{formatRating(value)}</span>
      <span aria-hidden className="relative h-[4px] bg-white/10">
        <span
          className="absolute inset-y-0 left-0 bg-gold"
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  )
}
