import type { Metadata } from "next"
import { TeamCard } from "@/components/teams/TeamCard"
import { nations } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"

export const metadata: Metadata = {
  title: "Historical National Teams",
  description:
    "Legendary World Cup sides — Brazil 1970, Brazil 2002, Argentina 1986, Argentina 2022, France, Spain, Germany, Italy and the Netherlands. Simulate them against any era.",
  alternates: { canonical: "/national-teams" },
}

export default function NationalTeamsPage() {
  return (
    <div className="grid gap-10">
      <header className="grid gap-3">
        <h1 className="font-display text-[13px] uppercase tracking-[0.08em] sm:text-xl">
          National Teams
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          World Cup sides as historical teams. Same database, same simulator, different eras.
        </p>
      </header>
      {nations.map((nation) => {
        const nationTeams = getTeamsByClub(nation.id)
        if (nationTeams.length === 0) return null
        return (
          <section key={nation.id} className="grid gap-4">
            <h2 className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">
              {nation.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nationTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
