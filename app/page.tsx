import Link from "next/link"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { TeamCard } from "@/components/teams/TeamCard"
import { FEATURED_MATCHUPS, HOMEPAGE_NATIONS, HOMEPAGE_TEAMS, vsPath } from "@/data/matchups"
import { primeEntities } from "@/data/prime"
import { getTeam, teams, toTeamOption } from "@/data/teams"
import { PixelButton } from "@/components/ui/PixelButton"

export default function HomePage() {
  const options = teams.map(toTeamOption)
  const legendary = HOMEPAGE_TEAMS.map((id) => getTeam(id)).filter(Boolean)
  const nations = HOMEPAGE_NATIONS.map((id) => getTeam(id)).filter(Boolean)

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
              description:
                "Simulate football matches between legendary club sides and World Cup squads. Pick a historical team, pick a season, and the engine produces a score, scorers, xG and events.",
            }),
          }}
        />
        <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold">
          Historical football match simulator
        </p>
        <h1 className="font-mono text-xl font-semibold tracking-tight text-text sm:text-3xl">
          Football Match Simulator
        </h1>
        <p className="mx-auto max-w-xl font-mono text-sm leading-6 text-muted">
          Legendary clubs and World Cup squads. Pick a season. Simulate a match.
        </p>
      </section>

      <MatchSetup
        teams={options}
        defaultHome="barcelona-2008-09"
        defaultAway="real-madrid-2016-17"
      />

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">Legendary club teams</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {legendary.map((team) =>
            team ? <TeamCard key={team.id} team={team} /> : null,
          )}
        </div>
        <div>
          <PixelButton href="/teams">All Club Teams</PixelButton>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">World Cup national teams</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nations.map((team) => (team ? <TeamCard key={team.id} team={team} /> : null))}
        </div>
        <div>
          <PixelButton href="/national-teams">All National Teams</PixelButton>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-mono text-lg font-semibold tracking-tight">Popular dream matches</h2>
          <PixelButton href="/vs" variant="ghost">
            All matchups
          </PixelButton>
        </div>
        <div className="grid gap-3">
          {FEATURED_MATCHUPS.slice(0, 8).map(([homeId, awayId]) => {
            const home = getTeam(homeId)
            const away = getTeam(awayId)
            if (!home || !away) return null
            return (
              <Link
                key={`${homeId}-${awayId}`}
                href={vsPath(homeId, awayId)}
                className="grid gap-2 border-2 border-line bg-panel p-4 no-underline hover:border-gold sm:grid-cols-[1fr_auto_1fr] sm:items-center"
              >
                <span>
                  <span className="block font-display text-[11px] uppercase tracking-wide text-text">
                    {home.clubName}
                  </span>
                  <span className="text-sm text-muted">{home.displaySeason}</span>
                </span>
                <span className="font-display text-[10px] tracking-[0.3em] text-gold">VS</span>
                <span className="sm:text-right">
                  <span className="block font-display text-[11px] uppercase tracking-wide text-text">
                    {away.clubName}
                  </span>
                  <span className="text-sm text-muted">{away.displaySeason}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="font-mono text-lg font-semibold tracking-tight">How the football simulator works</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Pick two historical teams", "Choose a legendary club or national side and a season — Barcelona 2008/09, Brazil 1970, Italy 2006 and more."],
            ["02", "The engine plays the match", "Ratings, style and a random seed produce a score, xG, scorers and events. The model decides. AI never picks the winner."],
            ["03", "Replay or run 100 matches", "Simulate again, run a hundred seeds for win probabilities, or share the match link."],
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
          {[
            [
              "Is this a real historical match?",
              "No. It is an independent simulation of historical squads. The score is generated from ratings and a seed, not from an archive of played fixtures.",
            ],
            [
              "How do you rate players?",
              "Overall ratings are era-relative. A 95 in 1970 means greatness in 1970, not a claim about modern athleticism. Hover a player for PAC, SHO, PAS, DRI, DEF and PHY.",
            ],
            [
              "Can I simulate World Cup teams?",
              "Yes. National sides such as Brazil 1970, Argentina 1986, France 1998 and Spain 2010 sit alongside club teams in the picker.",
            ],
          ].map(([question, answer]) => (
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
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is this a real historical match?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. It is an independent simulation of historical squads. The score is generated from ratings and a seed, not from an archive of played fixtures.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do you rate players?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Overall ratings are era-relative. A 95 in 1970 means greatness in 1970, not a claim about modern athleticism.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I simulate World Cup teams?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. National sides such as Brazil 1970, Argentina 1986, France 1998 and Spain 2010 sit alongside club teams in the picker.",
                  },
                },
              ],
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
                className="border-2 border-line bg-panel p-4 no-underline hover:border-gold"
              >
                <h3 className="font-display text-[11px] uppercase tracking-wide">{entity.title}</h3>
                <p className="mt-2 text-sm text-muted">{entity.description}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
