import Link from "next/link"
import type { ReactNode } from "react"
import { PageHeader } from "@/components/ui/PageHeader"

export function LegalDoc({
  kicker,
  title,
  lead,
  updated,
  children,
}: {
  kicker: string
  title: string
  lead: string
  updated: string
  children: ReactNode
}) {
  return (
    <article className="legal-doc">
      <PageHeader kicker={kicker} title={title} lead={lead} />
      <p className="legal-updated">Last updated {updated}</p>
      <div className="legal-body">{children}</div>
      <nav className="legal-siblings" aria-label="Site policies">
        <Link href="/about">About</Link>
        <Link href="/methodology">Methodology</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </article>
  )
}
