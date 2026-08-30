import type { Metadata } from "next"
import Link from "next/link"
import { LegalDoc } from "@/components/ui/LegalDoc"
import { EditorialByline, personSchema } from "@/components/ui/EditorialByline"
import { StyleProfile } from "@/components/teams/StyleProfile"
import { pageMetadata } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"
import { getTeam } from "@/data/teams"
import { cachedMatchupModel } from "@/lib/matchup-model"

export const metadata: Metadata = pageMetadata({
  title: "Football Simulator Methodology",
  description: "How LegendaryMatch selects historical squads, rates players and teams, simulates matches and separates the score engine from optional AI analysis.",
  path: "/methodology",
})

export default function MethodologyPage() {
  const barcelona = getTeam("barcelona-2010-11")
  const madrid = getTeam("real-madrid-2016-17")
  const sample = barcelona && madrid ? cachedMatchupModel(barcelona, madrid, 400, "methodology") : null

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "TechArticle", headline: "LegendaryMatch simulation methodology", url: absoluteUrl("/methodology"),
      author: personSchema(), datePublished: SITE.legalUpdatedIso, dateModified: SITE.legalUpdatedIso,
    }) }} />
    <LegalDoc kicker="How it works" title="Simulation methodology" lead="The model is opinionated, repeatable and deliberately visible. These are the choices behind the score rather than a claim that football can be solved." updated={SITE.legalUpdated}>
      <EditorialByline />
      <section>
        <h2>1. A team means a named season</h2>
        <p>“Barcelona” is too vague for a historical simulation. The 2008/09 treble side, the 2010/11 Wembley side and the 2014/15 MSN side had different personnel and different ways of controlling a match. Every entry therefore belongs to a specific season or tournament cycle, with a manager, representative formation, starting XI and bench.</p>
        <p>The XI is a best-fit representation of that campaign, not a claim that the same players started every fixture. Injuries, rotation and tactical changes are compressed into one playable version. Current squads are snapshots, not live feeds.</p>
      </section>
      <section>
        <h2>2. Ratings are era-relative</h2>
        <p>Player and team ratings compare how dominant and effective someone was in their own football environment. They are not raw speed tests across decades. Pelé is not penalised because 1970 training data is thinner, and a modern defender does not automatically outrank Baresi because sports science changed.</p>
        <p>The team model separates attack, midfield, defence, goalkeeping and chemistry. Tactical tendencies add possession, pressing, tempo, counter-attacking, width and aerial threat. Those dimensions stop two teams with the same overall rating from behaving identically.</p>
      </section>
      <section>
        <h2>3. One simulation is one possible night</h2>
        <p>The engine combines team strength, player roles and tactical tendencies with a seeded random process. The seed makes a shared match reproducible: open the same match link and the score and events remain the same. Simulate again and a new seed represents another possible night.</p>
        <p>Goals, chances, possession, shots and individual events are related rather than written independently. That does not make them observed statistics. They are internally consistent outputs from the model.</p>
      </section>
      <section>
        <h2>4. Multi-match percentages describe uncertainty</h2>
        <p>Dream Match pages run the matchup many times and report the distribution of home wins, draws, away wins and common scorelines. A 55% win rate does not mean a side “definitely wins”; it means that side won 55 of every 100 comparable model runs on average.</p>
        <p>This is more useful than presenting a single score as certainty, especially when elite teams are close. It is still a simulation, not a betting market, a forecast of a scheduled fixture or evidence that one era was objectively superior.</p>
      </section>
      <section>
        <h2>5. Expert AI explains; it does not decide</h2>
        <p>Expert AI Analysis receives the selected squads and structured model output, then writes a compact tactical interpretation. The language model cannot replace the score after seeing famous names. It can describe a key battle, identify likely scorers across repeated runs and explain why the engine leans one way.</p>
        <p>AI wording can occasionally be too confident or miss football context. Treat it as commentary on the model. Permanent squad pages and editorial Dream Match introductions are maintained separately.</p>
      </section>
      <section>
        <h2>6. Limitations and corrections</h2>
        <p>No model captures refereeing, weather, travel, pitch quality, a player carrying an injury, or the psychological meaning of a final. Historical footage and squad records are also uneven. Ratings will always contain judgement, especially across eras and positions.</p>
        <p>If a factual squad detail is wrong, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with the page and source. If you disagree with a rating, explain the comparison you think fails. The <Link href="/about">about page</Link> explains the project’s editorial boundaries.</p>
      </section>
      <section>
        <h2>7. How a chance is priced</h2>
        <p>Expected goals for a side start from a base rate of 1.36, then move with offensive strength versus defensive strength, a home bump of 5.5%, a tactical modifier, and an overall-quality gap. The quality gap is exponential: close elite teams stay close, but a ten-point underdog is not treated as a coin flip. Each match still draws noise, then the result is clamped between 0.25 and 3.8 xG so a simulation cannot invent a 7–6 as the typical night.</p>
        <p>Possession is a separate draw from possession ratings, midfield ratings and chemistry — not a restatement of xG. That is why a side can “win the ball” in the model and still lose the match. The two numbers are related, not identical.</p>
      </section>
      <section>
        <h2>8. A worked example: Barcelona 2010/11 vs Madrid 2016/17</h2>
        <p>This is the same 400-run sample the dream-match page uses, written out so the method is inspectable. Barcelona are the possession/pressing side; Madrid are the transition side. The engine is not asked who was “better in history”. It is asked what happens if those two rating sheets share a pitch 400 times with a fixed seed prefix.</p>
        {sample && barcelona && madrid ? (
          <div className="mt-4 grid gap-4">
            <p>
              Across {sample.runs} matches the model gave Barcelona {sample.homeWinPct}% wins, Madrid {sample.awayWinPct}% and {sample.drawPct}% draws.
              The most common score was {sample.mostCommonScore.replace("-", "–")}. Average goals landed {sample.avgHomeGoals}–{sample.avgAwayGoals}, with average xG {sample.avgHomeXg}–{sample.avgAwayXg}.
              Those percentages will not match a single memorable Clásico, because this pairing never happened.
            </p>
            <div className="grid gap-3 lg:grid-cols-2">
              <StyleProfile team={barcelona} />
              <StyleProfile team={madrid} />
            </div>
            <p>
              Read the radar as intention, not as a guaranteed share of the ball. If a run gives Madrid a win with less possession, that is the 2016/17 idea working. If Barcelona win 3–0 with 62% of the ball, that is the 2010/11 idea working. The distribution is the claim; a single score is one night.
            </p>
          </div>
        ) : null}
        <p>The full pairing, with the long-read argument, lives on the <Link href="/vs/barcelona-2010-11-vs-real-madrid-2016-17">Barcelona 2010/11 vs Real Madrid 2016/17</Link> page.</p>
      </section>
    </LegalDoc>
  </>
}
