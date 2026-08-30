"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { track } from "@/lib/analytics"

function sectionPath(pathname: string) {
  const stripped = pathname.replace(/^\/(?:es|pt-br)(?=\/|$)/, "") || "/"
  return ["/simulate", "/teams", "/national-teams", "/vs"].includes(stripped) ? stripped : "/"
}

export function LanguageSwitcher() {
  const pathname = usePathname()
  const section = sectionPath(pathname)
  const current = pathname.startsWith("/es") ? "es" : pathname.startsWith("/pt-br") ? "pt-br" : "en"

  useEffect(() => {
    document.documentElement.lang = current === "pt-br" ? "pt-BR" : current
  }, [current])
  return (
    <div className="language-switcher" aria-label="Language">
      <span className="language-globe" aria-hidden="true">◎</span>
      {[
        ["en", section, "EN", "English"],
        ["es", `/es${section === "/" ? "" : section}`, "ES", "Español"],
        ["pt-br", `/pt-br${section === "/" ? "" : section}`, "PT", "Português"],
      ].map(([locale, href, label, name]) => (
        <Link key={locale} href={href} title={name} aria-current={current === locale ? "page" : undefined} hrefLang={locale === "pt-br" ? "pt-BR" : locale} className={current === locale ? "is-on" : ""} onClick={() => track("language_changed", { from: current, to: locale })}>{label}</Link>
      ))}
    </div>
  )
}
