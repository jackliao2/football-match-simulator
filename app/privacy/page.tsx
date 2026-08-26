import type { Metadata } from "next"
import { LegalDoc } from "@/components/ui/LegalDoc"
import { pageMetadata } from "@/lib/seo"
import { SITE } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "What LegendaryMatch actually collects: host logs, email you send us, and optional match commentary. No accounts, no newsletter list.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <LegalDoc
      kicker="Legal"
      title="Privacy"
      lead="There is no login and nothing to buy. This page is about the little that still exists when you open a football simulator in a browser."
      updated={SITE.legalUpdated}
    >
      <section>
        <h2>Who we are</h2>
        <p>
          LegendaryMatch is an independent football match simulator, not a club, not a federation,
          not a company with a marble lobby. Privacy questions go to the same place as squad
          corrections: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. If you need a named
          controller for a rights request, that mailbox is it. We do not list a street address here
          because we are not running a shop front.
        </p>
      </section>

      <section>
        <h2>What this site does not ask for</h2>
        <p>
          No account, so no password, display name or “favourite club” stored against you. No
          payments, so no card numbers. No newsletter, so no marketing list to sell. We do not want
          your date of birth, your address book, or precise GPS. You can simulate Barcelona 2009
          against Real Madrid 2017 without typing a personal fact.
        </p>
      </section>

      <section>
        <h2>What still happens in a browser</h2>
        <p>
          The app is hosted on Vercel. Any web host writes ordinary request logs: IP address, user
          agent, the URL you hit, a timestamp. That is how they bill, debug and stop abuse. We do
          not sit each evening building a dossier of “the person who always picks 2004 Arsenal.” We
          also cannot promise those logs vanish the second you close the tab; they follow the host’s
          retention, which is measured in weeks or months, not forever-and-a-day marketing storage.
        </p>
        <p>
          Cookies: we are not running an ad network on this page. The simulator does not need a
          tracking cookie to play a match. If the host or the browser sets a technical cookie to
          serve the site, that is plumbing. There is no cookie wall because we are not stuffing
          fifteen pixels into the footer.
        </p>
      </section>

      <section>
        <h2>Analytics, if any</h2>
        <p>
          The code has a small <code>track()</code> helper. It will push events such as “match
          simulated” or “team selected” into <code>dataLayer</code>, and it will call{" "}
          <code>gtag</code> if that function already exists on the page. If no analytics tag is
          loaded, those calls do not go to Google or anyone else. We are not quietly shipping a
          measurement ID in the layout today. If that changes, this page’s date will move, and if
          the law where you live needs a banner for that tag, we will put one up rather than
          pretending a football site is exempt.
        </p>
      </section>

      <section>
        <h2>Match links are not private lockers</h2>
        <p>
          A simulated match lives at a URL that encodes the two sides and the seed. Anyone with that
          link can open the same scoreline. That is sharing, not encryption. Do not paste a match
          URL somewhere you would not want the score seen. We do not treat that URL as an account
          or as a message to us.
        </p>
      </section>

      <section>
        <h2>Optional AI commentary</h2>
        <p>
          Match result is decided by the local engine. If you ask for a written report or pre-match
          note, the server may send the squad names, the score and the event list to an AI provider
          (an OpenAI-compatible endpoint — currently configured toward xAI unless we point it
          somewhere else). That payload is football: lineups and what happened on the pitch in the
          simulation. It is not your name, email or IP packaged as a prompt. Still, it leaves our
          host and sits with that provider under their own terms. Do not put personal stories into
          a match you then ask the model to narrate; there is nowhere in the UI to type them
          anyway.
        </p>
        <p>
          If the AI keys are missing, commentary simply fails and the score is still there. The
          language model does not pick winners. Details of that split are on the{" "}
          <a href="/terms">terms page</a>.
        </p>
      </section>

      <section>
        <h2>Email you send us</h2>
        <p>
          Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we receive whatever you put
          in the From field and the body. That is how mail works. We keep a thread while it is
          useful — a wrong XI, a takedown, a privacy ask — then we delete it. Do not send passwords.
          There is nothing here to log into. If you attach a spreadsheet of 400 players, we may
          still open it for the correction and then we should not keep the file hanging around.
        </p>
      </section>

      <section>
        <h2>Squad data is not “your” data</h2>
        <p>
          Player names, clubs, seasons and ratings are football history plus our editorial numbers
          for the simulator. They are not a personal profile of a visitor. If you are a player in
          the database and something is factually wrong, email the season and the mistake. We will
          look. We do not claim a UEFA-grade statistical licence; we claim a playable XI.
        </p>
      </section>

      <section>
        <h2>Legal bases, rights, children</h2>
        <p>
          If GDPR or UK GDPR applies to you: answering the HTTP request you made is why logs exist
          at all. Email exists because you sent it. Analytics, if we ever load a tag, would be
          either a legitimate interest in seeing which squad pages are used, or consent if we ship
          something that needs a banner — we will not hide that distinction behind a slogan.
        </p>
        <p>
          You can ask what we have, ask for a copy, ask us to delete a mail thread, or object. For
          this site that usually means “delete this conversation” or “did anything beyond host logs
          attach to me?” Write to {SITE.email} with enough of the original message that we can find
          it. We cannot un-simulate a public match URL, and we cannot edit Vercel’s raw logs by
          hand the way a big CRM would.
        </p>
        <p>
          We do not sell personal information. There is no commercial data product. The simulator is
          about old football, not a social network for children; we do not aim it at small kids and
          we do not try to collect a child’s details. A parent who emails us gets the thread deleted
          if that is what they want.
        </p>
      </section>

      <section>
        <h2>Processors and where bits sit</h2>
        <p>
          Vercel hosts the Next.js app. DNS and the inbox for {SITE.domain} sit with whoever the
          domain is pointed at. Your mail also passes through your provider and ours. AI commentary,
          when you request it, goes to that API vendor. Hosts move data between the US and the EU
          depending on how the project is set up; that is the tradeoff of running a small site on
          someone else’s platform rather than a rack in a cupboard.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If the setup changes — a real analytics tag, a different host, a contact form we do not
          have today — the date at the top of this page moves. We will not pretend we mailed you.
          Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. The{" "}
          <a href="/contact">contact page</a> is the same address with more on what to put in the
          subject line.
        </p>
      </section>
    </LegalDoc>
  )
}
