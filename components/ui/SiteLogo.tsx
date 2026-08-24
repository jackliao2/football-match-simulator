import Link from "next/link"
import { BrandMark } from "@/components/ui/BrandMark"
import { SITE } from "@/lib/site"

export function SiteLogo() {
  return (
    <Link href="/" className="site-logo" aria-label={SITE.name}>
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
