import Link from "next/link"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import {
  HOMEPAGE_MATCHUPS,
  HOMEPAGE_NATIONS,
  HOMEPAGE_TEAMS,
  vsPath,
} from "@/data/matchups"
import { primeEntities } from "@/data/prime"
import { getTeam, teams, toTeamOption } from "@/data/teams"
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
    "Yes. Football and soccer describe the same sport here. US fans can use this soccer match simulator to match squads from different seasons, play one game, or run 100 simulations for win probabilities.",
  ],
  [
    "Is this predicting a real match?",
    "No. It is a counterfactual game built for historical what-if debates, not betting advice or a forecast. Team ratings, tactical profiles and a random seed create one plausible match between the selected squads.",
  ],
  [
    "Can I simulate a custom football match online?",
    "Yes. Open the simulator, choose any two teams in the database, and simulate a football match online. Same sides and seed always replay the same result. Run 100 matches for who-would-win probabilities.",
  ],
  [
    "Why does the result change when I simulate again?",
    "A great team does not win every night. Each new seed creates another plausible game, so the score and scorers can change. Use 100 Matches when you want the distribution rather than one dramatic result.",
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
  ["03", "Test the argument", "Run it again for a different night, run 100 for the distribution, or ask Expert AI to explain the tactical evidence."],
] as const

export default function HomePage() {
  const options = teams.map(toTeamOption)
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
        teams={options}
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
          The fights people type into a search bar. Three at a time; the rest live on the matchups page.
        </p>
        <DreamMatchCarousel items={dreamMatches} />
      </section>

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">How the football simulator works</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {HOW_STEPS.map(([step, title, copy]) => (
            <div key={step} className="result-panel p-4">
              <div className="font-display text-[10px] text-gold">{step}</div>
              <h3 className="mt-2 font-mono text-sm font-semibold text-text">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
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

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">Football match simulator FAQ</h2>
        <div className="grid gap-2">
          {FAQ.map(([question, answer]) => (
            <details key={question} className="result-panel group px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-mono text-sm font-semibold text-text marker:hidden">
                {question}<span className="font-display text-[10px] text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-4xl border-t border-white/10 pt-3 text-sm leading-6 text-muted">{answer}</p>
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

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">When was their prime?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {primeEntities
            .filter((entity) => entity.kind === "club")
            .map((entity) => (
              <Link
                key={entity.slug}
                href={`/prime/${entity.slug}`}
                className="result-panel p-4 no-underline hover:border-gold"
              >
                <h3 className="font-mono text-base font-semibold tracking-tight">{entity.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{entity.description}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
