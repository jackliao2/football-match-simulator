import type { Metadata } from "next"
import Link from "next/link"
import { SearchBox } from "@/components/search/SearchBox"
import { PageHeader } from "@/components/ui/PageHeader"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { HOMEPAGE_TEAMS, HOMEPAGE_NATIONS } from "@/data/matchups"
import { searchCatalog, TEAM_CATALOG } from "@/data/team-catalog"
import { pageMetadata } from "@/lib/seo"
import { teamPath } from "@/lib/paths"

const TITLE = "Search historical football squads"
const DESCRIPTION =
  "Search 156 named club and national-team seasons on LegendaryMatch. Open a squad page or send two sides straight into the football match simulator."

export async function generateMetadata({
  searchParams,
}: PageProps<"/search">): Promise<Metadata> {
  const params = await searchParams
  const query = typeof params.q === "string" ? params.q.trim() : ""
  const meta = pageMetadata({
    title: query ? `Search results for “${query}”` : TITLE,
    description: DESCRIPTION,
    path: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
  })
  if (query) meta.robots = { index: false, follow: true }
  return meta
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams
  const query = typeof params.q === "string" ? params.q.trim() : ""
  const hits = query.length >= 2 ? searchCatalog(query) : []
  const suggestions = query
    ? []
    : HOMEPAGE_TEAMS.concat(HOMEPAGE_NATIONS)
        .map((id) => TEAM_CATALOG.find((entry) => entry.id === id))
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
        .slice(0, 12)

  return (
    <div className="grid gap-6">
      <PageHeader
        kicker="Catalogue search"
        title="Find a squad, then play it"
        lead={`${TEAM_CATALOG.length} named seasons. Search by club, country, year or a short season like 04/05, then open the page or send it into the simulator.`}
        crumbs={[{ href: "/", label: "Home" }, { href: "/search", label: "Search" }]}
      />
      <SearchBox defaultQuery={query} />
      {query.length > 0 && query.length < 2 ? (
        <p className="font-mono text-sm text-muted">Type at least two characters.</p>
      ) : null}
      {query.length >= 2 ? (
        <section className="grid gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
            {hits.length === 0 ? `No squads for “${query}”` : `${hits.length} squad${hits.length === 1 ? "" : "s"}`}
          </p>
          {hits.length === 0 ? (
            <p className="max-w-xl font-mono text-sm leading-6 text-muted">
              Try a club name, a country, or a season token such as 2008/09, 04/05 or 1970.
            </p>
          ) : (
            <ul className="search-results">
              {hits.map((entry) => (
                <SearchHit key={entry.id} entry={entry} />
              ))}
            </ul>
          )}
        </section>
      ) : (
        <section className="grid gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Popular sides</p>
          <ul className="search-results">
            {suggestions.map((entry) => (
              <SearchHit key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function SearchHit({
  entry,
}: {
  entry: (typeof TEAM_CATALOG)[number]
}) {
  return (
    <li className="search-hit">
      <Link href={entry.path ?? teamPath(entry)} className="search-hit-main">
        <PixelCrest clubId={entry.clubId} size={36} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-brand text-base font-semibold text-text">
            {entry.clubName}
          </span>
          <span className="block font-mono text-xs text-gold">
            {entry.displaySeason} · {entry.kind === "nation" ? "Nation" : "Club"} · {entry.manager}
          </span>
        </span>
        <OvrStamp value={entry.overallRating} size="sm" />
      </Link>
      <Link href={`/simulate?home=${encodeURIComponent(entry.id)}`} className="search-hit-play">
        Simulate
      </Link>
    </li>
  )
}
