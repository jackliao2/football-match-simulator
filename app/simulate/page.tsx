import type { Metadata } from "next"
import { MatchSetupGate } from "@/components/simulator/MatchSetupGate"
import { PageHeader } from "@/components/ui/PageHeader"
import { SIMULATE_PAGE } from "@/data/collection-copy"
import { defaultOpponent, todaysDebate } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { languageAlternates } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: SIMULATE_PAGE.title,
  description: SIMULATE_PAGE.description,
  path: "/simulate",
  languages: languageAlternates("/simulate", ["es"]),
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
    "Can I simulate Barcelona 2010/11 against Real Madrid 2016/17?",
    "Yes. Those two sides are named seasons in the catalogue. Pick them, run one match, or open Expert AI Analysis for a 100-match spread. The score comes from ratings, tactics and a seed — not a chatbot.",
  ],
  [
    "Does AI decide the winner?",
    "No. Expert AI Analysis reads the two squads and the 100-match evidence after the engine has already produced the numbers. It cannot vote.",
  ],
  [
    "Is this predicting a real fixture?",
    "No. It is a counterfactual game. Nothing on the page is betting advice or a forecast of Saturday’s result.",
  ],
  [
    "Can I play Brazil 1970 against Spain 2010?",
    "Yes. Brazil 1970, Spain 2010, United 1999 and the rest of the archive are playable sides. Mix a World Cup winner with a club peak; repeating the fixture is another plausible night, not a bug.",
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
            description: SIMULATE_PAGE.description,
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
        kicker={SIMULATE_PAGE.kicker}
        title={SIMULATE_PAGE.h1}
        lead={SIMULATE_PAGE.lead}
        crumbs={[{ href: "/", label: "Home" }, { href: "/simulate", label: "Simulate" }]}
      />
      <MatchSetupGate
        restoreLast={!requestedHome && !requestedAway}
        defaultHome={home}
        defaultAway={away}
      />
      <section className="grid gap-3 border-t border-white/10 pt-6" aria-labelledby="simulator-guide">
        <div>
          <p className="page-kicker">{SIMULATE_PAGE.guideKicker}</p>
          <h2 id="simulator-guide" className="section-title mt-1">
            {SIMULATE_PAGE.guideHeading}
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
        <h2 id="simulator-faq" className="section-title">{SIMULATE_PAGE.faqHeading}</h2>
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
