"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/simulate", label: "Simulate" },
  { href: "/teams", label: "Teams" },
  { href: "/national-teams", label: "Nations" },
  { href: "/vs", label: "Dreams" },
  { href: "/prime", label: "Prime" },
]

export function SiteNav() {
  const pathname = usePathname()
  return (
    <nav className="flex shrink-0 gap-0.5 overflow-x-auto sm:gap-2">
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`border-2 px-2 py-1.5 font-display text-[8px] uppercase tracking-[0.08em] no-underline sm:px-3 sm:py-2 ${
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
  )
}
