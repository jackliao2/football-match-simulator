import Link from "next/link"
import { MatchSetup } from "@/components/simulator/MatchSetup"
import { TeamCard } from "@/components/teams/TeamCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { FEATURED_MATCHUPS, HOMEPAGE_NATIONS, HOMEPAGE_TEAMS, vsPath } from "@/data/matchups"
import { getTeam } from "@/data/teams"
import { LOCALIZED_COPY, localizedPath, type Locale, type LocalizedSection } from "@/lib/i18n"
import type { HistoricalTeam } from "@/types"
import { SITE, absoluteUrl } from "@/lib/site"

function selected(ids: readonly string[]) {
  return ids.map((id) => getTeam(id)).filter((team): team is HistoricalTeam => Boolean(team))
}

const SECTION_EDITORIAL: Record<Locale, Record<LocalizedSection, [string, string, string]>> = {
  es: {
    simulate: ["Qué compara el simulador", "Cada opción representa una temporada concreta, con entrenador, formación, once y valoraciones propias. El resultado combina esa identidad con una semilla aleatoria: es una noche posible, no la predicción de un partido real.", "Expert AI Analysis interpreta los datos después de la simulación; no elige al ganador. Las valoraciones comparan el dominio de cada jugador en su época y no pretenden convertir décadas distintas en una prueba física moderna."],
    teams: ["Cómo está construido el archivo", "No publicamos una página vacía por cada club. La selección reúne campeones, equipos que cambiaron una idea táctica y temporadas que los aficionados siguen comparando. Cada tarjeta conduce al once, banquillo, entrenador, logros y estilo de ese año.", "Las plantillas 2025/26 son fotografías fechadas, no bases de datos en directo. Para discutir el mejor momento de un club, abre sus temporadas históricas; para enfrentar el presente con una leyenda, usa el simulador."],
    "national-teams": ["Selecciones por torneo y generación", "Una selección cambia mucho entre dos Mundiales. Por eso Brasil 1970, Brasil 2002 y Brasil 2026 son equipos distintos dentro del modelo. Los años históricos usan un once representativo del torneo; los recientes son una fotografía de la preparación actual.", "La colección prioriza campeones y selecciones que dejaron una pregunta futbolística duradera, no todos los participantes de cada competición. Puedes mezclar países, clubes y épocas, pero el resultado siempre es hipotético."],
    vs: ["Por qué estos partidos sí son soñados", "Cada duelo tiene una razón editorial: dos candidatos al mejor equipo de la historia, filosofías tácticas opuestas o generaciones que nunca pudieron enfrentarse. No llenamos la lista con partidos actuales solo porque sean recientes.", "La página de cada duelo incluye análisis escrito para esas dos selecciones, 400 simulaciones, marcadores frecuentes, goleadores, asistentes y los onces completos. Los porcentajes describen incertidumbre; no son cuotas ni consejos de apuestas."],
  },
  "pt-br": {
    simulate: ["O que o simulador compara", "Cada opção representa uma temporada específica, com técnico, formação, onze inicial e avaliações próprias. O resultado combina essa identidade com uma semente aleatória: é uma noite possível, não a previsão de uma partida real.", "A Expert AI Analysis interpreta os dados depois da simulação; ela não escolhe o vencedor. As notas comparam o domínio de cada jogador em sua época e não transformam décadas diferentes em um teste físico moderno."],
    teams: ["Como o arquivo foi montado", "Não publicamos uma página vazia para cada clube. A seleção reúne campeões, equipes que mudaram uma ideia tática e temporadas que os torcedores ainda comparam. Cada cartão leva ao onze, banco, técnico, conquistas e estilo daquele ano.", "Os elencos de 2025/26 são retratos datados, não bases ao vivo. Para discutir o auge de um clube, abra suas temporadas históricas; para desafiar uma lenda com o time atual, use o simulador."],
    "national-teams": ["Seleções por torneio e geração", "Uma seleção muda muito entre duas Copas. Por isso Brasil 1970, Brasil 2002 e Brasil 2026 são equipes diferentes no modelo. Os anos históricos usam um onze representativo do torneio; os recentes são um retrato do ciclo atual.", "A coleção prioriza campeões e seleções que deixaram uma questão futebolística duradoura, não todos os participantes de cada competição. Você pode misturar países, clubes e épocas, mas o resultado é sempre hipotético."],
    vs: ["Por que estes jogos são realmente dos sonhos", "Cada confronto tem uma razão editorial: dois candidatos a melhor time da história, filosofias táticas opostas ou gerações que nunca puderam se enfrentar. A lista não é preenchida com jogos atuais apenas porque são recentes.", "A página de cada duelo traz análise escrita para aquelas duas equipes, 400 simulações, placares frequentes, artilheiros, assistências e os onzes completos. As porcentagens descrevem incerteza; não são odds nem conselho de aposta."],
  },
}

function LocalizedEditorial({ locale, section }: { locale: Locale; section: LocalizedSection }) {
  const [title, first, second] = SECTION_EDITORIAL[locale][section]
  return <section className="result-panel p-4 sm:p-5"><h2 className="font-brand text-xl font-semibold text-text">{title}</h2><div className="editorial-copy mt-3"><p>{first}</p><p>{second}</p></div></section>
}

export function LocalizedPage({ locale, section }: { locale: Locale; section?: LocalizedSection }) {
  const copy = LOCALIZED_COPY[locale]
  const clubs = selected(HOMEPAGE_TEAMS).slice(0, 6)
  const nations = selected(HOMEPAGE_NATIONS).slice(0, 6)
  const matches = FEATURED_MATCHUPS.slice(0, section === "vs" ? 18 : 6).flatMap(([homeId, awayId]) => {
    const home = getTeam(homeId)
    const away = getTeam(awayId)
    return home && away ? [{ home, away, href: vsPath(homeId, awayId) }] : []
  })

  if (section === "simulate") {
    return <div lang={locale === "pt-br" ? "pt-BR" : "es"} className="grid gap-5"><PageHeader kicker={copy.nav.simulate} title={copy.simulate.title} lead={copy.simulate.lead} /><MatchSetup defaultHome="barcelona-2008-09" defaultAway="real-madrid-2016-17" locale={locale} /><LocalizedEditorial locale={locale} section="simulate" /></div>
  }
  if (section === "teams" || section === "national-teams") {
    const isNations = section === "national-teams"
    const items = isNations ? nations : clubs
    const pageCopy = isNations ? copy.nations : copy.teams
    return <div lang={locale === "pt-br" ? "pt-BR" : "es"} className="grid gap-6"><PageHeader kicker={isNations ? copy.nav.nations : copy.nav.teams} title={pageCopy.title} lead={pageCopy.lead} /><LocalizedEditorial locale={locale} section={section} /><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{items.map((team) => <TeamCard key={team.id} team={team} showSquad={false} />)}</div><Link href={localizedPath(locale, "/simulate")} className="rail-btn rail-btn-primary rail-btn-inline justify-self-start">{copy.links.simulate}</Link></div>
  }
  if (section === "vs") {
    return <div lang={locale === "pt-br" ? "pt-BR" : "es"} className="grid gap-6"><PageHeader kicker={copy.nav.dreams} title={copy.dreams.title} lead={copy.dreams.lead} /><LocalizedEditorial locale={locale} section="vs" /><div className="grid gap-2">{matches.map((match) => <MatchupRow key={match.href} {...match} />)}</div></div>
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
      <MatchSetup defaultHome="barcelona-2008-09" defaultAway="real-madrid-2016-17" locale={locale} />
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
