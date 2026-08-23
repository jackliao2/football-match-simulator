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
      <div className="grid gap-3 sm:grid-cols-2">
        {primeEntities.map((entity) => (
          <Link key={entity.slug} href={`/prime/${entity.slug}`} className="result-panel p-4 no-underline hover:border-gold">
            <h2 className="font-mono text-base font-semibold tracking-tight">{entity.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{entity.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
