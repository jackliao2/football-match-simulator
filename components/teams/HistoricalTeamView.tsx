import Link from "next/link"
import { MonteCarloResults } from "@/components/simulator/MonteCarloResults"
import { QuickMatch } from "@/components/simulator/QuickMatch"
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
import { informalSeason } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"
import type { HistoricalTeam } from "@/types"

const SEARCH_YEAR_NOTES: Record<string, string> = {
  "real-madrid-2016-17": "Often searched as the Real Madrid 2017 squad, this is Zidane's full 2016/17 team: starting XI, formation, manager and supporting players.",
  "real-madrid-2013-14": "Real Madrid 2014 squad searches usually mean this 2013/14 La Décima side rather than a later Zidane team.",
  "barcelona-2014-15": "Often searched as the Barcelona 2015 squad or 2015 Barça team, this is Luis Enrique's complete 2014/15 treble-winning group.",
  "barcelona-2008-09": "The Barcelona 2009 squad search usually means this 2008/09 treble side, with its starting XI, formation and full supporting cast.",
  "barcelona-2010-11": "The Barcelona 2011 squad search usually points here: Guardiola's 2010/11 team, its Wembley lineup and the players behind the starting XI.",
  "manchester-united-2007-08": "Often searched as the Manchester United 2008 squad, this is Ferguson's complete 2007/08 Champions League-winning team.",
  "manchester-united-1998-99": "Often searched as the Manchester United 1999 squad, this is the complete 1998/99 treble team rather than only the Champions League final XI.",
  "arsenal-2003-04": "Arsenal 03/04 and Arsenal 2004 searches point to the Invincibles: the full squad, preferred lineup and shape used across the unbeaten league season.",
  "arsenal-1997-98": "Arsenal 1998 squad searches usually mean Wenger's first Double team, with Overmars, Anelka and Vieira still building the later Invincibles core.",
  "liverpool-2004-05": "Often searched as the Liverpool 2005 squad, this is Benítez's complete 2004/05 group rather than only the Istanbul final lineup.",
  "liverpool-2018-19": "Often searched as the Liverpool 2019 squad, this is Klopp's full 2018/19 Champions League-winning team and preferred formation.",
  "ac-milan-2006-07": "Often searched as the AC Milan 2007 squad, this is Ancelotti's complete 2006/07 Champions League-winning group and Athens-era lineup.",
  "ac-milan-1988-89": "Milan 1989 or Sacchi Milan searches land here: the 1988/89 European Cup side with Baresi, Rijkaard, Gullit and Van Basten.",
  "inter-milan-2009-10": "Inter 2010 treble searches point to Mourinho's 2009/10 squad, not a later Inter side with a similar badge.",
  "inter-milan-1988-89": "Inter 1989 squad searches usually mean the record Serie A winners with Matthäus, Klinsmann and Brehme.",
  "bayern-munich-2012-13": "Bayern 2013 treble searches mean Heynckes' 2012/13 team — the complete squad, not only the Wembley final XI.",
  "bayern-munich-2019-20": "Bayern 2020 sextuple searches point to Flick's 2019/20 side after he replaced Kovac mid-season.",
  "manchester-city-2022-23": "City 2023 treble searches mean Guardiola's 2022/23 squad with Haaland, Rodri and Stones stepping into midfield.",
  "manchester-city-2017-18": "City 2018 squad searches usually mean the 100-point 2017/18 Premier League winners.",
  "chelsea-2004-05":
    "Chelsea 04/05, Chelsea 04 05, Chelsea 2004 squad and Chelsea 2004/05 lineup searches all mean Mourinho's first title side — not the 2012 Champions League winners.",
  "chelsea-2011-12":
    "Chelsea 11/12, Chelsea 2012 Champions League and Munich 2012 searches mean Di Matteo's knockout side — not Mourinho's 2004/05 title winners.",
  "everton-1984-85":
    "Everton 84/85, Everton 1985 and Kendall's champions searches mean the First Division and Cup Winners' Cup side, not a later Goodison team.",
  "juventus-2016-17": "Juve 2017 squad searches usually mean Allegri's Champions League finalists with Buffon, Chiellini and Dybala.",
  "ajax-1994-95": "Ajax 1995 squad searches mean Van Gaal's young European Cup winners, not a later Ajax generation.",
  "borussia-dortmund-2012-13": "Dortmund 2013 squad searches point to Klopp's Champions League finalists, one year after the 2011/12 title.",
  "atletico-madrid-2013-14": "Atlético 2014 league title searches mean Simeone's 2013/14 side that beat Barcelona and Madrid over a season.",
  "porto-2003-04": "Porto 2004 Champions League searches mean Mourinho's 2003/04 squad, not a later Dragões team.",
  "paris-saint-germain-2022-23": "PSG 2023 squad searches usually mean the Messi–Mbappé–Neymar season rather than a later rebuild.",
  "napoli-1986-87": "Napoli 1987 scudetto searches mean Maradona's first Serie A winning side.",
  "santos-1962": "Santos 1962 squad searches point to Pelé's Intercontinental Cup side, not a modern Santos roster.",
  "brazil-1970": "Brazil 1970 World Cup squad searches mean Zagallo's Mexico winners — the complete tournament group, not a later Seleção.",
  "brazil-2002": "Brazil 2002 World Cup squad searches mean Scolari's Ronaldo–Rivaldo–Ronaldinho winners.",
  "brazil-1958": "Brazil 1958 World Cup squad searches mean the Sweden tournament side, with a 17-year-old Pelé.",
  "brazil-1982": "Brazil 1982 World Cup squad searches mean Telê Santana's side, not a later trophy-winning Brazil team.",
  "argentina-1986": "Argentina 1986 World Cup squad searches mean Bilardo's Mexico winners built around Maradona.",
  "argentina-2022": "Argentina 2022 World Cup squad searches mean Scaloni's Qatar winners, not the 1986 side.",
  "france-1998": "France 1998 World Cup squad searches mean Jacquet's home-tournament winners.",
  "france-2018": "France 2018 World Cup squad searches mean Deschamps' Russia winners with Mbappé, Kanté and Griezmann.",
  "spain-2010": "Spain 2010 World Cup squad searches mean Del Bosque's tiki-taka winners, not the later Euro sides alone.",
  "germany-2014": "Germany 2014 World Cup squad searches mean Löw's Brazil-tournament winners.",
  "germany-1990": "Germany 1990 World Cup squad searches mean Beckenbauer's West Germany winners.",
  "italy-2006": "Italy 2006 World Cup squad searches mean Lippi's Berlin winners, not a later Azzurri cycle.",
  "netherlands-1974": "Netherlands 1974 World Cup squad searches mean Michels' Total Football side, not the 1988 Euros winners.",
  "netherlands-1988":
    "1988 Netherlands squad, 1988 Holland team and 1988 Hollanda kadrosu searches mean Van Basten's Euros winners, not the 1974 World Cup side.",
  "england-2026":
    "England squad 2026, England 2026 national team and England World Cup 2026 players searches land here: a modelled starting XI and formation for the 2026 cycle, not an official FIFA list.",
  "england-1966": "England 1966 World Cup squad searches mean Ramsey's home winners rather than a later tournament XI.",
  "portugal-2016": "Portugal 2016 Euros squad searches mean Santos' tournament winners, not a World Cup cycle.",
  "croatia-2018":
    "Croatia 2018 World Cup squad, Modrić 2018 and England semi-final searches mean Dalić's Moscow finalists — not the 1998 third-place side or a 2026 cycle.",
  "senegal-2002":
    "Senegal 2002 World Cup squad searches mean the side that beat France 1–0 in the opening game and reached the quarter-finals, not a later Teranga XI.",
  "hungary-1954": "Hungary 1954 World Cup squad searches mean the Mighty Magyars, not a later Hungary team.",
  "celtic-1966-67": "Celtic 1967 Lisbon Lions searches mean Stein's European Cup winners.",
  "nottingham-forest-1979-80": "Forest 1980 European Cup searches mean Clough's second successive winners.",
}

export function HistoricalTeamView({ team }: { team: HistoricalTeam }) {
  const siblings = getTeamsByClub(team.clubId).filter((item) => item.id !== team.id)
  const prime = getPrimeEntity(team.clubId)
  const opponentId = defaultOpponent(team.id)
  const opponent = getTeam(opponentId)
  const popular = relatedMatchups(team, 4)
  const copy = teamPageCopy(team, opponent)
  const editorial = getTeamEditorial(team.id)
  const indexLabel = team.kind === "nation" ? "National teams" : "Teams"
  const orgHref = orgPath(team.kind, team.clubId)
  const orgIndexHref = orgIndexPath(team.kind)
  const TEAM_RUNS = 100
  const model = opponent ? cachedMatchupModel(team, opponent, TEAM_RUNS, `team:${team.id}`) : null
  const shortSeason = informalSeason(team)
  const faqs = [
    {
      q: `What was the ${team.clubName} ${team.displaySeason} squad?`,
      a: `This page is the ${team.clubName} ${team.displaySeason} squad used in the simulator: starting XI, bench, ${team.formation} under ${team.manager}, and era-relative ratings.`,
    },
    ...(shortSeason
      ? [
          {
            q: `Is this the ${team.clubName} ${shortSeason} squad?`,
            a: `Yes. ${team.clubName} ${shortSeason}, ${team.clubName} ${team.displaySeason} squad and ${team.clubName} ${team.eraYear} lineup searches all refer to this ${team.manager} side.`,
          },
        ]
      : []),
    opponent && model
      ? {
          q: `Who would win between ${team.clubName} ${team.displaySeason} and ${opponent.clubName} ${opponent.displaySeason}?`,
          a: `Across ${TEAM_RUNS} seeded simulations, ${team.clubName} won ${model.homeWinPct}%, ${opponent.clubName} won ${model.awayWinPct}%, and ${model.drawPct}% finished level. The most common score was ${model.mostCommonScore.replace("-", "–")}. This is a modelled hypothetical, not a prediction of a real fixture.`,
        }
      : {
          q: `Can I simulate the ${team.clubName} ${team.displaySeason} squad?`,
          a: `Yes. Open the simulator from this page, pick an opponent, and run a single match or 100 matches with the same ratings and formation shown here.`,
        },
    {
      q: `What formation did ${team.clubName} ${team.displaySeason} play?`,
      a: `${team.clubName} ${team.displaySeason} is modelled in a ${team.formation} under ${team.manager}, with attack ${team.attackRating}, midfield ${team.midfieldRating} and defence ${team.defenseRating}.`,
    },
    opponent
      ? {
          q: `How do I play ${team.clubName} ${team.displaySeason} against ${opponent.clubName}?`,
          a: `Use the simulator on this page for a fresh seeded result, or open the dream-match page for the written dossier and the 100-match distribution.`,
        }
      : {
          q: `Where is the ${team.clubName} ${team.displaySeason} starting XI?`,
          a: `The starting XI, bench and ratings are listed on this page. They are the squad the match simulator uses.`,
        },
  ]

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
              dateModified: SITE.legalUpdatedIso,
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
            <p className="mt-1 font-mono text-sm text-muted">{copy.deck}</p>
            <p className="mt-0.5 font-mono text-xs text-muted">
              {team.manager}
              <span className="mx-2 text-line-hi">·</span>
              {team.formation}
            </p>
            <div className="mt-2">
              <TrophyBadges trophies={team.trophies} />
            </div>
            {editorial ? <EditorialByline /> : null}
          </div>
          <OvrStamp value={team.overallRating} size="xl" />
        </div>
        <div className="team-essay">
          {SEARCH_YEAR_NOTES[team.id] ? <p className="search-year-note">{SEARCH_YEAR_NOTES[team.id]}</p> : null}
          <p>{team.summary}</p>
          {editorial ? <p>{editorial.intro}</p> : copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {opponent ? (
          <QuickMatch home={team} away={opponent} />
        ) : (
          <Link href={`/simulate?home=${team.id}&away=${opponentId}`} className="rail-btn rail-btn-primary rail-btn-inline">
            Simulate this team
          </Link>
        )}
      </header>
      {model ? <MonteCarloResults result={model} /> : null}

      {editorial ? (
        <section className="grid gap-4 border-y border-white/10 py-6" aria-labelledby="season-dossier">
          <div className="max-w-3xl">
            <p className="page-kicker">Season dossier</p>
            <h2 id="season-dossier" className="section-title mt-1">Why this team mattered</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {editorial.sections.map((section, index) => (
              <article key={section.heading} className={`result-panel p-4 sm:p-5 ${index === editorial.sections.length - 1 && editorial.sections.length % 2 === 1 ? "md:col-span-2" : ""}`}>
                <p className="font-display text-[8px] uppercase tracking-[0.2em] text-gold">Chapter {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-brand text-lg font-semibold tracking-wide text-text">{section.heading}</h3>
                <div className="mt-3 grid gap-3 text-sm leading-7 text-muted">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <StarPlayers team={team} count={6} title="Key Players" />
      <Formation team={team} />
      <SquadList team={team} />
      <TeamRatings team={team} />
      <StyleProfile team={team} />

      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Style tags
        </h2>
        <div className="flex flex-wrap gap-1.5 p-3">
          {team.styleTags.map((tag) => (
            <span key={tag} className="border border-white/15 px-2 py-1 font-mono text-[11px] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="result-panel">
        <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Achievements
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
          <p className="page-kicker">FAQ</p>
          <h2 className="section-title mt-1">Questions about this squad</h2>
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
