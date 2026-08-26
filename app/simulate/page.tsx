import type { Metadata } from "next"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { PageHeader } from "@/components/ui/PageHeader"
import { defaultOpponent } from "@/data/matchups"
import { getTeam, teams, toTeamOption } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Simulate a match",
  description:
    "Two squads, one seed. Score, scorers, xG. Run it a hundred times if you want a spread rather than a single 3–1 you will quote all week.",
  path: "/simulate",
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
        lead="Two historical or current squads. The engine writes the score. Commentary is optional and never gets a vote."
      />
      <MatchSetup teams={options} defaultHome={home} defaultAway={away} />
    </div>
  )
}
