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
  const locale = pathname.startsWith("/es") ? "es" : pathname.startsWith("/pt-br") ? "pt-br" : null
  const prefix = locale ? `/${locale}` : ""
  const labels = locale === "es"
    ? ["Simular", "Clubes", "Selecciones", "Duelos", "Prime"]
    : locale === "pt-br"
      ? ["Simular", "Clubes", "Seleções", "Duelos", "Prime"]
      : links.map((link) => link.label)
  return (
    <nav
      aria-label="Primary navigation"
      className="ml-auto flex min-w-0 flex-1 justify-start gap-0.5 overflow-x-auto overscroll-x-contain sm:justify-end sm:gap-2"
    >
      {links.map((link, index) => {
        const localizedHref = locale && link.href === "/prime" ? "/prime" : `${prefix}${link.href}`
        const active = pathname === localizedHref || pathname.startsWith(`${localizedHref}/`)
        return (
          <Link
            key={link.href}
            href={localizedHref}
            className={`border-2 px-2 py-1.5 font-display text-[8px] uppercase tracking-[0.08em] no-underline sm:px-3 sm:py-2 ${
              active
                ? "border-gold text-gold"
                : "border-transparent text-muted hover:border-line hover:text-gold"
            }`}
          >
            {labels[index]}
          </Link>
        )
      })}
    </nav>
  )
}
