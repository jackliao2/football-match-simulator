import Link from "next/link"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import {
  HOMEPAGE_MATCHUPS,
  HOMEPAGE_NATIONS,
  HOMEPAGE_TEAMS,
  vsPath,
} from "@/data/matchups"
import { primeEntities } from "@/data/prime"
import { getTeam } from "@/data/teams"
import { DreamMatchCarousel } from "@/components/ui/DreamMatchCarousel"
import { TeamCardCarousel } from "@/components/ui/TeamCardCarousel"
import { SITE, absoluteUrl } from "@/lib/site"
import type { HistoricalTeam } from "@/types"
import type { Metadata } from "next"
import { languageAlternates } from "@/lib/i18n"

const HOME_DESCRIPTION =
  "Online football and soccer match simulator. Pick squads from different eras — Brazil 1970, Barcelona 2008/09, France 2026 — then simulate the score, scorers, xG and 100-match win probabilities."

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Football & Soccer Match Simulator` },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/", languages: languageAlternates("/") },
  openGraph: {
    title: `${SITE.name} — Football & Soccer Match Simulator`,
    description: HOME_DESCRIPTION,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Football & Soccer Match Simulator`,
    description: HOME_DESCRIPTION,
  },
}

const FAQ = [
  [
    "Is this also a soccer match simulator?",
    "Yes. Football and soccer describe the same sport here. US fans can use this soccer match simulator to match squads from different seasons, play one game, or open Expert AI Analysis for a 100-match probability read.",
  ],
  [
    "Is this predicting a real match?",
    "No. It is a counterfactual game built for historical what-if debates, not betting advice or a forecast. Team ratings, tactical profiles and a random seed create one plausible match between the selected squads.",
  ],
  [
    "Can I simulate a custom football match online?",
    "Yes. Open the simulator, choose any two teams in the database, and simulate a football match online. Run it again for another plausible night, or use Expert AI Analysis for a 100-match probability read.",
  ],
  [
    "Why does the result change when I simulate again?",
    "A great team does not win every night. Each new seed creates another plausible game, so the score and scorers can change. Expert AI Analysis adds a fresh 100-match distribution behind its tactical verdict.",
  ],
  [
    "What does Expert AI Analysis do?",
    "The match engine produces the numbers first. Expert AI then reads the two real squad lists, managers, shapes and the 100-match evidence to explain the tactical matchup. It does not secretly replace the simulated result.",
  ],
  [
    "How do you rate players?",
    "Overall ratings are era-relative. A 95 in 1970 means greatness in 1970, not a claim about modern athleticism. Hover a player for PAC, SHO, PAS, DRI, DEF and PHY.",
  ],
  [
    "When was Barcelona's prime?",
    "Prime pages compare candidate seasons — Barcelona 2008/09, 2010/11 and 2014/15, plus the latest dataset — then send you into the simulator. Same idea for Real Madrid, Manchester United, Messi, Brazil and Argentina.",
  ],
] as const

const HOW_STEPS = [
  ["01", "Pick two shirts", "Choose a club peak, a World Cup side or a recent named season. Every card opens the actual squad and era behind the rating."],
  ["02", "Play one possible night", "The engine combines player ratings, team style and a seed into the score, xG, scorers and match events."],
  ["03", "Test the argument", "Run it again for a different night, or ask Expert AI for a tactical verdict backed by 100 alternate matches."],
] as const

export default function HomePage() {
  const legendary = HOMEPAGE_TEAMS.map((id) => getTeam(id)).filter(
    (team): team is HistoricalTeam => Boolean(team),
  )
  const nations = HOMEPAGE_NATIONS.map((id) => getTeam(id)).filter(
    (team): team is HistoricalTeam => Boolean(team),
  )
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
        <p className="home-hero-kicker">Football match simulator</p>
        <h1 className="home-hero-title">
          <span className="home-hero-legendary">Legendary</span>
          <span className="home-hero-rule" aria-hidden="true" />
          <span className="home-hero-match">Match</span>
        </h1>
        <p className="home-hero-tagline">
          <span>Pick a team</span>
          <span className="home-hero-dot" aria-hidden="true">
            ·
          </span>
          <span>Pick an era</span>
          <span className="home-hero-dot" aria-hidden="true">
            ·
          </span>
          <span>Settle the debate</span>
        </p>
      </section>

      <MatchSetup
        defaultHome="barcelona-2008-09"
        defaultAway="real-madrid-2016-17"
      />

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="home-section-kicker">Dream matches</p>
            <h2 className="home-section-title">Popular dream matches</h2>
          </div>
          <Link href="/vs" className="home-section-link">
            All matchups →
          </Link>
        </div>
        <p className="home-section-lead">
          The matchups football fans keep debating. Three at a time; the rest live on the matchups page.
        </p>
        <DreamMatchCarousel items={dreamMatches} />
      </section>

      <section className="home-editorial-section">
        <EditorialHeading kicker="Three steps" title="How the football simulator works" />
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
            <p className="home-section-kicker">Clubs</p>
            <h2 className="home-section-title">Legendary clubs</h2>
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
            <p className="home-section-kicker">Nations</p>
            <h2 className="home-section-title">Legendary nations</h2>
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
        <EditorialHeading kicker="The rules" title="Football match simulator FAQ" />
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
        <EditorialHeading kicker="Era debates" title="When was their prime?" />
        <div className="home-prime-grid">
          {primeEntities
            .filter((entity) => entity.kind === "club")
            .map((entity) => (
              <Link
                key={entity.slug}
                href={`/prime/${entity.slug}`}
                className="home-prime-card"
              >
                <span>Prime dossier</span>
                <h3>{entity.title}</h3>
                <p>{entity.description}</p>
                <b>Explore the eras →</b>
              </Link>
            ))}
        </div>
      </section>

      <section className="home-editorial-section">
        <EditorialHeading kicker="Big arguments" title="Go beyond one simulated night" />
        <div className="home-prime-grid">
          <Link href="/best-football-team-ever" className="home-prime-card">
            <span>Editorial ranking</span><h3>What is the best football team ever?</h3>
            <p>Six historically great sides, one set of criteria and a clear answer — with every candidate playable.</p>
            <b>Read the verdict →</b>
          </Link>
          <Link href="/compare/barcelona-vs-real-madrid" className="home-prime-card">
            <span>Club comparison</span><h3>Barcelona or Real Madrid: which is better?</h3>
            <p>Separate the all-time club argument from the prime-team matchup, then test the best versions.</p>
            <b>Compare the giants →</b>
          </Link>
        </div>
      </section>
    </div>
  )
}

function EditorialHeading({ kicker, title }: { kicker: string; title: string }) {
  return <div className="home-editorial-heading"><p>{kicker}</p><h2>{title}</h2><i aria-hidden="true" /></div>
}
