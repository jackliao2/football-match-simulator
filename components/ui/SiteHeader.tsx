import { SiteLogo } from "@/components/ui/SiteLogo"
import { SiteNav } from "@/components/ui/SiteNav"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"

export function SiteHeader() {
  return (
    <header className="border-b-2 border-line bg-ink/90">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-3 px-3 py-1.5 sm:gap-4 sm:px-4 sm:py-2">
        <SiteLogo />
        <SiteNav />
        <LanguageSwitcher />
      </div>
    </header>
  )
}
