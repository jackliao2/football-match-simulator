import type { Trophy } from "@/types"

function PixelCup({ size = 10 }: { size?: number }) {
  const cells = [
    0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 1,
    0, 1, 1, 1, 1, 0,
    0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 0,
  ]
  return (
    <span
      aria-hidden
      className="inline-grid shrink-0"
      style={{
        width: size,
        height: Math.round((size * 7) / 6),
        gridTemplateColumns: "repeat(6, 1fr)",
        imageRendering: "pixelated",
      }}
    >
      {cells.map((on, index) => (
        <span key={index} style={{ backgroundColor: on ? "#d4b45a" : "transparent" }} />
      ))}
    </span>
  )
}

export function TrophyBadges({
  trophies,
  align = "left",
}: {
  trophies: Trophy[]
  align?: "left" | "right"
}) {
  if (trophies.length === 0) return null
  return (
    <ul
      className={`flex flex-wrap gap-1 ${align === "right" ? "justify-end" : ""}`}
    >
      {trophies.map((trophy) => (
        <li
          key={trophy.code}
          title={`${trophy.label} ×${trophy.count} by this season`}
          className="inline-flex items-center gap-1 border border-gold/40 bg-gold/10 px-1.5 py-0.5 font-mono text-[10px] leading-none text-gold"
        >
          <PixelCup />
          <span>
            {trophy.label} ×{trophy.count}
          </span>
        </li>
      ))}
    </ul>
  )
}
