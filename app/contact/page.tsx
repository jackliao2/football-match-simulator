import type { Metadata } from "next"
import { LegalDoc } from "@/components/ui/LegalDoc"
import { pageMetadata } from "@/lib/seo"
import { SITE, absoluteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Email LegendaryMatch at ${SITE.email}. Squad errors, missing teams, legal and press — that inbox is the lot.`,
  path: "/contact",
})

export default function ContactPage() {
  const mail = `mailto:${SITE.email}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact LegendaryMatch",
            url: absoluteUrl("/contact"),
            mainEntity: {
              "@type": "Organization",
              name: SITE.name,
              url: absoluteUrl("/"),
              email: SITE.email,
            },
          }),
        }}
      />
      <LegalDoc
        kicker="Site"
        title="Contact"
        lead="One address. No ticket form, no chatbot, no phone."
        updated={SITE.legalUpdated}
      >
        <section>
          <p className="legal-mail">
            <a href={mail}>{SITE.email}</a>
          </p>
          <p>
            That is the inbox for LegendaryMatch. Corrections, legal mail, press, a team you want in
            the catalogue — it all lands there. If you came looking for a contact form, there isn’t
            one. Forms on a site this size mostly collect spam.
          </p>
        </section>

        <section>
          <h2>Put the subject in English a human can sort</h2>
          <p>A few words at the top of the mail saves it from looking like noise:</p>
          <ul>
            <li>
              <strong>Squad error</strong> — club, season, who is in the XI who should not be, or who
              is missing. “Barça 2008/09, Yaya should start, Hleb is the 12” is usable. “ratings r
              wrong” is not.
            </li>
            <li>
              <strong>Missing team</strong> — name the side and the year. We will not promise to
              build Nottingham Forest 1979 by Friday, but we do read the request.
            </li>
            <li>
              <strong>Legal / privacy / takedown</strong> — say which page, and what you want done.
              If you represent a club or a player, say so.
            </li>
            <li>
              <strong>Press</strong> — a deadline helps. A vague “can we collab” with no URL usually
              waits.
            </li>
          </ul>
        </section>

        <section>
          <h2>What this inbox will not do</h2>
          <p>
            We will not raise your five-a-side to 99 overall. We will not build a private betting
            model, tip a real fixture, or walk someone through copying the engine. Dream-match
            arguments are settled in the simulator, not by us picking a winner over email.
          </p>
          <p>
            Same scoreline twice means you reused the seed. That is a feature. If you want another
            match, simulate again.
          </p>
        </section>

        <section>
          <h2>How slow we are</h2>
          <p>
            Replies happen when someone is actually at the desk. A few days is normal. Around a
            World Cup or a big deploy it can be longer. If you hear nothing, send the same mail once
            more after a week. Five follow-ups in an afternoon do not move the queue.
          </p>
          <p>
            {SITE.disclaimer} More on how the simulator is meant to be used sits in the{" "}
            <a href="/terms">terms</a>. What we log — which is not much — is on the{" "}
            <a href="/privacy">privacy</a> page.
          </p>
        </section>
      </LegalDoc>
    </>
  )
}
