import Link from "next/link"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { TeamCard } from "@/components/teams/TeamCard"
import {
  FEATURED_MATCHUPS,
  HOMEPAGE_CURRENT_CLUBS,
  HOMEPAGE_CURRENT_NATIONS,
  HOMEPAGE_NATIONS,
  HOMEPAGE_TEAMS,
  vsPath,
} from "@/data/matchups"
import { primeEntities } from "@/data/prime"
import { getTeam, teams, toTeamOption } from "@/data/teams"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { absoluteUrl } from "@/lib/site"

const FAQ = [
  [
    "What is a football match simulator?",
    "This football match simulator lets you pick two squads — historical or current — and play a seeded match. Ratings, style and chance produce a score, scorers, xG and events. AI never picks the winner.",
  ],
  [
    "Can I simulate a custom football match online?",
    "Yes. Open the simulator, choose any two teams in the database, and simulate a football match online. Same sides and seed always replay the same result. Run 100 matches for who-would-win probabilities.",
  ],
  [
    "Who would win: Barcelona 2009 vs Real Madrid 2017?",
    "That is the point of the site. Barcelona 2008/09 and Real Madrid 2016/17 are both playable, with squad pages for the 2009 Barcelona squad and the 2017 Real Madrid squad. Simulate the dream match instead of arguing.",
  ],
  [
    "Do you include current squads?",
    "Yes. Every club has a 2025/26 squad and every national side has a 2026 squad, alongside the legendary years. Pick the current season in the picker, or open the squad page, then simulate it against any era.",
  ],
  [
    "How do you rate players?",
    "Overall ratings are era-relative. A 95 in 1970 means greatness in 1970, not a claim about modern athleticism. Hover a player for PAC, SHO, PAS, DRI, DEF and PHY.",
  ],
  [
    "When was Barcelona's prime?",
    "Prime pages compare candidate seasons — Barcelona 2008/09, 2010/11 and 2014/15, plus the current squad — then send you into the simulator. Same idea for Real Madrid, Manchester United, Messi, Brazil and Argentina.",
  ],
] as const

export default function HomePage() {
  const options = teams.map(toTeamOption)
  const legendary = HOMEPAGE_TEAMS.map((id) => getTeam(id)).filter(Boolean)
  const nations = HOMEPAGE_NATIONS.map((id) => getTeam(id)).filter(Boolean)
  const currentClubs = HOMEPAGE_CURRENT_CLUBS.map((id) => getTeam(id)).filter(Boolean)
  const currentNations = HOMEPAGE_CURRENT_NATIONS.map((id) => getTeam(id)).filter(Boolean)

  return (
    <div className="grid gap-5">
      <section className="grid gap-2 text-center">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Football Match Simulator",
              applicationCategory: "GameApplication",
              operatingSystem: "Web",
              url: absoluteUrl("/"),
              description:
                "Football match simulator online. Pick a historical team or a current squad and simulate a custom football match. The engine produces score, scorers, xG and events.",
            }),
          }}
        />
        <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold">
          Football match simulator
        </p>
        <h1 className="font-mono text-xl font-semibold tracking-tight text-text sm:text-3xl">
          Football Match Simulator
        </h1>
        <p className="mx-auto whitespace-nowrap font-mono text-[11px] tracking-tight text-muted sm:text-sm">
          Pick a team. Pick an era. Settle the debate.
        </p>
      </section>

      <MatchSetup
        teams={options}
        defaultHome="barcelona-2008-09"
        defaultAway="real-madrid-2016-17"
      />

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">Current club squads</h2>
        <p className="font-mono text-sm leading-6 text-muted">
          2025/26 lineups for Barcelona, Real Madrid, Arsenal, Liverpool and more — same engine as the legendary years.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentClubs.map((team) => (team ? <TeamCard key={team.id} team={team} /> : null))}
        </div>
        <Link href="/teams" className="font-mono text-sm text-gold hover:text-gold-2">
          All club teams →
        </Link>
      </section>

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">2026 national squads</h2>
        <p className="font-mono text-sm leading-6 text-muted">
          Current Brazil, Argentina, France, Spain, England and Germany sides. Simulate them against 1970, 1986 or 2010.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentNations.map((team) => (team ? <TeamCard key={team.id} team={team} /> : null))}
        </div>
        <Link href="/national-teams" className="font-mono text-sm text-gold hover:text-gold-2">
          All national teams →
        </Link>
      </section>

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">Legendary club teams</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {legendary.map((team) =>
            team ? <TeamCard key={team.id} team={team} /> : null,
          )}
        </div>
        <Link href="/teams" className="font-mono text-sm text-gold hover:text-gold-2">
          All club teams →
        </Link>
      </section>

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">Legendary national teams</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nations.map((team) => (team ? <TeamCard key={team.id} team={team} /> : null))}
        </div>
        <Link href="/national-teams" className="font-mono text-sm text-gold hover:text-gold-2">
          All national teams →
        </Link>
      </section>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-mono text-lg font-semibold tracking-tight">Popular dream matches</h2>
          <Link href="/vs" className="font-mono text-sm text-gold hover:text-gold-2">
            All matchups →
          </Link>
        </div>
        <div className="grid gap-2">
          {FEATURED_MATCHUPS.slice(0, 8).map(([homeId, awayId]) => {
            const home = getTeam(homeId)
            const away = getTeam(awayId)
            if (!home || !away) return null
            return (
              <MatchupRow
                key={`${homeId}-${awayId}`}
                href={vsPath(homeId, awayId)}
                home={home}
                away={away}
              />
            )
          })}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">How the football simulator works</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Pick two teams", "Choose a legendary club, a World Cup side or a current 2025/26 squad — Barcelona 2008/09, Brazil 1970, Real Madrid 2025/26 and more."],
            ["02", "The engine plays the match", "Ratings, style and a random seed produce a score, xG, scorers and events. The model decides. AI never picks the winner."],
            ["03", "Replay or run 100 matches", "Simulate again, run a hundred seeds for who-would-win probabilities, or share the match link."],
          ].map(([step, title, copy]) => (
            <div key={step} className="result-panel p-4">
              <div className="font-display text-[10px] text-gold">{step}</div>
              <h3 className="mt-2 font-mono text-sm font-semibold text-text">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">Football match simulator FAQ</h2>
        <div className="grid gap-3">
          {FAQ.map(([question, answer]) => (
            <article key={question} className="result-panel px-4 py-3">
              <h3 className="font-mono text-sm font-semibold text-text">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{answer}</p>
            </article>
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
