import type { Metadata } from "next"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { PageHeader } from "@/components/ui/PageHeader"
import { defaultOpponent } from "@/data/matchups"
import { getTeam, teams, toTeamOption } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Simulate a Football Match",
  description:
    "Pick two historical football teams from any era and simulate a match. See scorers, xG, possession and 100-match probabilities. The engine decides — AI is optional commentary.",
  path: "/simulate",
  keywords: ["simulate football match", "football match simulator", "historical football simulator"],
})

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
    <div className="grid gap-5">
      <PageHeader
        kicker="Match engine"
        title="Simulate a football match"
        lead="Choose two historical teams. The simulation engine decides the score."
      />
      <MatchSetup teams={options} defaultHome={home} defaultAway={away} />
    </div>
  )
}
