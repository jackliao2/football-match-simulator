import Link from "next/link"
import { SITE } from "@/lib/site"

const links = [
  { href: "/simulate", label: "Simulate" },
  { href: "/teams", label: "Teams" },
  { href: "/prime", label: "Prime" },
]

export function SiteHeader() {
  return (
    <header className="border-b-2 border-line bg-ink/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="border-2 border-gold bg-panel px-2 py-1 font-display text-[10px] text-gold">
            {SITE.shortName}
          </span>
          <span className="flex flex-col">
            <span className="font-display text-[10px] uppercase tracking-[0.18em] text-text sm:text-[11px]">
              Football Match Simulator
            </span>
            <span className="hidden text-[11px] text-muted sm:block">{SITE.tagline}</span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-2 border-transparent px-3 py-2 font-display text-[10px] uppercase tracking-[0.14em] text-muted no-underline hover:border-line hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
