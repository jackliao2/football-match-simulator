import type { Metadata } from "next"
import { FEATURED_MATCHUPS, vsPath } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { PageHeader } from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { languageAlternates } from "@/lib/i18n"

export const metadata: Metadata = pageMetadata({
  title: "Dream matches you can actually play",
  description:
    "Dream football and soccer matchups: Barcelona 2008/09 vs Madrid 2016/17, Brazil 1970 vs Spain 2010 and more. Explore simulated scores and who-would-win probabilities.",
  path: "/vs",
  keywords: ["dream soccer matches", "who would win soccer", "historical football matchups", "soccer match simulator"],
})
metadata.alternates = { canonical: "/vs", languages: languageAlternates("/vs") }

export default function VsIndexPage() {
  const rows = FEATURED_MATCHUPS.map(([homeId, awayId]) => {
    const home = getTeam(homeId)
    const away = getTeam(awayId)
    if (!home || !away) return null
    return { home, away, href: vsPath(homeId, awayId) }
  }).filter(Boolean)

  return (
    <div className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Dream Matches",
            url: absoluteUrl("/vs"),
            description: "Hypothetical football and soccer matchups. Percentages from many seeded runs, not archive scores.",
          }),
        }}
      />
      <PageHeader
        kicker="Matchups"
        title="Dream matches"
        lead="No fixture filler and no current-season pairings just because they are new. This is a short, hand-picked card of sides that belong in the greatest-team argument."
      />
      <section className="result-panel px-4 py-4 sm:px-5">
        <p className="font-display text-[8px] uppercase tracking-[0.2em] text-gold">How the card was picked</p>
        <p className="mt-2 max-w-4xl font-mono text-xs leading-6 text-text/75">Each pairing needs a real argument behind it: two sides regularly placed among football’s greatest, a clash of defining tactical ideas, or two generations of the same national tradition. Famous matches that already happened only stay when a different peak version changes the question.</p>
      </section>
      {[
        { title: "Club dynasties", lead: "Guardiola, Sacchi, Zidane, Ferguson and the club sides that changed the standard.", rows: rows.slice(0, 12) },
        { title: "Greatest national sides", lead: "World champions, beautiful runners-up and the teams that still define an era.", rows: rows.slice(12) },
      ].map((section) => (
        <section key={section.title} className="grid gap-3">
          <div>
            <h2 className="font-brand text-xl font-semibold text-text">{section.title}</h2>
            <p className="mt-1 font-mono text-xs text-muted">{section.lead}</p>
          </div>
          <div className="grid gap-2">
            {section.rows.map((row) => row ? <MatchupRow key={row.href} href={row.href} home={row.home} away={row.away} /> : null)}
          </div>
        </section>
      ))}
    </div>
  )
}
