import type { Metadata } from "next"
import Link from "next/link"
import { FEATURED_MATCHUPS, vsPath } from "@/data/matchups"
import { getTeam } from "@/data/teams"

export const metadata: Metadata = {
  title: "Dream Matches",
  description:
    "Simulate legendary dream matches: Barcelona 2008/09 vs Real Madrid 2016/17, Brazil 2002 vs Argentina 2022, and more historical football matchups.",
  alternates: { canonical: "/vs" },
}

export default function VsIndexPage() {
  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <h1 className="font-display text-[13px] uppercase tracking-[0.08em] sm:text-xl">
          Dream Matches
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted">
          Indexable matchup pages. Each one shows model probabilities from many simulations — not a
          single random score presented as fact.
        </p>
      </header>
      <div className="grid gap-3">
        {FEATURED_MATCHUPS.map(([homeId, awayId]) => {
          const home = getTeam(homeId)
          const away = getTeam(awayId)
          if (!home || !away) return null
          return (
            <Link
              key={`${homeId}-${awayId}`}
              href={vsPath(homeId, awayId)}
              className="grid gap-2 border-2 border-line bg-panel p-4 no-underline hover:border-gold sm:grid-cols-[1fr_auto_1fr] sm:items-center"
            >
              <span>
                <span className="block font-display text-[11px] uppercase tracking-wide">
                  {home.clubName}
                </span>
                <span className="text-sm text-muted">{home.displaySeason}</span>
              </span>
              <span className="font-display text-[10px] tracking-[0.3em] text-gold">VS</span>
              <span className="sm:text-right">
                <span className="block font-display text-[11px] uppercase tracking-wide">
                  {away.clubName}
                </span>
                <span className="text-sm text-muted">{away.displaySeason}</span>
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
