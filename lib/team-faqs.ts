import type { TeamEditorial } from "@/data/team-editorial"
import { matchupFeature, writtenMatchupEditorial } from "@/data/vs-editorial"
import { firstSentence } from "@/lib/page-copy"
import { informalSeason, isCurrentSquad, modelledCurrentSquadNote } from "@/lib/seo"
import { teamStars } from "@/lib/stars"
import type { HistoricalTeam, MonteCarloResult } from "@/types"

export type TeamFaq = { q: string; a: string }

function nameList(team: HistoricalTeam, count = 3): string {
  const names = teamStars(team, count).map((player) => player.name)
  if (names.length === 0) return team.manager
  if (names.length === 1) return names[0]!
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names[0]}, ${names[1]} and ${names[2]}`
}

export function teamFaqs(
  team: HistoricalTeam,
  opts: {
    opponent?: HistoricalTeam
    model?: MonteCarloResult | null
    editorial?: TeamEditorial
    runs: number
  },
): TeamFaq[] {
  const { opponent, model, editorial, runs } = opts
  const stars = nameList(team)
  const hook = firstSentence(editorial?.intro ?? team.summary)
  const current = isCurrentSquad(team)
  const shortSeason = informalSeason(team)
  const faqs: TeamFaq[] = []

  if (current) {
    faqs.push({
      q: `Is this the official ${team.clubName} ${team.displaySeason} lineup?`,
      a: `${modelledCurrentSquadNote(team)} ${stars} are the highest-rated names under ${team.manager}.`,
    })
  } else {
    faqs.push({
      q: `What was the ${team.clubName} ${team.displaySeason} squad?`,
      a: `${hook} ${stars} are the names people mean for ${team.clubName} ${team.displaySeason}.`,
    })
  }

  if (shortSeason && !current) {
    faqs.push({
      q: `Is this the ${team.clubName} ${shortSeason} squad?`,
      a: `Yes — ${team.clubName} ${shortSeason} searches usually mean this ${team.displaySeason} side: ${stars} under ${team.manager}, not a later rebuild.`,
    })
  }

  if (opponent && model) {
    const written = writtenMatchupEditorial(team, opponent)
    const matchup = written
      ? firstSentence(written)
      : `${stars} against ${nameList(opponent)} — ${team.manager}'s ${team.displaySeason} versus ${opponent.manager}'s ${opponent.displaySeason}.`
    faqs.push({
      q: `Who would win between ${team.clubName} ${team.displaySeason} and ${opponent.clubName} ${opponent.displaySeason}?`,
      a: `${matchup} In ${runs} seeded runs of ${team.clubName} ${team.displaySeason} against ${opponent.clubName} ${opponent.displaySeason}, ${team.clubName} won ${model.homeWinPct}%, ${opponent.clubName} won ${model.awayWinPct}%, and ${model.drawPct}% finished level. The most common score was ${model.mostCommonScore.replace("-", "–")}. Not a real fixture and not betting advice.`,
    })
  }

  const trophy = team.trophies[0]?.label
  const feat = team.achievements[0]
  if (current) {
    faqs.push({
      q: `Who starts for ${team.clubName} ${team.displaySeason} in the simulator?`,
      a: `${team.manager}'s ${team.displaySeason} ${team.clubName} is led by ${stars}. Era-relative ratings, not a live FIFA card.`,
    })
  } else {
    faqs.push({
      q: `What formation did ${team.clubName} ${team.displaySeason} play?`,
      a: `${team.manager} used a ${team.formation}. ${feat ? `${feat}. ` : ""}${trophy ? `${trophy} that season. ` : ""}${stars} as the spine of that ${team.displaySeason} side.`,
    })
  }

  return faqs
}

export function vsFaqs(home: HistoricalTeam, away: HistoricalTeam, model: MonteCarloResult, runs: number): TeamFaq[] {
  const written = writtenMatchupEditorial(home, away)
  const feature = matchupFeature(home, away)
  const hook = written
    ? firstSentence(written)
    : `${nameList(home)} against ${nameList(away)} — ${home.manager}'s ${home.displaySeason} versus ${away.manager}'s ${away.displaySeason}.`
  const faqs: TeamFaq[] = [
    {
      q: `Who would win between ${home.clubName} ${home.displaySeason} and ${away.clubName} ${away.displaySeason}?`,
      a: `${hook} Across ${runs} seeded runs of ${home.clubName} ${home.displaySeason} against ${away.clubName} ${away.displaySeason}, ${home.clubName} won ${model.homeWinPct}%, ${away.clubName} won ${model.awayWinPct}%, and ${model.drawPct}% finished level. The most common score was ${model.mostCommonScore.replace("-", "–")}. Modelled hypothetical, not a real fixture.`,
    },
    {
      q: `What score does the model pick for ${home.clubName} vs ${away.clubName}?`,
      a: `There is no single official score. Across ${runs} runs of ${home.clubName} ${home.displaySeason} against ${away.clubName} ${away.displaySeason} the most frequent line was ${model.mostCommonScore.replace("-", "–")}, with average goals ${model.avgHomeGoals}–${model.avgAwayGoals}.${feature ? ` ${firstSentence(feature.reading)}` : ""}`,
    },
  ]
  if (feature) {
    faqs.push({
      q: `Why ${home.clubName} ${home.displaySeason} against ${away.clubName} ${away.displaySeason}?`,
      a: firstSentence(feature.context),
    })
  }
  return faqs
}
