import type { Metadata } from "next"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { PageHeader } from "@/components/ui/PageHeader"
import { defaultOpponent } from "@/data/matchups"
import { getTeam, teams, toTeamOption } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"
import { languageAlternates } from "@/lib/i18n"

export const metadata: Metadata = pageMetadata({
  title: "Soccer Match Simulator — Simulate Any Two Teams",
  description:
    "Simulate a custom soccer or football match online. Pick any two historical or current squads for a score, scorers, xG, match events and 100-match win probabilities.",
  path: "/simulate",
  keywords: ["soccer match simulator", "football match simulator", "simulate soccer match", "custom soccer simulator"],
})
metadata.alternates = { canonical: "/simulate", languages: languageAlternates("/simulate") }

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
        title="Simulate a football or soccer match"
        lead="Pick two historical or current squads. The match engine writes the score; Expert AI Analysis explains the matchup but never gets a vote."
      />
      <MatchSetup teams={options} defaultHome={home} defaultAway={away} />
    </div>
  )
}
