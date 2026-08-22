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
                "Simulate historical football teams from any era. Pick a squad, pick a season, settle the debate.",
            }),
          }}
        />
        <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold">
          Legendary sides · Any era
        </p>
        <h1 className="font-mono text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          Football Match Simulator
        </h1>
        <p className="font-mono text-sm text-muted sm:text-base">
          Pick a team. Pick an era. Settle the debate.
        </p>
      </section>

      <MatchSetup
        teams={options}
        defaultHome="barcelona-2008-09"
        defaultAway="real-madrid-2016-17"
      />

      <section className="grid gap-4">
        <h2 className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">
          Legendary Teams
        </h2>
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
        <h2 className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">
          National Teams
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nations.map((team) => (team ? <TeamCard key={team.id} team={team} /> : null))}
        </div>
        <div>
          <PixelButton href="/national-teams">All National Teams</PixelButton>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">
            Popular Dream Matches
          </h2>
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
        <h2 className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">
          How It Works
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Pick a historical team and season."],
            ["02", "The engine simulates score, xG, scorers and events."],
            ["03", "Replay it, run 100 matches, or share the seed."],
          ].map(([step, copy]) => (
            <div key={step} className="border-2 border-line bg-panel p-4">
              <div className="font-display text-[10px] text-gold">{step}</div>
              <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">
          When Was Their Prime?
        </h2>
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
