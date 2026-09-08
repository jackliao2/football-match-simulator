import { MatchSetup } from "@/components/simulator/MatchSetup"
import { TEAM_CATALOG, toSimulatorTeam } from "@/data/team-catalog"
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
  return (
    <MatchSetup
      catalog={TEAM_CATALOG}
      initialSquads={initialSquads}
      defaultHome={defaultHome}
      defaultAway={defaultAway}
      locale={locale}
      restoreLast={restoreLast}
    />
  )
}
