import type { Metadata } from "next"
import Link from "next/link"
import { TeamCard } from "@/components/teams/TeamCard"
import { QuickMatch } from "@/components/simulator/QuickMatch"
import { PageHeader } from "@/components/ui/PageHeader"
import { getTeam } from "@/data/teams"
import { pageMetadata } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"
import { EditorialByline, personSchema } from "@/components/ui/EditorialByline"
import type { HistoricalTeam } from "@/types"

export const metadata: Metadata = pageMetadata({
  title: "Best Football Team Ever — Six All-Time Great Sides Compared",
  description: "What is the best football team ever? Compare Barcelona 2010/11, Brazil 1970, AC Milan 1988/89, Real Madrid 2016/17 and other legendary teams.",
  path: "/best-football-team-ever",
  keywords: ["best football team ever", "the best football team ever", "best football clubs ever", "best Barcelona team ever", "best World Cup team ever"],
})

const PICKS = [
  ["barcelona-2010-11", "01", "Our overall pick", "The strongest blend of control, talent and repeatable dominance. Messi's false nine movement sat inside the Xavi–Busquets–Iniesta midfield, and the Wembley final remains the cleanest demonstration."],
  ["brazil-1970", "02", "Best international side", "Six wins from six in Mexico and a front line that turned individual freedom into collective football. Cross-era athletic comparisons are impossible; tournament authority is not."],
  ["ac-milan-1988-89", "03", "Most influential", "Sacchi's compact pressing changed elite club football while Baresi, Maldini and the Dutch trio supplied generational quality in every line."],
  ["real-madrid-2016-17", "04", "Deepest champions", "League and Champions League winners with Ronaldo finishing, the Casemiro–Kroos–Modrić midfield controlling games and a bench strong enough to change them."],
  ["manchester-united-2007-08", "05", "Best Premier League balance", "Peak Ronaldo, Rooney and Tevez ahead of Ferdinand and Vidić: speed, defensive security and match-winners without a soft unit."],
  ["bayern-munich-2012-13", "06", "Most complete treble", "Relentless width, pressing and physical power. Bayern won every major front and dismantled Barcelona over two Champions League semi-final legs."],
] as const

export default function BestFootballTeamEverPage() {
  const picks = PICKS.flatMap(([id, rank, label, argument]) => {
    const team = getTeam(id)
    return team ? [{ team, rank, label, argument }] : []
  })
  return <div className="grid gap-6">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Best Football Team Ever", description: metadata.description, mainEntityOfPage: absoluteUrl("/best-football-team-ever"), author: personSchema(), publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") }, datePublished: SITE.legalUpdatedIso, dateModified: SITE.legalUpdatedIso }) }} />
    <PageHeader kicker="All-time debate" title="What is the best football team ever?" lead="There is no neutral time machine. This ranking weighs dominance in context, tactical influence, quality across the XI and how convincingly the team answered the strongest opponents available." />
    <EditorialByline />
    <section className="editorial-verdict p-4 sm:p-5">
      <p className="page-kicker">The verdict</p><h2 className="section-title mt-2">Barcelona 2010/11 is our pick</h2>
      <div className="editorial-copy mt-3"><p><strong>Not because it won the most trophies in one season.</strong> Barcelona’s 2008/09 side did. We choose 2010/11 because its control survived against every type of opponent and because its best performance — the Champions League final against Manchester United — looked like a complete statement of an idea.</p><p>Brazil 1970 is the strongest national-team answer; AC Milan 1988/89 has the greatest tactical influence. Change the criterion and the winner can change. That is why every candidate below links to its real squad and into the simulator.</p></div>
    </section>
    <section className="grid gap-4"><div><p className="page-kicker">The shortlist</p><h2 className="section-title mt-1">Six teams with a serious claim</h2></div>
      <div className="grid gap-4 lg:grid-cols-2">{picks.map(({ team, rank, label, argument }) => <article key={team.id} className="result-panel p-4"><p className="font-display text-[7px] tracking-[.18em] text-gold">{rank} · {label}</p><div className="mt-3"><TeamCard team={team as HistoricalTeam} showSquad={false} /></div><p className="mt-3 text-sm leading-6 text-muted">{argument}</p></article>)}</div>
    </section>
    <section className="result-panel p-4 sm:p-5"><p className="page-kicker">How to read the list</p><h2 className="section-title mt-2">Greatest is not the same as unbeatable</h2><div className="editorial-copy mt-3"><p>A simulated result is one possible match, not proof that a modern side erases an older achievement. Ratings are era-relative. Expert AI adds a 100-match distribution when you want the wider pattern.</p><p><Link href="/simulate" className="text-gold">Choose any two candidates and simulate the argument →</Link></p></div></section>
    {picks[0] && picks[1] ? <QuickMatch home={picks[0].team as HistoricalTeam} away={picks[1].team as HistoricalTeam} /> : null}
  </div>
}
