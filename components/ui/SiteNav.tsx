"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { VS_HUB } from "@/data/collection-copy"

const links = [
  { href: "/simulate", label: "Simulate", localize: true },
  { href: "/teams", label: "Teams", localize: true },
  { href: "/national-teams", label: "Nations", localize: true },
  { href: "/search", label: "Search", localize: true },
  { href: "/compare", label: "Compare", localize: false },
  { href: "/vs", label: VS_HUB.crumb, localize: true },
  { href: "/prime", label: "Prime", localize: false },
  { href: "/best-football-team-ever", label: "Best", localize: false },
]

export function SiteNav() {
  const pathname = usePathname()
  const locale = pathname.startsWith("/es") ? "es" : pathname.startsWith("/pt-br") ? "pt-br" : null
  const prefix = locale ? `/${locale}` : ""
  const labels = locale === "es"
    ? ["Simular", "Clubes", "Selecciones", "Buscar", "Comparar", "Duelos", "Prime", "Mejor"]
    : locale === "pt-br"
      ? ["Simular", "Clubes", "Seleções", "Buscar", "Comparar", "Duelos", "Prime", "Melhor"]
      : links.map((link) => link.label)
  return (
    <nav
      aria-label="Primary navigation"
      className="ml-auto flex min-w-0 flex-1 justify-start gap-0.5 overflow-x-auto overscroll-x-contain sm:justify-end sm:gap-2"
    >
      {links.map((link, index) => {
        const englishOnly = !link.localize
        const localizedHref = locale && englishOnly ? link.href : `${prefix}${link.href}`
        const active = pathname === localizedHref || pathname.startsWith(`${localizedHref}/`)
        return (
          <Link
            key={link.href}
            href={localizedHref}
            className={`inline-flex min-h-11 items-center border-2 px-2 py-2 font-display text-[8px] uppercase tracking-[0.08em] no-underline sm:px-3 sm:py-2.5 ${
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
