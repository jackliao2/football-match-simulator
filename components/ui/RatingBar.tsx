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
    <div className="grid grid-cols-[7.5rem_2.25rem_1fr] items-center gap-3 font-mono text-sm sm:grid-cols-[8.5rem_2.5rem_1fr]">
      <span className="uppercase tracking-wider text-muted">{label}</span>
      <span className="text-gold">{formatRating(value)}</span>
      <span aria-hidden className="relative h-[5px] bg-line">
        <span
          className="absolute inset-y-0 left-0 bg-gold"
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  )
}
