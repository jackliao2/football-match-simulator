import { RatingBar } from "@/components/ui/RatingBar"
import type { HistoricalTeam } from "@/types"

const AXES = [
  { key: "possession", label: "Possession" },
  { key: "pressing", label: "Pressing" },
  { key: "tempo", label: "Tempo" },
  { key: "counterAttack", label: "Counter" },
  { key: "width", label: "Width" },
  { key: "aerialThreat", label: "Aerial" },
] as const

export function StyleProfile({ team }: { team: HistoricalTeam }) {
  const values = AXES.map((axis) => team[axis.key])
  const points = values.map((value, index) => polar(value, index, values.length)).join(" ")
  const rings = [25, 50, 75, 100]

  return (
    <section className="result-panel">
      <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
        How the model treats this XI
      </h2>
      <div className="grid gap-4 px-3 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center">
        <svg viewBox="0 0 120 120" className="style-radar mx-auto w-40" role="img" aria-label={`${team.clubName} ${team.displaySeason} tactical profile`}>
          {rings.map((ring) => (
            <polygon
              key={ring}
              points={AXES.map((_, index) => polar(ring, index, AXES.length)).join(" ")}
              className="fill-none stroke-white/10"
              strokeWidth="0.6"
            />
          ))}
          {AXES.map((axis, index) => {
            const edge = polarPoint(42, index, AXES.length)
            const label = polarPoint(52, index, AXES.length)
            return (
              <g key={axis.key}>
                <line x1="60" y1="60" x2={edge.x} y2={edge.y} className="stroke-white/10" strokeWidth="0.6" />
                <text x={label.x} y={label.y} className="fill-[color:var(--color-muted)]" fontSize="5" textAnchor="middle" dominantBaseline="middle">
                  {axis.label.slice(0, 4)}
                </text>
              </g>
            )
          })}
          <polygon points={points} className="fill-gold/25 stroke-gold" strokeWidth="1.2" />
        </svg>
        <div className="grid gap-1">
          {AXES.map((axis) => (
            <RatingBar key={axis.key} label={axis.label} value={team[axis.key]} />
          ))}
        </div>
      </div>
    </section>
  )
}

function polarPoint(radius: number, index: number, count: number) {
  const angle = (Math.PI * 2 * index) / count - Math.PI / 2
  return {
    x: 60 + Math.cos(angle) * radius,
    y: 60 + Math.sin(angle) * radius,
  }
}

function polar(value: number, index: number, count: number): string {
  const point = polarPoint((Math.max(0, Math.min(100, value)) / 100) * 42, index, count)
  return `${point.x.toFixed(1)},${point.y.toFixed(1)}`
}
