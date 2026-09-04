import type { Metadata } from "next"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { PageHeader } from "@/components/ui/PageHeader"
import { defaultOpponent, todaysDebate } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"

const TITLE = "Football Match Simulator — Play Any Two Squads"
const DESCRIPTION =
  "Football match simulator for historical and current squads. Pick two named seasons, get a score, scorers, xG and 100-match probabilities. The engine writes the result; AI only explains it."

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/simulate",
  keywords: [
    "football match simulator",
    "football simulator online",
    "simulate football match",
    "custom football match simulator",
    "match simulator",
    "soccer match simulator",
    "simulate soccer match",
  ],
})

const FAQ = [
  [
    "What is a football match simulator?",
    "A football match simulator lets you pick two squads and play a match decided by ratings, tactics and a random seed. LegendaryMatch is that kind of simulator: every team is a named season, not a badge with a slider.",
  ],
  [
    "Can I simulate a custom football match online?",
    "Yes. Choose any two sides in the catalogue — a 1970 World Cup winner against a 2011 club side, or two current squads — and run one match or 100. The score is not typed by a chatbot.",
  ],
  [
    "Does AI decide the winner?",
    "No. Expert AI Analysis reads the two squads and the 100-match evidence after the engine has already produced the numbers. It cannot vote.",
  ],
  [
    "Is this predicting a real fixture?",
    "No. It is a counterfactual game. Nothing on the page is betting advice or a forecast of Saturday’s result.",
  ],
] as const

export default async function SimulatePage({
  searchParams,
}: PageProps<"/simulate">) {
  const params = await searchParams
  const requestedHome = typeof params.home === "string" ? params.home : undefined
  const requestedAway = typeof params.away === "string" ? params.away : undefined
  const [todayHome, todayAway] = todaysDebate()
  const home = requestedHome && getTeam(requestedHome) ? requestedHome : todayHome
  const away =
    requestedAway && getTeam(requestedAway) && requestedAway !== home
      ? requestedAway
      : requestedHome
        ? defaultOpponent(home)
        : todayAway !== home
          ? todayAway
          : defaultOpponent(home)

  return (
    <div className="grid gap-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `${SITE.name} football match simulator`,
            applicationCategory: "GameApplication",
            operatingSystem: "Web",
            url: absoluteUrl("/simulate"),
            description: DESCRIPTION,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          }),
        }}
      />
      <PageHeader
        kicker="Football match simulator"
        title="Simulate any two squads"
        lead="Pick named seasons, not abstract ratings. The match engine writes the score; Expert AI Analysis explains the matchup afterwards and never gets a vote."
      />
      <MatchSetup
        restoreLast={!requestedHome && !requestedAway}
        defaultHome={home}
        defaultAway={away}
      />
      <section className="grid gap-3 border-t border-white/10 pt-6" aria-labelledby="simulator-guide">
        <div>
          <p className="page-kicker">How a match is actually decided</p>
          <h2 id="simulator-guide" className="section-title mt-1">
            This is a football match simulator, not a chatbot picking a winner
          </h2>
        </div>
        <div className="editorial-copy max-w-3xl">
          <p>
            Every selection on this page is a season with a manager, a formation and an eleven. Barcelona 2008/09 is not interchangeable with Barcelona 2014/15. Brazil 1970 is not a modern athletic upgrade of the same shirt. The engine combines those identities with a seed; repeating the fixture is another plausible night, not a bug.
          </p>
          <p>
            Use it for the arguments people actually type: who would win, which prime was stronger, whether a cup side survives a league champion. If you want the written case before you play, open a compare or prime page. If you want the match, stay here.
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          <article className="result-panel p-4">
            <h3 className="font-brand text-lg font-semibold text-text">Named seasons</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Recent squads are dated snapshots, not live rosters. Historical sides use a representative XI for that campaign, not a fantasy composite of every star who ever wore the shirt.
            </p>
          </article>
          <article className="result-panel p-4">
            <h3 className="font-brand text-lg font-semibold text-text">One score, then a distribution</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              A single result is one night. Expert AI Analysis adds a 100-match spread so a 3–1 does not get mistaken for a law of nature.
            </p>
          </article>
          <article className="result-panel p-4">
            <h3 className="font-brand text-lg font-semibold text-text">Era-relative ratings</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              A 95 in 1970 means dominance in 1970. The methodology page is the longer version. Nothing here is a betting market.
            </p>
          </article>
        </div>
      </section>
      <section className="grid gap-3" aria-labelledby="simulator-faq">
        <h2 id="simulator-faq" className="section-title">Football match simulator FAQ</h2>
        <div className="home-faq-list">
          {FAQ.map(([question, answer]) => (
            <details key={question} className="home-faq-item group">
              <summary>
                {question}
                <span className="home-faq-plus">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
