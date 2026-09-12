import Link from "next/link"
import { MatchSetupGate } from "@/components/simulator/MatchSetupGate"
import {
  HOMEPAGE_MATCHUPS,
  HOMEPAGE_NATIONS,
  HOMEPAGE_TEAMS,
  todaysDebate,
  vsPath,
} from "@/data/matchups"
import { BEST_TEAM, HOME_PAGE, HOME_SECTIONS, PRIME_HUB } from "@/data/collection-copy"
import { primeEntities } from "@/data/prime"
import { getTeam } from "@/data/teams"
import { DreamMatchCarousel } from "@/components/ui/DreamMatchCarousel"
import { TeamCardCarousel } from "@/components/ui/TeamCardCarousel"
import { SITE, absoluteUrl } from "@/lib/site"
import type { HistoricalTeam } from "@/types"
import type { Metadata } from "next"
import { languageAlternates } from "@/lib/i18n"

const HOME_DESCRIPTION = HOME_PAGE.description

export const metadata: Metadata = {
  title: { absolute: HOME_PAGE.title },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/", languages: languageAlternates("/") },
  openGraph: {
    title: HOME_PAGE.title,
    description: HOME_DESCRIPTION,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_PAGE.title,
    description: HOME_DESCRIPTION,
  },
}

const FAQ = [
  [
    "Is this also a soccer match simulator?",
    "Yes. Football and soccer are the same sport here. Pick two named seasons, play one game, or open a 100-match probability read.",
  ],
  [
    "Is this predicting a real match?",
    "No. It is a counterfactual game for historical what-if debates, not betting advice or Saturday’s forecast. Ratings, tactics and a seed write one plausible night.",
  ],
  [
    "Can I simulate a custom football match online?",
    "Yes. Open the simulator and pick any two named seasons — a club peak, a World Cup side, or two current squads. Run it again for another plausible night, or use a 100-match probability read.",
  ],
  [
    "Is this a football match simulator with AI?",
    "The score comes from the match engine — ratings, tactics and a seed — not from a chatbot picking a winner. Optional analysis then explains the 100-match probabilities.",
  ],
  [
    "Why does the result change when I simulate again?",
    "Each new seed is another plausible game, so the score and scorers can change. A 100-match distribution is the wider pattern, not a law of nature.",
  ],
  [
    "What does Expert AI Analysis do?",
    "The engine scores the selected sides first. The optional analysis then reads those squads, managers, shapes and the 100-match evidence. It does not secretly replace the simulated result.",
  ],
  [
    "How do you rate players?",
    "A 95 on Pelé in 1970 means greatness in 1970. Messi in 2010/11 is rated in that season, not against a modern athletic test. Hover a player for PAC, SHO, PAS, DRI, DEF and PHY.",
  ],
  [
    "When was Barcelona's prime?",
    "Our pick is 2010/11: Messi's false nine inside Guardiola's best midfield. 2008/09 began the era; 2014/15 MSN is the counter. The prime page compares those sides: 2010/11 as the pick, not the first treble.",
  ],
  [
    "Who is better, Brazil or Argentina?",
    "Brazil have the heavier World Cup record; Argentina have 1986 and 2022 as individual peaks. The compare page separates those questions, then names Brazil 1970 against Argentina 1986 as the prime matchup.",
  ],
] as const

const HOW_STEPS = [
  ["01", "Pick two seasons", "Every card is a named season with an XI — Guardiola’s Barça, Zidane’s Madrid, a World Cup side — not a badge with a slider."],
  ["02", "Play one night", "The engine combines those ratings and a seed into the score, xG, scorers and match events. Repeating the fixture is another plausible night."],
  ["03", "Read the 100-match spread", "One 2–1 is one night. A hundred alternate scores is the wider pattern, and the optional AI read never votes."],
] as const

export default function HomePage() {
  const legendary = HOMEPAGE_TEAMS.map((id) => getTeam(id)).filter(
    (team): team is HistoricalTeam => Boolean(team),
  )
  const nations = HOMEPAGE_NATIONS.map((id) => getTeam(id)).filter(
    (team): team is HistoricalTeam => Boolean(team),
  )
  const [todayHomeId, todayAwayId] = todaysDebate()
  const todayHome = getTeam(todayHomeId)
  const todayAway = getTeam(todayAwayId)
  const dreamMatches = HOMEPAGE_MATCHUPS.flatMap(([homeId, awayId]) => {
    const home = getTeam(homeId)
    const away = getTeam(awayId)
    if (!home || !away) return []
    return [{ href: vsPath(homeId, awayId), home, away }]
  })

  return (
    <div className="grid gap-3">
      <section className="home-hero">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: SITE.name,
              applicationCategory: "GameApplication",
              operatingSystem: "Web",
              url: absoluteUrl("/"),
              description: HOME_DESCRIPTION,
            }),
          }}
        />
        <p className="home-hero-kicker">{HOME_PAGE.kicker}</p>
        <div className="home-hero-title">
          <span className="home-hero-legendary">Legendary</span>
          <span className="home-hero-rule" aria-hidden="true" />
          <span className="home-hero-match">Match</span>
        </div>
        <h1 className="home-hero-h1">{HOME_PAGE.h1}</h1>
        <p className="home-hero-tagline">
          {HOME_PAGE.tagline.map((line, index) => (
            <span key={line} className="contents">
              {index > 0 ? (
                <span className="home-hero-dot" aria-hidden="true">
                  ·
                </span>
              ) : null}
              <span>{line}</span>
            </span>
          ))}
        </p>
      </section>

      {todayHome && todayAway ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
          Today&apos;s debate · {todayHome.clubName} {todayHome.displaySeason} vs {todayAway.clubName} {todayAway.displaySeason}
        </p>
      ) : null}

      <MatchSetupGate
        defaultHome={todayHomeId}
        defaultAway={todayAwayId}
      />

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="home-section-kicker">{HOME_SECTIONS.matchupsKicker}</p>
            <h2 className="home-section-title">{HOME_SECTIONS.matchupsTitle}</h2>
          </div>
          <Link href="/vs" className="home-section-link">
            All matchups →
          </Link>
        </div>
        <p className="home-section-lead">{HOME_SECTIONS.matchupsLead}</p>
        <DreamMatchCarousel items={dreamMatches} />
      </section>

      <section className="home-editorial-section">
        <EditorialHeading kicker={HOME_SECTIONS.howKicker} title={HOME_SECTIONS.howTitle} />
        <div className="home-how-grid">
          {HOW_STEPS.map(([step, title, copy]) => (
            <div key={step} className="home-how-card">
              <div className="home-how-number">{step}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="home-section-kicker">{HOME_SECTIONS.clubsKicker}</p>
            <h2 className="home-section-title">{HOME_SECTIONS.clubsTitle}</h2>
          </div>
          <Link href="/teams" className="home-section-link">
            All club teams →
          </Link>
        </div>
        <p className="home-section-lead">
          Club sides people actually argue about — Guardiola’s first Barça, Madrid 2016/17, United’s treble —
          plus the rest of the catalogue behind the link.
        </p>
        <TeamCardCarousel teams={legendary} kind="club" />
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="home-section-kicker">{HOME_SECTIONS.nationsKicker}</p>
            <h2 className="home-section-title">{HOME_SECTIONS.nationsTitle}</h2>
          </div>
          <Link href="/national-teams" className="home-section-link">
            All national teams →
          </Link>
        </div>
        <p className="home-section-lead">
          World Cup and Euros sides, not a dump of every qualifier. Brazil 1970, Maradona’s 86, Spain’s tiki-taka
          years — then every other national XI we have.
        </p>
        <TeamCardCarousel teams={nations} kind="nation" />
      </section>

      <section className="home-editorial-section">
        <EditorialHeading kicker={HOME_SECTIONS.faqKicker} title={HOME_PAGE.faqHeading} />
        <div className="home-faq-list">
          {FAQ.map(([question, answer]) => (
            <details key={question} className="home-faq-item group">
              <summary>
                {question}<span className="home-faq-plus">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map(([question, answer]) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: answer,
                },
              })),
            }),
          }}
        />
      </section>

      <section className="home-editorial-section">
        <EditorialHeading kicker={PRIME_HUB.kicker} title={PRIME_HUB.homeHeading} />
        <div className="home-prime-grid">
          {primeEntities
            .filter((entity) => entity.kind === "club")
            .map((entity) => (
              <Link
                key={entity.slug}
                href={`/prime/${entity.slug}`}
                className="home-prime-card"
              >
                <span>Pick: {entity.pick}</span>
                <h3>{entity.title}</h3>
                <p>{entity.description}</p>
                <b>Open {entity.name} →</b>
              </Link>
            ))}
        </div>
      </section>

      <section className="home-editorial-section">
        <EditorialHeading kicker={HOME_SECTIONS.argumentsKicker} title={HOME_SECTIONS.argumentsTitle} />
        <div className="home-prime-grid">
          <Link href="/best-football-team-ever" className="home-prime-card">
            <span>{BEST_TEAM.kicker}</span><h3>{BEST_TEAM.homeCardTitle}</h3>
            <p>{`Six historically great sides, one set of criteria and a clear answer — Barcelona 2010/11 first, then Brazil 1970 and Sacchi's Milan.`}</p>
            <b>Read the verdict →</b>
          </Link>
          <Link href="/compare/barcelona-vs-real-madrid" className="home-prime-card">
            <span>Clásico</span><h3>Real Madrid all-time; Barcelona at their modern peak</h3>
            <p>Separate the all-time club argument from the prime-team matchup, then test the best versions.</p>
            <b>Compare the giants →</b>
          </Link>
          <Link href="/compare/brazil-vs-argentina" className="home-prime-card">
            <span>Brazil–Argentina</span><h3>Brazil as a footballing nation; Argentina when one player carried a tournament</h3>
            <p>Five stars against three, 1970 against 1986. The cabinets are not a tie; the prime teams are still a match.</p>
            <b>Open the argument →</b>
          </Link>
          <Link href="/compare/england-vs-germany" className="home-prime-card">
            <span>England–Germany</span><h3>Germany as a tournament nation; England in 1966</h3>
            <p>Germany keep answering the tournament question. England have one undisputed answer, and it is 1966.</p>
            <b>Open the argument →</b>
          </Link>
        </div>
      </section>
    </div>
  )
}

function EditorialHeading({ kicker, title }: { kicker: string; title: string }) {
  return <div className="home-editorial-heading"><p>{kicker}</p><h2>{title}</h2><i aria-hidden="true" /></div>
}
