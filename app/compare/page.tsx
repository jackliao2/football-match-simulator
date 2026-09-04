import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/ui/PageHeader"
import { CLUB_COMPARES } from "@/data/compare"
import { getClub } from "@/data/clubs"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Who Is Better? Clubs and Nations Compared",
  description:
    "Who is better, Barcelona or Real Madrid? Brazil or Argentina? England or Germany? Compare the all-time case, then simulate the prime teams.",
  path: "/compare",
  keywords: [
    "which football club is better",
    "who is better brazil or argentina",
    "who is better england or germany",
    "barcelona or real madrid",
    "manchester united or liverpool",
    "prime vs prime football",
  ],
})

function CompareList({
  rows,
  kicker,
}: {
  rows: Array<{ pair: (typeof CLUB_COMPARES)[number]; left: NonNullable<ReturnType<typeof getClub>>; right: NonNullable<ReturnType<typeof getClub>> }>
  kicker: string
}) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {rows.map(({ pair, left, right }) => (
        <li key={pair.slug}>
          <Link href={`/compare/${pair.slug}`} className="result-panel block p-4 no-underline hover:border-gold">
            <span className="font-display text-[8px] uppercase tracking-[0.18em] text-gold">{kicker}</span>
            <span className="mt-2 block font-brand text-lg font-semibold text-text">
              Who is better: {left.name} or {right.name}?
            </span>
            <span className="mt-1 block font-mono text-xs text-muted">{pair.verdictHeading}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function CompareIndexPage() {
  const rows = CLUB_COMPARES.flatMap((pair) => {
    const left = getClub(pair.leftClubId)
    const right = getClub(pair.rightClubId)
    return left && right ? [{ pair, left, right }] : []
  })
  const nations = rows.filter((row) => row.pair.kind === "nation")
  const clubs = rows.filter((row) => row.pair.kind !== "nation")

  return (
    <div className="grid gap-6">
      <PageHeader
        kicker="Comparisons"
        title="Who is better?"
        lead="An all-time nation is not the same as a prime squad. Each page separates those questions, then opens the two sides in the simulator."
      />
      <section className="grid gap-3">
        <h2 className="section-title">National teams</h2>
        <CompareList rows={nations} kicker="Nation debate" />
      </section>
      <section className="grid gap-3">
        <h2 className="section-title">Clubs</h2>
        <CompareList rows={clubs} kicker="Club debate" />
      </section>
    </div>
  )
}
