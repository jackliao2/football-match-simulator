import { compareSeoTitle, type ClubCompare } from "@/data/compare"
import { teamPageCopy } from "@/lib/page-copy"
import type { HistoricalTeam } from "@/types"

export function teamOgCopy(team: HistoricalTeam) {
  const copy = teamPageCopy(team)
  return {
    kicker: `[ ${team.clubCode} ]`,
    heading: `${team.clubName} ${team.displaySeason}`,
    subtitle: copy.title,
    alt: copy.title,
  }
}

export function compareOgCopy(pair: ClubCompare, leftName: string, rightName: string) {
  return {
    kicker: "WHO IS BETTER",
    heading: pair.verdictHeading,
    subtitle: `${leftName} vs ${rightName}`,
    alt: compareSeoTitle(pair, leftName, rightName),
  }
}
