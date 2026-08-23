import type { Trophy } from "@/types"

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
      className={`flex max-w-full flex-nowrap gap-1 overflow-hidden ${align === "right" ? "justify-end" : ""}`}
    >
      {trophies.map((trophy) => (
        <li
          key={trophy.code}
          title={`${trophy.label} — won this season`}
          className="inline-flex shrink-0 items-center gap-1 border border-gold/45 bg-gold/10 px-1.5 py-[3px] font-mono text-[10px] leading-none text-gold"
        >
          <span className="trophy-mark" aria-hidden />
          {trophy.label}
        </li>
      ))}
    </ul>
  )
}
