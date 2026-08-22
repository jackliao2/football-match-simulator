import type { Metadata } from "next"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { defaultOpponent } from "@/data/matchups"
import { getTeam, teams, toTeamOption } from "@/data/teams"

export const metadata: Metadata = {
  title: "Simulate a Football Match",
  description:
    "Pick two historical football teams from any era and simulate a match. See scorers, xG, possession and 100-match probabilities.",
  alternates: { canonical: "/simulate" },
}

export default async function SimulatePage({
  searchParams,
}: PageProps<"/simulate">) {
  const params = await searchParams
  const requestedHome = typeof params.home === "string" ? params.home : undefined
  const requestedAway = typeof params.away === "string" ? params.away : undefined
  const home = requestedHome && getTeam(requestedHome) ? requestedHome : "barcelona-2008-09"
  const away =
    requestedAway && getTeam(requestedAway) && requestedAway !== home
      ? requestedAway
      : defaultOpponent(home)

  const options = teams.map(toTeamOption)

  return (
    <div className="mx-auto grid max-w-6xl gap-5">
      <header className="grid gap-1.5 text-center">
        <h1 className="font-display text-[13px] uppercase tracking-[0.08em] sm:text-xl">
          Simulate Match
        </h1>
        <p className="text-sm text-muted">
          Choose two historical teams. The engine decides the result.
        </p>
      </header>
      <MatchSetup teams={options} defaultHome={home} defaultAway={away} />
    </div>
  )
}
