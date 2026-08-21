import Link from "next/link"
import { SITE } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-line bg-panel">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs leading-relaxed text-muted sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-xl">{SITE.disclaimer}</p>
        <div className="flex flex-wrap gap-4 uppercase tracking-[0.12em]">
          <Link href="/simulate" className="text-muted hover:text-gold">
            Simulator
          </Link>
          <Link href="/teams" className="text-muted hover:text-gold">
            Teams
          </Link>
          <Link href="/national-teams" className="text-muted hover:text-gold">
            Nations
          </Link>
          <Link href="/vs" className="text-muted hover:text-gold">
            Dream matches
          </Link>
          <Link href="/prime" className="text-muted hover:text-gold">
            Prime
          </Link>
        </div>
      </div>
    </footer>
  )
}
