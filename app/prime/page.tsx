import type { Metadata } from "next"
import Link from "next/link"
import { primeEntities } from "@/data/prime"

export const metadata: Metadata = {
  title: "Prime Football Teams",
  description:
    "When was Barcelona's prime? Real Madrid's? Manchester United's? Messi's? Prime pages are discovery pages into historical squads you can simulate.",
  alternates: { canonical: "/prime" },
}

export default function PrimeIndexPage() {
  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <h1 className="font-display text-lg uppercase tracking-[0.08em] sm:text-xl">Prime</h1>
        <p className="max-w-2xl text-sm leading-7 text-muted">
          Prime is a discovery layer, not the product name. Each page asks when a club or player
          peaked, then links into historical team pages and the simulator.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {primeEntities.map((entity) => (
          <Link
            key={entity.slug}
            href={`/prime/${entity.slug}`}
            className="border-2 border-line bg-panel p-4 no-underline hover:border-gold"
          >
            <h2 className="font-display text-[11px] uppercase tracking-wide">{entity.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{entity.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
