import { MatchSetup } from "@/components/simulator/MatchSetup"
import { TEAM_CATALOG, toPlayableCatalog, toSimulatorTeam } from "@/data/team-catalog"
import { getTeam } from "@/data/teams"
import type { Locale } from "@/lib/i18n"

export function MatchSetupGate({
  defaultHome,
  defaultAway,
  locale,
  restoreLast = false,
}: {
  defaultHome?: string
  defaultAway?: string
  locale?: Locale
  restoreLast?: boolean
}) {
  const home = defaultHome ? getTeam(defaultHome) : undefined
  const away = defaultAway ? getTeam(defaultAway) : undefined
  const initialSquads = [home, away].filter((team): team is NonNullable<typeof team> => Boolean(team)).map(toSimulatorTeam)
  const catalog = TEAM_CATALOG.map(toPlayableCatalog)
  return (
    <MatchSetup
      catalog={catalog}
      initialSquads={initialSquads}
      defaultHome={defaultHome}
      defaultAway={defaultAway}
      locale={locale}
      restoreLast={restoreLast}
    />
  )
}
