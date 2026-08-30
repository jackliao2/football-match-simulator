import type { Metadata } from "next"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { PageHeader } from "@/components/ui/PageHeader"
import { defaultOpponent } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"
import { languageAlternates } from "@/lib/i18n"

export const metadata: Metadata = pageMetadata({
  title: "Soccer Match Simulator — Simulate Any Two Teams",
  description:
    "Simulate a custom soccer or football match online. Pick any two squads from different seasons for a score, scorers, xG, match events and 100-match win probabilities.",
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


  return (
    <div className="grid gap-5">
      <PageHeader
        kicker="Match engine"
        title="Simulate a football or soccer match"
        lead="Pick two squads from any available season. The match engine writes the score; Expert AI Analysis explains the matchup but never gets a vote."
      />
      <MatchSetup defaultHome={home} defaultAway={away} />
      <section className="grid gap-3 border-t border-white/10 pt-6" aria-labelledby="simulator-guide">
        <div>
          <p className="page-kicker">Before kick-off</p>
          <h2 id="simulator-guide" className="section-title mt-1">What this football simulator is comparing</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          <article className="result-panel p-4">
            <h3 className="font-brand text-lg font-semibold text-text">A named team, not a badge</h3>
            <p className="mt-2 text-sm leading-7 text-muted">Every selection belongs to a season or tournament cycle. Barcelona 2008/09 and Barcelona 2014/15 have different players, managers and tactical ratings. Recent squads are dated snapshots rather than live rosters.</p>
          </article>
          <article className="result-panel p-4">
            <h3 className="font-brand text-lg font-semibold text-text">One score is one possible night</h3>
            <p className="mt-2 text-sm leading-7 text-muted">The engine uses a random seed alongside player quality, team strength and style. Repeating the matchup can produce another credible score. A shared result link keeps the seed so the same events can be opened again.</p>
          </article>
          <article className="result-panel p-4">
            <h3 className="font-brand text-lg font-semibold text-text">AI explains after the model</h3>
            <p className="mt-2 text-sm leading-7 text-muted">Expert AI Analysis receives the selected squads and model output, then writes a tactical reading. It cannot change the winner. Ratings are editorial and era-relative; the full assumptions are documented in our methodology.</p>
          </article>
        </div>
        <div className="editorial-copy">
          <p><strong>For historical matchups:</strong> read the formation and starting XI before treating the overall number as a verdict. A side with a lower rating may still have the tactical profile to trouble a stronger opponent.</p>
          <p><strong>For current teams:</strong> this is not a prediction of the next scheduled fixture and nothing on the page is betting advice. It is a fictional game between the two named datasets.</p>
        </div>
      </section>
    </div>
  )
}
