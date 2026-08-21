import type { Metadata } from "next"
import { TeamCard } from "@/components/teams/TeamCard"
import { PixelButton } from "@/components/ui/PixelButton"
import { clubs } from "@/data/clubs"
import { getTeamsByClub } from "@/data/teams"

export const metadata: Metadata = {
  title: "Historical Football Teams",
  description:
    "Browse legendary historical football squads by club and season. Open a team page for lineup, formation and ratings, then simulate a match.",
  alternates: { canonical: "/teams" },
}

export default function TeamsPage() {
  return (
    <div className="grid gap-10">
      <header className="grid gap-3">
        <h1 className="font-display text-lg uppercase tracking-[0.08em] sm:text-xl">
          Historical Teams
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Every page is a squad, lineup, formation and ratings cluster for that club and season —
          then a doorway into the match simulator.
        </p>
        <PixelButton href="/national-teams" variant="ghost" className="w-fit">
          National teams
        </PixelButton>
      </header>
      {clubs.map((club) => {
        const clubTeams = getTeamsByClub(club.id)
        if (clubTeams.length === 0) return null
        return (
          <section key={club.id} className="grid gap-4">
            <h2 className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">
              {club.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clubTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
