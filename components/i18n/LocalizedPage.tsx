import Link from "next/link"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { FEATURED_MATCHUPS, HOMEPAGE_NATIONS, HOMEPAGE_TEAMS } from "@/data/matchups"
import { getTeam, teams, toTeamOption } from "@/data/teams"
import { LOCALIZED_COPY, localizedPath, type Locale, type LocalizedSection } from "@/lib/i18n"
import type { HistoricalTeam } from "@/types"
import { SITE, absoluteUrl } from "@/lib/site"

function selected(ids: readonly string[]) {
  return ids.map((id) => getTeam(id)).filter((team): team is HistoricalTeam => Boolean(team))
}

export function LocalizedPage({ locale, section }: { locale: Locale; section?: LocalizedSection }) {
  const copy = LOCALIZED_COPY[locale]
  const options = teams.map(toTeamOption)
  const clubs = selected(HOMEPAGE_TEAMS).slice(0, 6)
  const nations = selected(HOMEPAGE_NATIONS).slice(0, 6)
  const matches = FEATURED_MATCHUPS.slice(0, section === "vs" ? 18 : 6).flatMap(([homeId, awayId]) => {
    const home = getTeam(homeId)
    const away = getTeam(awayId)
    return home && away ? [{ home, away, href: `/vs/${homeId}-vs-${awayId}` }] : []
  })

  if (section === "simulate") {
    return <div lang={locale === "pt-br" ? "pt-BR" : "es"} className="grid gap-5"><PageHeader kicker={copy.nav.simulate} title={copy.simulate.title} lead={copy.simulate.lead} /><MatchSetup teams={options} defaultHome="barcelona-2008-09" defaultAway="real-madrid-2016-17" locale={locale} /></div>
  }
  if (section === "teams" || section === "national-teams") {
    const isNations = section === "national-teams"
    const items = isNations ? nations : clubs
    const pageCopy = isNations ? copy.nations : copy.teams
    return <div lang={locale === "pt-br" ? "pt-BR" : "es"} className="grid gap-6"><PageHeader kicker={isNations ? copy.nav.nations : copy.nav.teams} title={pageCopy.title} lead={pageCopy.lead} /><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{items.map((team) => <TeamCard key={team.id} team={team} showSquad={false} />)}</div><Link href={localizedPath(locale, "/simulate")} className="rail-btn rail-btn-primary rail-btn-inline justify-self-start">{copy.links.simulate}</Link></div>
  }
  if (section === "vs") {
    return <div lang={locale === "pt-br" ? "pt-BR" : "es"} className="grid gap-6"><PageHeader kicker={copy.nav.dreams} title={copy.dreams.title} lead={copy.dreams.lead} /><div className="grid gap-2">{matches.map((match) => <MatchupRow key={match.href} {...match} />)}</div></div>
  }

  return (
    <div lang={locale === "pt-br" ? "pt-BR" : "es"} className="grid gap-5">
      <section className="home-hero">
        <p className="home-hero-kicker">{copy.home.kicker}</p>
        <h1 className="home-hero-title" aria-label="LegendaryMatch">
          <span className="home-hero-legendary">Legendary</span>
          <span className="home-hero-rule" aria-hidden="true" />
          <span className="home-hero-match">Match</span>
        </h1>
        <p className="home-hero-tagline">
          {copy.home.tagline.map((line, index) => (
            <span key={line} className="contents">
              {index > 0 ? <span className="home-hero-dot" aria-hidden="true">·</span> : null}
              <span>{line}</span>
            </span>
          ))}
        </p>
      </section>
      <MatchSetup teams={options} defaultHome="barcelona-2008-09" defaultAway="real-madrid-2016-17" locale={locale} />
      <LocalizedSection title={copy.sections.dream} href={localizedPath(locale, "/vs")} link={copy.links.all}><div className="grid gap-2">{matches.slice(0, 3).map((match) => <MatchupRow key={match.href} {...match} />)}</div></LocalizedSection>
      <section className="home-editorial-section">
        <LocalizedHeading title={copy.howTitle} />
        <div className="home-how-grid">{copy.how.map(([step, title, body]) => <article key={step} className="home-how-card"><p className="home-how-number">{step}</p><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>
      <LocalizedSection title={copy.sections.clubs} href={localizedPath(locale, "/teams")} link={copy.links.all}><div className="grid gap-3 md:grid-cols-3">{clubs.slice(0, 3).map((team) => <TeamCard key={team.id} team={team} showSquad={false} />)}</div></LocalizedSection>
      <LocalizedSection title={copy.sections.nations} href={localizedPath(locale, "/national-teams")} link={copy.links.all}><div className="grid gap-3 md:grid-cols-3">{nations.slice(0, 3).map((team) => <TeamCard key={team.id} team={team} showSquad={false} />)}</div></LocalizedSection>
      <section className="result-panel px-4 py-4 sm:px-5"><h2 className="font-brand text-xl font-semibold text-text">{copy.aboutTitle}</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-text/80">{copy.aboutBody}</p></section>
      <section className="home-editorial-section"><LocalizedHeading title={copy.faqTitle} /><div className="home-faq-list">{copy.faq.map(([question, answer]) => <details key={question} className="home-faq-item group"><summary>{question}<span className="home-faq-plus">+</span></summary><p>{answer}</p></details>)}</div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: SITE.name, applicationCategory: "GameApplication", operatingSystem: "Web", url: absoluteUrl(localizedPath(locale)), description: copy.home.metaDescription, inLanguage: locale === "pt-br" ? "pt-BR" : "es" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale === "pt-br" ? "pt-BR" : "es", mainEntity: copy.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} />
    </div>
  )
}

function LocalizedHeading({ title }: { title: string }) {
  return <div className="home-editorial-heading"><h2>{title}</h2><i aria-hidden="true" /></div>
}

function LocalizedSection({ title, href, link, children }: { title: string; href: string; link: string; children: React.ReactNode }) {
  return <section className="grid gap-3"><div className="flex items-end justify-between gap-3"><h2 className="font-brand text-xl font-semibold text-text">{title}</h2><Link href={href} className="font-mono text-xs text-gold">{link} →</Link></div>{children}</section>
}
