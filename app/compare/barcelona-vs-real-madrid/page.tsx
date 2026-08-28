import type { Metadata } from "next"
import Link from "next/link"
import { MatchupRow } from "@/components/ui/MatchupRow"
import { PageHeader } from "@/components/ui/PageHeader"
import { getTeam } from "@/data/teams"
import { vsPath } from "@/data/matchups"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Barcelona or Real Madrid — Which Is Better?",
  description: "Barcelona or Real Madrid: compare their all-time case, greatest eras and prime teams, then simulate Barcelona 2010/11 vs Real Madrid 2016/17.",
  path: "/compare/barcelona-vs-real-madrid",
  keywords: ["barcelona or real madrid which is better", "which is better barcelona or real madrid", "real madrid or barcelona which is better", "prime real madrid vs prime barcelona", "prime el clasico"],
})

export default function BarcelonaVsRealMadridPage() {
  const barca = getTeam("barcelona-2010-11")
  const madrid = getTeam("real-madrid-2016-17")
  if (!barca || !madrid) return null
  return <div className="grid gap-6">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Barcelona or Real Madrid — Which Is Better?", mainEntityOfPage: absoluteUrl("/compare/barcelona-vs-real-madrid"), about: ["FC Barcelona", "Real Madrid CF"] }) }} />
    <PageHeader kicker="Club comparison" title="Barcelona or Real Madrid: which is better?" lead="The answer changes with the question. Real Madrid owns the stronger all-time European case. Barcelona’s best modern side reached the higher tactical peak. Here is the distinction before we send their prime teams into the simulator." />
    <section className="editorial-verdict p-4 sm:p-5"><p className="page-kicker">The call</p><h2 className="section-title mt-2">Real Madrid all-time; Barcelona at their modern peak</h2><div className="editorial-copy mt-3"><p><strong>If “better” means the greater club across history, our answer is Real Madrid.</strong> Their European record spans generations rather than one dynasty, and the club repeatedly rebuilt winning teams around different stars and tactical identities.</p><p><strong>If it means the best single version of either club, we choose Barcelona 2010/11.</strong> Guardiola’s side controlled territory and possession with a clarity that influenced the sport beyond its own trophy cabinet.</p></div></section>
    <section><p className="page-kicker">Argument by category</p><h2 className="section-title mt-2 mb-3">Where each club has the edge</h2><div className="comparison-table">
      <div className="comparison-row"><span>Real Madrid</span><b>History</b><span>Barcelona</span></div>
      <div className="comparison-row"><span>European longevity</span><b>All-time</b><span>Football identity</span></div>
      <div className="comparison-row"><span>2016/17 depth</span><b>Prime squad</b><span>2010/11 control</span></div>
      <div className="comparison-row"><span>Ronaldo in knockout ties</span><b>Decider</b><span>Messi between the lines</span></div>
      <div className="comparison-row"><span>Multiple winning cycles</span><b>Legacy</b><span>Greater tactical influence</span></div>
    </div></section>
    <section className="grid gap-3"><div><p className="page-kicker">Prime El Clásico</p><h2 className="section-title mt-1">Barcelona 2010/11 vs Real Madrid 2016/17</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-muted">This matchup tests the strongest modern version of each idea: Barcelona’s positional control against Madrid’s depth, transition threat and Champions League knockout experience.</p></div><MatchupRow href={vsPath(barca.id, madrid.id)} home={barca} away={madrid} /></section>
    <section className="grid gap-3 sm:grid-cols-2"><Link href="/prime/barcelona" className="home-prime-card"><span>Prime dossier</span><h2>When was Barcelona’s prime?</h2><p>Compare 2008/09, 2010/11 and the 2014/15 MSN treble.</p><b>Open Barcelona →</b></Link><Link href="/prime/real-madrid" className="home-prime-card"><span>Prime dossier</span><h2>When was Real Madrid’s prime?</h2><p>Compare La Décima with Zidane’s 2016/17 double winners.</p><b>Open Real Madrid →</b></Link></section>
  </div>
}
