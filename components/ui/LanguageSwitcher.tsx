"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

function sectionPath(pathname: string) {
  const stripped = pathname.replace(/^\/(?:es|pt-br)(?=\/|$)/, "") || "/"
  return ["/simulate", "/teams", "/national-teams", "/vs"].includes(stripped) ? stripped : "/"
}

export function LanguageSwitcher() {
  const pathname = usePathname()
  const section = sectionPath(pathname)
  const current = pathname.startsWith("/es") ? "es" : pathname.startsWith("/pt-br") ? "pt-br" : "en"
  return (
    <div className="flex shrink-0 items-center gap-1 border-l border-line pl-2 font-mono text-[9px]" aria-label="Language">
      {[
        ["en", section, "EN"],
        ["es", `/es${section === "/" ? "" : section}`, "ES"],
        ["pt-br", `/pt-br${section === "/" ? "" : section}`, "PT"],
      ].map(([locale, href, label]) => (
        <Link key={locale} href={href} hrefLang={locale === "pt-br" ? "pt-BR" : locale} className={current === locale ? "text-gold" : "text-muted hover:text-text"}>{label}</Link>
      ))}
    </div>
  )
}
