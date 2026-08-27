"use client"

import Link from "next/link"
import { BrandMark } from "@/components/ui/BrandMark"
import { SITE } from "@/lib/site"
import { usePathname } from "next/navigation"

export function SiteLogo() {
  const pathname = usePathname()
  const href = pathname.startsWith("/es") ? "/es" : pathname.startsWith("/pt-br") ? "/pt-br" : "/"
  return (
    <Link href={href} className="site-logo" aria-label={SITE.name}>
      <span className="site-lockup">
        <BrandMark size={32} />
        <span className="site-lockup-text">
          <span className="site-lockup-kicker">Legendary</span>
          <span className="site-lockup-rule" aria-hidden="true" />
          <span className="site-lockup-name">Match</span>
        </span>
      </span>
    </Link>
  )
}
