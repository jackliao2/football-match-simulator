"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SITE } from "@/lib/site"

const links = [
  { href: "/simulate", label: "Simulate" },
  { href: "/teams", label: "Teams" },
  { href: "/national-teams", label: "Nations" },
  { href: "/vs", label: "Dreams" },
  { href: "/prime", label: "Prime" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b-2 border-line bg-ink/90">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 no-underline sm:gap-3">
          <span className="border-2 border-gold bg-panel px-2 py-1 font-display text-[9px] text-gold sm:text-[10px]">
            {SITE.shortName}
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="font-display text-[10px] uppercase tracking-[0.18em] text-text sm:text-[11px]">
              Football Match Simulator
            </span>
            <span className="hidden text-[11px] text-muted lg:block">{SITE.tagline}</span>
          </span>
        </Link>
        <nav className="flex shrink-0 gap-0.5 overflow-x-auto sm:gap-2">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-2 px-2 py-1.5 font-display text-[8px] uppercase tracking-[0.1em] no-underline sm:px-3 sm:py-2 sm:text-[10px] sm:tracking-[0.14em] ${
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
