import Link from "next/link"
import { BrandMark } from "@/components/ui/BrandMark"
import { SITE } from "@/lib/site"

export function SiteLogo() {
  return (
    <Link href="/" className="site-logo" aria-label={SITE.name}>
      <BrandMark size={32} />
      <span className="site-wordmark">
        <span className="site-word-kicker">Legendary</span>
        <span className="site-word-name">Match</span>
      </span>
    </Link>
  )
}
