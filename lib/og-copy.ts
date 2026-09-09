import { compareSeoTitle, type ClubCompare } from "@/data/compare"
import { teamPageCopy } from "@/lib/page-copy"
import type { HistoricalTeam } from "@/types"

export function teamOgCopy(team: HistoricalTeam) {
  const copy = teamPageCopy(team)
  return {
    kicker: `[ ${team.clubCode} ]`,
    heading: copy.title,
    subtitle: copy.deck,
    alt: copy.title,
  }
}

export function compareOgCopy(pair: ClubCompare, leftName: string, rightName: string) {
  return {
    kicker: "WHO IS BETTER",
    heading: pair.verdictHeading,
    subtitle: `${leftName} vs ${rightName}`,
    footer: `Simulate ${leftName} against ${rightName}`,
    alt: compareSeoTitle(pair, leftName, rightName),
  }
}
