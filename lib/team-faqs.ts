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
      a: `${modelledCurrentSquadNote(team)} ${stars} are the highest-rated names in this ${team.formation} under ${team.manager}.`,
    })
  } else {
    faqs.push({
      q: `What was the ${team.clubName} ${team.displaySeason} squad?`,
      a: `${hook} ${stars} lead the ${team.formation} under ${team.manager}.`,
    })
  }

  if (shortSeason && !current) {
    faqs.push({
      q: `Is this the ${team.clubName} ${shortSeason} squad?`,
      a: `Yes — ${team.clubName} ${shortSeason} searches usually mean this ${team.displaySeason} side: ${stars}, ${team.formation}, ${team.manager}.`,
    })
  }

  if (opponent && model) {
    const written = writtenMatchupEditorial(team, opponent)
    const matchup = written
      ? firstSentence(written)
      : `${stars} in a ${team.formation} against ${nameList(opponent)} in a ${opponent.formation}.`
    faqs.push({
      q: `Who would win between ${team.clubName} ${team.displaySeason} and ${opponent.clubName} ${opponent.displaySeason}?`,
      a: `${matchup} In ${runs} seeded simulations of this modelled matchup, ${team.clubName} won ${model.homeWinPct}%, ${opponent.clubName} won ${model.awayWinPct}%, and ${model.drawPct}% finished level. The most common score was ${model.mostCommonScore.replace("-", "–")}. Not a real fixture and not betting advice.`,
    })
  }

  const trophy = team.trophies[0]?.label
  const feat = team.achievements[0]
  if (current) {
    faqs.push({
      q: `Who starts for ${team.clubName} ${team.displaySeason} in the simulator?`,
      a: `${team.manager}'s modelled ${team.formation} is led by ${stars}. Style tags on this XI: ${team.styleTags.slice(0, 2).join(" and ").toLowerCase()}. Ratings are era-relative, not a live FIFA card.`,
    })
  } else {
    faqs.push({
      q: `What formation did ${team.clubName} ${team.displaySeason} play?`,
      a: `${team.manager} used a ${team.formation}. ${feat ? `${feat}. ` : ""}${trophy ? `Silverware on this dossier: ${trophy}. ` : ""}The labels on this XI are ${team.styleTags.slice(0, 2).join(" and ").toLowerCase()}.`,
    })
  }

  return faqs
}

export function vsFaqs(home: HistoricalTeam, away: HistoricalTeam, model: MonteCarloResult, runs: number): TeamFaq[] {
  const written = writtenMatchupEditorial(home, away)
  const feature = matchupFeature(home, away)
  const hook = written
    ? firstSentence(written)
    : `${nameList(home)} in a ${home.formation} against ${nameList(away)} in a ${away.formation}.`
  const faqs: TeamFaq[] = [
    {
      q: `Who would win between ${home.clubName} ${home.displaySeason} and ${away.clubName} ${away.displaySeason}?`,
      a: `${hook} Across ${runs} seeded simulations, ${home.clubName} won ${model.homeWinPct}%, ${away.clubName} won ${model.awayWinPct}%, and ${model.drawPct}% finished level. The most common score was ${model.mostCommonScore.replace("-", "–")}. Modelled hypothetical, not a real fixture.`,
    },
    {
      q: `What score does the model pick for ${home.clubName} vs ${away.clubName}?`,
      a: `There is no single official score. Across ${runs} matches the most frequent line was ${model.mostCommonScore.replace("-", "–")}, with average goals ${model.avgHomeGoals}–${model.avgAwayGoals}.${feature ? ` ${firstSentence(feature.reading)}` : ""}`,
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
