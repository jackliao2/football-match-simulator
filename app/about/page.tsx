import type { Metadata } from "next"
import Link from "next/link"
import { LegalDoc } from "@/components/ui/LegalDoc"
import { pageMetadata } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "About LegendaryMatch",
  description: "Who makes LegendaryMatch, why the independent football simulator exists, what is editorial judgement and how to report a squad error.",
  path: "/about",
})

export default function AboutPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "AboutPage", name: "About LegendaryMatch", url: absoluteUrl("/about"),
      mainEntity: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/"), email: SITE.email },
    }) }} />
    <LegalDoc kicker="The project" title="About LegendaryMatch" lead="A football time machine built for one question: what happens when the teams in two different memories have to share a pitch?" updated={SITE.legalUpdated}>
      <section>
        <h2>Why this site exists</h2>
        <p>Football arguments usually collapse into clips, trophy counts or the age of the person making the argument. LegendaryMatch gives the debate a playable form. Choose two named seasons, inspect the actual squad choices and run one possible match. The result is not history rewritten; it is a transparent way to test the assumptions behind the argument.</p>
        <p>The catalogue is intentionally selective. It favours sides with a real football story: champions, tactical landmarks, cult teams and recent squads people genuinely want to put against the past. We would rather explain 100 teams properly than publish thousands of empty badge pages.</p>
      </section>
      <section>
        <h2>Independent, fan-made and editorial</h2>
        <p>LegendaryMatch is an independent project. It is not affiliated with FIFA, UEFA, a league, a club, a federation, a player, EA Sports or any ratings provider. Club and player names identify the historical subjects being discussed. The crests are original pixel-style representations rather than official club artwork.</p>
        <p>Squad selection, formations, tactical labels and ratings involve editorial judgement. A season rarely has one permanent starting eleven, and players cannot be reduced perfectly to a number. The site shows its choices so readers can disagree with something specific instead of treating the model as an unnamed authority.</p>
      </section>
      <section>
        <h2>What is written by us and what AI does</h2>
        <p>The team database, page structure, ratings framework, matchup selection and core simulation rules belong to the project. Expert AI Analysis is optional. When requested, a language model receives structured football information and turns it into a tactical report. It does not choose the score and it does not silently write the permanent historical pages.</p>
        <p>That distinction matters: the score engine remains reproducible from its seed, while AI prose can vary. The full separation is described on the <Link href="/methodology">methodology page</Link>.</p>
      </section>
      <section>
        <h2>Corrections are part of the work</h2>
        <p>A player may be missing, a preferred XI may be debatable or a recent squad may have moved since the dataset was prepared. Send the club or country, season, disputed detail and a reliable source to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Clear factual corrections are separated from rating disagreements; both are read, but they are not the same kind of change.</p>
        <p>For legal, privacy and press questions, use the same address or visit the <Link href="/contact">contact page</Link>.</p>
      </section>
    </LegalDoc>
  </>
}
