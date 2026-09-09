import { compareSeoTitle, type ClubCompare } from "@/data/compare"
import { getTeam } from "@/data/teams"
import { firstSentence, teamPageCopy } from "@/lib/page-copy"
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
  const leftPeak = getTeam(pair.leftPeakId)
  const rightPeak = getTeam(pair.rightPeakId)
  const peaks =
    leftPeak && rightPeak
      ? `${leftPeak.clubName} ${leftPeak.displaySeason} against ${rightPeak.clubName} ${rightPeak.displaySeason}`
      : `${leftName} against ${rightName}`
  return {
    kicker: `${leftName} vs ${rightName}`,
    heading: pair.verdictHeading,
    subtitle: firstSentence(pair.lead),
    footer: peaks,
    alt: compareSeoTitle(pair, leftName, rightName),
  }
}
