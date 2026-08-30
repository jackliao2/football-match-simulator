import Link from "next/link"
import { SITE, absoluteUrl } from "@/lib/site"

export function EditorialByline({ date = SITE.legalUpdated }: { date?: string }) {
  return (
    <p className="editorial-byline">
      By <Link href="/about">{SITE.editorName}</Link>
      <span aria-hidden="true"> · </span>
      <span>LegendaryMatch editor</span>
      <span aria-hidden="true"> · </span>
      <time dateTime={SITE.legalUpdatedIso}>{date}</time>
    </p>
  )
}

export function personSchema() {
  return {
    "@type": "Person",
    name: SITE.editorName,
    jobTitle: "Editor",
    url: absoluteUrl("/about"),
    email: SITE.email,
    worksFor: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
  }
}
