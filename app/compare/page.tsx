import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/ui/PageHeader"
import { CLUB_COMPARES } from "@/data/compare"
import { getClub } from "@/data/clubs"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Which Club Is Better? — Prime vs Prime",
  description:
    "Barcelona or Real Madrid, United or Liverpool, Milan or Inter: compare the clubs, then simulate their prime teams.",
  path: "/compare",
  keywords: [
    "which football club is better",
    "barcelona or real madrid",
    "manchester united or liverpool",
    "prime vs prime football",
  ],
})

export default function CompareIndexPage() {
  const rows = CLUB_COMPARES.flatMap((pair) => {
    const left = getClub(pair.leftClubId)
    const right = getClub(pair.rightClubId)
    return left && right ? [{ pair, left, right }] : []
  })

  return (
    <div className="grid gap-6">
      <PageHeader
        kicker="Club comparisons"
        title="Which club is better?"
        lead="All-time club arguments are not the same as a prime-team matchup. Each page separates those questions, then opens the simulator."
      />
      <ul className="grid gap-2 sm:grid-cols-2">
        {rows.map(({ pair, left, right }) => (
          <li key={pair.slug}>
            <Link href={`/compare/${pair.slug}`} className="result-panel block p-4 no-underline hover:border-gold">
              <span className="font-display text-[8px] uppercase tracking-[0.18em] text-gold">Club debate</span>
              <span className="mt-2 block font-brand text-lg font-semibold text-text">
                {left.name} or {right.name}?
              </span>
              <span className="mt-1 block font-mono text-xs text-muted">{pair.verdictHeading}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
