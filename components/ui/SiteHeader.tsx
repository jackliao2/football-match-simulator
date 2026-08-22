"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SITE } from "@/lib/site"

const links = [
  { href: "/simulate", label: "Simulate" },
  { href: "/teams", label: "Teams" },
  { href: "/national-teams", label: "Nations" },
  { href: "/prime", label: "Prime" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b-2 border-line bg-ink/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
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
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-2 px-3 py-2 font-display text-[10px] uppercase tracking-[0.14em] no-underline ${
                  active
                    ? "border-gold text-gold"
                    : "border-transparent text-muted hover:border-line hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
