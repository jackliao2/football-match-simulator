import type { Metadata } from "next"
import { LegalDoc } from "@/components/ui/LegalDoc"
import { pageMetadata } from "@/lib/seo"
import { SITE } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "How LegendaryMatch works, what the simulations are, and the rules for using the football match simulator.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <LegalDoc
      kicker="Legal"
      title="Terms of use"
      lead="This is the football match simulator at LegendaryMatch, written out in plain language. If you run a match here, this page applies."
      updated={SITE.legalUpdated}
    >
      <section>
        <h2>What you are using</h2>
        <p>
          LegendaryMatch is a browser tool. You pick two squads from the catalogue — Barcelona
          2008/09, Brazil 1970, a 2025/26 club side, a 2026 national team, whoever we have built —
          and a model plays a match. You get a score, scorers, xG, a timeline of events, and, if you
          ask for it, a hundred-run table of who tends to win. Same two teams and the same seed
          replay the same match. Change the seed and you get a different one. That is the whole
          product.
        </p>
        <p>
          The site lives at {SITE.domain} and on the Vercel URL we still use while DNS catches up.
          Same terms on both. There is no app store listing, no paid tier, and no account to create.
        </p>
      </section>

      <section>
        <h2>This is not an official game</h2>
        <p>
          We are not FIFA, UEFA, a league, a club, or a licensed FIFA-style product. The pixel marks
          are drawings we made so the page has a crest-shaped thing to look at. They are not official
          badges. Club names, famous XIs and tournament history belong to the clubs, the federations
          and the public record. We use them the way a newspaper uses them: to talk about sides that
          actually existed.
        </p>
        <p>
          A simulated 3–1 is not a claim that one era “beats” another in real life. Ratings are
          era-relative on purpose. A 95 in 1970 means they were enormous in 1970, not that they would
          outrun a 2026 full-back over 30 metres. If you came here to settle a pub argument, treat
          the result as a model output, not a tribunal.
        </p>
      </section>

      <section>
        <h2>What you may do</h2>
        <p>
          Use the simulator, open squad pages, share a match link, quote a score with a link back.
          That is what the share URLs are for. Linking to a dream-match page is fine. Scraping the
          whole catalogue into a competing product, wrapping our pages so it looks like you built the
          engine, or hammering the server until it falls over is not.
        </p>
        <p>
          Squads get edited when we catch a wrong XI, a missing trophy, or a season that should not
          have been there. We can add or drop a team without asking. The catalogue is not a promise
          that every club you remember from 1987 will appear next week.
        </p>
      </section>

      <section>
        <h2>No accounts, no bets, no shop</h2>
        <p>
          There is nothing to log into. The match URL is the save file: sides plus seed. Lose the
          link and you have lost that particular replay, not a profile on our side, because we do not
          keep one. We do not take payments. We do not sell shirts. We do not run a book.
        </p>
        <p>
          Do not use these scores for gambling, fantasy payouts, or anything you would be annoyed to
          lose money on. The model is entertainment. If you still put a stake on a 2004 Arsenal
          replay, that is your evening, not our liability.
        </p>
        <p>
          The site may display advertising, including Google AdSense, so that LegendaryMatch can stay
          free. Ads are separate from the simulation. They do not change a score, a rating or a
          who-would-win percentage. Cookie and consent details sit on the{" "}
          <a href="/privacy">privacy page</a>.
        </p>
      </section>

      <section>
        <h2>The engine and the optional prose</h2>
        <p>
          The result comes from ratings, team style and chance. Optional match report / pre-match
          notes are generated text about a match the engine already played, or about two squads you
          already picked. The language model does not choose the winner. If a sentence is clumsy or a
          nickname is off, the score still stands as the engine’s score.
        </p>
        <p>
          Hover stats (PAC, SHO, PAS and the rest) are our editorial numbers for this simulator, not
          a licensed dump from a video game. Disagreeing with a 88 versus an 86 is part of football.
          Email a factual XI error if you have one; a taste argument about Gerrard’s 2005 rating is
          less likely to move the number.
        </p>
      </section>

      <section>
        <h2>Availability and “as is”</h2>
        <p>
          Pages will break. Deploys go wrong. A host blip takes the site down on a Sunday night when
          you needed Brazil 1970. We fix what we can. There is no uptime contract and no compensation
          for an argument you could not settle.
        </p>
        <p>
          The site is provided as-is. To the extent the law allows, we are not liable for lost
          debates, ratings you hate, or bets you should not have placed. If one sentence on this page
          cannot be enforced where you live, the rest still can.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          Layout, pixel marks, simulation code and original copy are ours or used under licence
          (fonts, hosting). Do not copy the squad database wholesale. Do not lift the engine. A
          screenshot of a result with a credit is ordinary internet behaviour. Passing the project
          off as yours is not.
        </p>
        <p>
          If you represent a club or a rights holder and you want something changed, write to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with enough detail to find the page. We
          read that mail. We will not pretend a pixel drawing is an official crest, and we will not
          pretend this simulator is licensed merchandise.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If these terms change, the date at the top moves. There is no account, so there is no
          email. Keep using the site after that and the new page is the agreement. The{" "}
          <a href="/privacy">privacy page</a> covers logs, email, analytics, advertising and optional commentary.{" "}
          <a href="/contact">Contact</a> is the same address as everything else.
        </p>
      </section>
    </LegalDoc>
  )
}
