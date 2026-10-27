import Link from "next/link"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { QuickMatch } from "@/components/simulator/QuickMatch"
import { LandingEvidence } from "@/components/ui/LandingEvidence"
import { HistoricalRecord } from "@/components/ui/HistoricalRecord"
import { SEARCH_PRIORITY_RECORDS } from "@/data/search-priority"
import { CLUB_COMPARES } from "@/data/compare"
import { SEARCH_LANDING_EVIDENCE } from "@/data/search-landing-evidence"
import { SQUAD_PAGE_UPDATED_ISO, SQUAD_PAGE_UPDATED_LABEL } from "@/data/content-updates"
import { TrackOnMount } from "@/components/TrackOnMount"
import { Formation } from "@/components/teams/Formation"
import { SquadList } from "@/components/teams/SquadList"
import { StarPlayers } from "@/components/teams/StarPlayers"
import { StyleProfile } from "@/components/teams/StyleProfile"
import { TeamRatings } from "@/components/teams/TeamRatings"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { TrophyBadges } from "@/components/teams/TrophyBadges"
import { EditorialByline, personSchema } from "@/components/ui/EditorialByline"
import { eraGlow } from "@/data/trophies"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { OvrStamp } from "@/components/ui/OvrStamp"
import { defaultOpponent, vsPath } from "@/data/matchups"
import { getPrimeEntity } from "@/data/prime"
import { getTeamEditorial } from "@/data/team-editorial"
import { getTeam, getTeamsByClub } from "@/data/teams"
import { cachedMatchupModel } from "@/lib/matchup-model"
import { orgIndexPath, orgPath, teamPath } from "@/lib/paths"
import { relatedMatchups, teamPageCopy } from "@/lib/page-copy"
import { isCurrentSquad, modelledCurrentSquadNote } from "@/lib/seo"
import { teamFaqs } from "@/lib/team-faqs"
import { SITE, absoluteUrl } from "@/lib/site"
import type { HistoricalTeam } from "@/types"

// Keep notes only where the season label or historical roster needs clarification.
export const SEARCH_YEAR_NOTES: Record<string, string> = {
  "real-madrid-2013-14": "This is the 2013/14 La Décima season, distinct from Zidane's later Champions League-winning teams.",
  "inter-milan-1988-89": "This is Inter's 1988/89 Serie A-winning side. Klinsmann joined for 1989/90; Ramón Díaz partners Aldo Serena in this model.",
  "chelsea-2004-05": "Chelsea 04/05 means Mourinho's 2004/05 Premier League title-winning side. The 2011/12 Champions League winners are a separate season.",
  "tottenham-2016-17": "Tottenham finished the 2016/17 league season with 86 points. Their Champions League final run belongs to 2018/19.",
  "tottenham-2018-19": "This is Tottenham's 2018/19 Champions League finalist season, distinct from the 86-point 2016/17 league side.",
  "france-2018": "The sourced historical record below lists France's complete 2018 tournament squad and final XI separately from the smaller squad selected for this simulator.",
  "netherlands-1988": "This is the Netherlands' Euro 1988 team. The final XI below is a historical teamsheet; the simulator uses its own selected squad.",
  "england-2026": "This is a modelled 2026-cycle dataset, not an official FIFA tournament squad or a record of England's 2026 World Cup results.",
}

export function HistoricalTeamView({ team }: { team: HistoricalTeam }) {
  const siblings = getTeamsByClub(team.clubId).filter((item) => item.id !== team.id)
  const prime = getPrimeEntity(team.clubId)
  const opponentId = defaultOpponent(team.id)
  const opponent = getTeam(opponentId)
  const popular = relatedMatchups(team, 4)
  const copy = teamPageCopy(team, opponent)
  const editorial = getTeamEditorial(team.id)
  const evidence = SEARCH_LANDING_EVIDENCE[teamPath(team)]
  const historicalRecord = SEARCH_PRIORITY_RECORDS[teamPath(team)]
  const comparisons = CLUB_COMPARES.filter((pair) => pair.leftPeakId === team.id || pair.rightPeakId === team.id).slice(0, 3)
  const indexLabel = team.kind === "nation" ? "National teams" : "Teams"
  const orgHref = orgPath(team.kind, team.clubId)
  const orgIndexHref = orgIndexPath(team.kind)
  const TEAM_RUNS = 100
  const model = opponent ? cachedMatchupModel(team, opponent, TEAM_RUNS, `team:${team.id}`) : null
  const yearNote = SEARCH_YEAR_NOTES[team.id] ?? (isCurrentSquad(team) ? modelledCurrentSquadNote(team) : undefined)
  const faqs = [...(historicalRecord?.faqs ?? []), ...teamFaqs(team, { opponent, model, editorial, runs: TEAM_RUNS })]

  return (
    <div className="grid gap-6">
      <TrackOnMount event="team_page_view" payload={{ teamId: team.id, club: team.clubId }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: `${team.clubName} ${team.displaySeason}`,
            sport: "Soccer",
            url: absoluteUrl(teamPath(team)),
            description: copy.description,
            athlete: team.players.map((player) => ({
              "@type": "Person",
              name: player.name,
            })),
            coach: { "@type": "Person", name: team.manager },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: indexLabel, item: absoluteUrl(orgIndexHref) },
              { "@type": "ListItem", position: 2, name: team.clubName, item: absoluteUrl(orgHref) },
              {
                "@type": "ListItem",
                position: 3,
                name: `${team.clubName} ${team.displaySeason}`,
                item: absoluteUrl(teamPath(team)),
              },
            ],
          }),
        }}
      />
      {editorial ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: copy.h1,
              description: copy.description,
              url: absoluteUrl(teamPath(team)),
              datePublished: SITE.legalUpdatedIso,
              dateModified: SQUAD_PAGE_UPDATED_ISO,
              author: personSchema(),
              publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
            }),
          }}
        />
      ) : null}
      {editorial ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
      ) : null}
      <header className="grid gap-3">
        <p className="font-mono text-xs text-muted">
          <Link href={orgIndexPath(team.kind)} className="hover:text-gold">
            {indexLabel}
          </Link>
          <span className="px-2 text-line-hi">/</span>
          <Link href={orgPath(team.kind, team.clubId)} className="hover:text-gold">
            {team.clubName}
          </Link>
        </p>
        <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold">
          {copy.kicker}
        </p>
        <div className={`flex items-start gap-4 ${eraGlow(team.trophies) ? "era-sheen" : ""}`}>
          <PixelCrest clubId={team.clubId} size={64} />
          <div className="min-w-0 flex-1">
            <h1 className="page-title leading-snug">{copy.h1}</h1>
            <p className="mt-0.5 font-mono text-xs text-muted">
              {team.manager}
              <span className="mx-2 text-line-hi">·</span>
              {team.formation}
            </p>
            <div className="mt-2">
              <TrophyBadges trophies={team.trophies} />
            </div>
            {editorial ? <EditorialByline date={SQUAD_PAGE_UPDATED_LABEL} dateTime={SQUAD_PAGE_UPDATED_ISO} /> : null}
          </div>
          <OvrStamp value={team.overallRating} size="xl" label={team.clubCode} />
        </div>
        <div className="team-essay">
          {yearNote ? <p className="search-year-note">{yearNote}</p> : null}
          <p>{team.summary}</p>
          {editorial ? <p>{editorial.intro}</p> : copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <nav aria-label="On this team page" className="flex flex-wrap gap-4 text-sm text-gold">
          {historicalRecord ? <a href="#historical-record">Historical record</a> : null}
          <a href="#squad">Squad and formation</a>
          {editorial ? <a href="#season-dossier">Season and tactics</a> : null}
          <a href="#play-match">Simulate this team</a>
        </nav>
      </header>
      {historicalRecord ? <HistoricalRecord record={historicalRecord} /> : null}
      <section id="squad" className="grid scroll-mt-20 gap-4" aria-label="Model squad and formation">
        <h2 className="section-title">Selected squad and formation</h2>
        {team.id === "chelsea-2004-05" ? (
          <div className="result-panel p-4">
            <h3 className="section-title">Chelsea 04/05 lineup at a glance</h3>
            <p className="mt-3 text-sm leading-7 text-text">José Mourinho · 4-3-3 · Premier League and League Cup winners.</p>
            <p className="mt-2 text-sm leading-7 text-muted">Our representative XI: {team.startingXI.map((id) => team.players.find((player) => player.id === id)?.name).join(", ")}. Gallas, Joe Cole and Guðjohnsen are alternative selections; rotation and injuries changed the actual lineup across the season.</p>
          </div>
        ) : null}
        {evidence ? <p className="text-sm leading-7 text-muted">{evidence.scope}</p> : null}
        <SquadList team={team} />
        <Formation team={team} />
      </section>
      {evidence ? <LandingEvidence evidence={evidence} showScope={false} /> : null}

      {editorial ? (
        <section className="grid gap-4 border-y border-white/10 py-6" aria-labelledby="season-dossier">
          <div className="max-w-3xl">
            <p className="page-kicker">{copy.dossierKicker}</p>
            <h2 id="season-dossier" className="section-title mt-1">{copy.dossierHeading}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {editorial.sections.map((section, index) => (
              <article key={section.heading} className={`result-panel p-4 sm:p-5 ${index === editorial.sections.length - 1 && editorial.sections.length % 2 === 1 ? "md:col-span-2" : ""}`}>
                <p className="font-display text-[8px] uppercase tracking-[0.2em] text-gold">
                  {`${team.styleTags[index] ?? team.formation} · ${team.displaySeason}`}
                </p>
                <h3 className="mt-2 font-brand text-lg font-semibold tracking-wide text-text">{section.heading}</h3>
                <div className="mt-3 grid gap-3 text-sm leading-7 text-muted">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
          {editorial.sources ? (
            <p className="text-xs leading-6 text-muted">
              Historical records: {editorial.sources.map((source, index) => (
                <span key={source.url}>
                  {index > 0 ? " · " : ""}
                  <a href={source.url} className="text-gold hover:text-gold-2">{source.label}</a>
                </span>
              ))}
            </p>
          ) : null}
        </section>
      ) : null}

      {team.id === "chelsea-2004-05" ? (
        <p className="text-sm leading-6 text-muted">
          Put this season in context: <Link href="/compare/arsenal-vs-chelsea" className="text-gold hover:text-gold-2">Chelsea 2004/05 vs Arsenal&apos;s Invincibles</Link>
          {" · "}
          <Link href="/teams/chelsea/2011-12" className="text-gold hover:text-gold-2">Chelsea&apos;s 2011/12 Champions League squad</Link>
        </p>
      ) : null}

      <StarPlayers team={team} count={6} title={copy.starsHeading} />
      <section id="play-match" className="grid scroll-mt-20 gap-4" aria-label="Simulate this historical team">
        <h2 className="section-title">Play a hypothetical matchup</h2>
        <p className="text-sm leading-7 text-muted">The results below come from our simulator. They are hypothetical outcomes, separate from historical match results.</p>
        {opponent ? <QuickMatch home={team} away={opponent} /> : <Link href={`/simulate?home=${team.id}`} className="text-gold">Choose an opponent</Link>}
        {model ? <MonteCarloResults result={model} /> : null}
      </section>
      <TeamRatings team={team} />
      <StyleProfile team={team} />
      {comparisons.length > 0 ? (
        <nav className="result-panel p-4" aria-label="Related team comparisons">
          <h2 className="section-title">Compare this team&apos;s era</h2>
          <ul className="mt-3 grid gap-3 text-sm text-gold">
            {comparisons.map((pair) => <li key={pair.slug}><Link href={`/compare/${pair.slug}`}>{getTeam(pair.leftPeakId)?.clubName} vs {getTeam(pair.rightPeakId)?.clubName}: {getTeam(pair.leftPeakId)?.displaySeason} and {getTeam(pair.rightPeakId)?.displaySeason}</Link></li>)}
          </ul>
        </nav>
      ) : null}

      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          {copy.tagsHeading}
        </h2>
        <div className="flex flex-wrap gap-1.5 p-3">
          {team.styleTags.map((tag) => (
            <span key={tag} className="border border-white/15 px-2 py-1 font-mono text-[11px] text-muted">
              {team.clubCode} {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          {copy.honoursHeading}
        </h2>
        <ul className="grid gap-1 px-3 py-2 font-mono text-[12px] leading-5">
          {team.achievements.map((item) => (
            <li key={item} className="text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {popular.length > 0 ? (
        <section className="grid gap-2">
          <h2 className="section-title">{copy.matchupHeading}</h2>
          {popular.map((other) => (
            <MatchupRow key={other.id} href={vsPath(team.id, other.id)} home={team} away={other} />
          ))}
        </section>
      ) : null}

      {editorial ? (
        <section className="result-panel p-4 sm:p-5">
          <p className="page-kicker">{copy.faqKicker}</p>
          <h2 className="section-title mt-1">{copy.faqHeading}</h2>
          <dl className="mt-3 grid gap-3">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-brand text-base font-semibold text-text">{item.q}</dt>
                <dd className="mt-1 text-sm leading-6 text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
        {siblings.map((item) => (
          <Link key={item.id} href={teamPath(item)} className="text-gold hover:text-gold-2">
            {item.displaySeason}
          </Link>
        ))}
        {prime ? (
          <Link href={`/prime/${team.clubId}`} className="text-muted hover:text-gold">
            Prime {team.clubName}
          </Link>
        ) : null}
        {opponent ? (
          <Link href={teamPath(opponent)} className="text-muted hover:text-gold">
            {opponent.clubName} {opponent.displaySeason}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
