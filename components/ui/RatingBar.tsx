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
  const blocks = 14
  const filled = Math.max(0, Math.min(blocks, Math.round((value / max) * blocks)))
  return (
    <div className="grid grid-cols-[9rem_2.5rem_1fr] items-center gap-3 font-mono text-sm sm:grid-cols-[10rem_2.5rem_1fr]">
      <span className="uppercase tracking-wider text-muted">{label}</span>
      <span className="text-gold">{formatRating(value)}</span>
      <span aria-hidden className="flex gap-[3px]">
        {Array.from({ length: blocks }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 ${i < filled ? "bg-home" : "bg-line"}`}
          />
        ))}
      </span>
    </div>
  )
}
