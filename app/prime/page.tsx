import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/ui/PageHeader"
import { primeEntities } from "@/data/prime"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Prime Football Teams",
  description:
    "When was Barcelona's prime? Real Madrid's? Manchester United's? Messi's? Prime pages compare legendary seasons, then send you into the football match simulator.",
  path: "/prime",
  keywords: [
    "prime barcelona",
    "barcelona prime",
    "barca prime",
    "prime real madrid",
    "real madrid prime",
    "messi's prime",
    "messi prime year",
    "prime manchester united",
    "prime brazil",
    "football match simulator",
  ],
})

export default function PrimeIndexPage() {
  return (
    <div className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Prime Football Teams",
            url: absoluteUrl("/prime"),
          }),
        }}
      />
      <PageHeader
        kicker="Discovery"
        title="When was their prime?"
        lead="Prime pages ask when a club or player peaked, then link into historical squads you can simulate."
      />
      <section className="result-panel p-4 sm:p-5">
        <p className="page-kicker">Editorial standard</p>
        <h2 className="section-title mt-2">Prime is a question, not the highest OVR</h2>
        <div className="editorial-copy mt-3">
          <p>These pages separate three ideas that are often mixed together: the greatest achievement, the strongest single team and the season that best expressed an identity. Manchester United 1998/99 own the greater trophy story; the 2007/08 side may still be the more complete XI. Both arguments belong on the page.</p>
          <p>Each verdict considers performance in its own era, quality across the squad, tactical influence and how convincingly the team handled elite opposition. Current squads appear for comparison but are never labelled a prime before their story is complete.</p>
        </div>
      </section>
      <div className="grid gap-3 sm:grid-cols-2">
        {primeEntities.map((entity) => (
          <Link key={entity.slug} href={`/prime/${entity.slug}`} className="home-prime-card">
            <span>Prime dossier</span>
            <h2>{entity.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{entity.description}</p>
            <b>Explore the eras →</b>
          </Link>
        ))}
      </div>
      <section className="grid gap-3 border-t border-white/10 pt-5">
        <p className="page-kicker">How to use the dossiers</p>
        <div className="editorial-copy">
          <p>Open a prime page for the competing seasons and our written verdict. Every candidate links to a full squad page, so the argument can be checked against the manager, formation, XI, bench, achievements and tactical ratings rather than a single famous photograph.</p>
          <p>The simulator is the last step, not the evidence by itself. Run two eras more than once, compare the distribution, then decide whether the model understood the football reason you preferred one side.</p>
        </div>
      </section>
    </div>
  )
}
