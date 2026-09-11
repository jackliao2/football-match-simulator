import { HUB_COPY } from "@/data/hub-copy"
import { FEATURED_MATCHUPS, allVsPairs, defaultOpponent } from "@/data/matchups"
import { getTeam, teams } from "@/data/teams"
import { teamStars } from "@/lib/stars"
import type { Club, ClubLeague, HistoricalTeam, NationRegion } from "@/types"
import { matchupEditorial, matchupFeature } from "@/data/vs-editorial"

export function copySlot(id: string, modulo: number): number {
  let hash = 2166136261
  for (let i = 0; i < id.length; i += 1) {
    hash ^= id.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash) % modulo
}

export function isCurrentSquad(team: HistoricalTeam): boolean {
  return team.kind === "nation" ? team.eraYear >= 2026 : team.eraYear >= 2025
}

export function firstSentence(text: string): string {
  const trimmed = text.trim()
  const match = trimmed.match(/^[^.!?]+[.!?]/)
  return (match ? match[0] : trimmed).trim()
}

function clip(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const space = cut.lastIndexOf(" ")
  return `${cut.slice(0, space > 80 ? space : max - 1)}…`
}

function stars(team: HistoricalTeam, count = 3) {
  return teamStars(team, count)
}

function trophyBits(team: HistoricalTeam): string {
  if (team.trophies.length === 0) return ""
  return team.trophies.map((trophy) => trophy.label).join(", ")
}

export type TeamPageCopy = {
  title: string
  description: string
  h1: string
  kicker: string
  deck: string
  paragraphs: string[]
  matchupHeading: string
  dossierHeading: string
  faqHeading: string
  starsHeading: string
  xiHeading: string
  benchHeading: string
  ratingsHeading: string
  modelHeading: string
  tagsHeading: string
  honoursHeading: string
  formationHeading: string
  simulateCta: string
  faqKicker: string
  dossierKicker: string
}

export function teamH1(team: HistoricalTeam): string {
  return `${team.clubName} ${team.displaySeason} squad`
}

export function teamPageCopy(team: HistoricalTeam, opponentArg?: HistoricalTeam): TeamPageCopy {
  const opponent = opponentArg ?? getTeam(defaultOpponent(team.id))
  const slot = copySlot(team.id, 9)
  const names = stars(team, 3)
  const top = names[0]
  const current = isCurrentSquad(team)
  const silver = trophyBits(team)
  const wonWorldCup = team.trophies.some((trophy) => trophy.code === "world-cup")
  const wonUcl = team.trophies.some((trophy) => trophy.code === "ucl")
  const wonEuros = team.trophies.some((trophy) => trophy.code === "euros")
  const tag = team.styleTags[0]
  const feat = team.achievements[0]

  const generatedTitle = buildTitle(team, {
    slot,
    current,
    wonWorldCup,
    wonUcl,
    wonEuros,
    top: top?.name,
    tag,
    feat,
    silver,
  })

  const closers = [
    firstSentence(team.summary),
    opponent
      ? `${firstSentence(team.summary)} The argument on this page is usually ${opponent.clubName} ${opponent.displaySeason}.`
      : firstSentence(team.summary),
    `${firstSentence(team.summary)} ${team.formation}, ${team.manager} on the bench.`,
    top
      ? `${firstSentence(team.summary)} ${top.name} is the highest-rated name in the XI.`
      : team.summary,
    silver
      ? `${firstSentence(team.summary)} Silverware that season: ${silver}.`
      : firstSentence(team.summary),
    `${team.clubName} ${team.displaySeason} as we rate it — ATK ${team.attackRating}, MID ${team.midfieldRating}, DEF ${team.defenseRating}.`,
    feat ? `${feat}. ${firstSentence(team.summary)}` : team.summary,
    current
      ? `${firstSentence(team.summary)} This is the newest season in this database, not a live roster.`
      : `${firstSentence(team.summary)} Era-relative ratings: a number from ${team.eraYear}, not a time machine.`,
    tag
      ? `${firstSentence(team.summary)} The label we stuck on them is ${tag.toLowerCase()}.`
      : team.summary,
  ]
  const title = team.seoTitle.trim() || generatedTitle
  const description = clip(team.seoDescription.trim() || closers[slot] || team.summary)

  const kicker = current
    ? team.kind === "nation"
      ? "Modelled 2026 cycle"
      : "Modelled current season"
    : team.achievements[0] ?? team.trophies[0]?.label ?? (team.kind === "nation" ? "National side" : "Club season")

  const deck = firstSentence(team.summary)

  const paragraphs = extraParagraphs(team)

  const matchupHeading = opponent
    ? `Against ${opponent.clubName} ${opponent.displaySeason}`
    : `${team.clubName} ${team.displaySeason} against another peak`

  return {
    title,
    description,
    h1: title,
    kicker,
    deck,
    paragraphs,
    matchupHeading,
    dossierHeading: `Why ${team.manager}'s ${team.clubName} ${team.displaySeason} still gets argued`,
    faqHeading: `${team.clubName} ${team.displaySeason} — what people still ask`,
    starsHeading: top
      ? `${top.name} and ${team.clubName} ${team.displaySeason}`
      : `${team.manager}'s ${team.clubName} ${team.displaySeason} names`,
    xiHeading: `${team.clubName} ${team.displaySeason} XI`,
    benchHeading: `${team.clubName} ${team.displaySeason} bench`,
    ratingsHeading: `${team.clubName} ${team.displaySeason} ratings`,
    modelHeading: `How ${team.clubName} ${team.displaySeason} is modelled`,
    tagsHeading: `${team.clubName} ${team.displaySeason} labels`,
    honoursHeading: `${team.clubName} ${team.displaySeason} honours`,
    formationHeading: `${team.manager}'s ${team.formation}`,
    simulateCta: `Simulate ${team.clubName} ${team.displaySeason}`,
    faqKicker: `${team.clubName} ${team.displaySeason}`,
    dossierKicker: `${team.manager} · ${team.displaySeason}`,
  }
}

function buildTitle(
  team: HistoricalTeam,
  bits: {
    slot: number
    current: boolean
    wonWorldCup: boolean
    wonUcl: boolean
    wonEuros: boolean
    top?: string
    tag?: string
    feat?: string
    silver: string
  },
): string {
  const name = team.clubName
  const year = team.displaySeason
  if (bits.current && team.kind === "nation") {
    const options = [
      `${name} ${year} national team`,
      `${team.manager}'s ${name} ${year}`,
      `${name} at the ${year} World Cup`,
      `${year} ${name} squad`,
    ]
    return options[bits.slot % options.length]!
  }
  if (bits.current) {
    const options = [
      `${name} ${year} squad`,
      `${name} ${year} snapshot`,
      `${team.manager}'s ${name} ${year}`,
      `${name} ${year} season squad`,
    ]
    return options[bits.slot % options.length]!
  }
  if (bits.wonWorldCup) {
    const options = [
      `${name} ${year} World Cup squad`,
      `${year} ${name}, World Cup winners`,
      `${team.manager}'s ${name} ${year}`,
      `${name} ${year} — the World Cup side`,
    ]
    return options[bits.slot % options.length]!
  }
  if (bits.wonEuros) {
    return bits.slot % 2 === 0 ? `${name} ${year} Euros squad` : `${team.manager}'s ${name} ${year}`
  }
  if (bits.wonUcl) {
    const options = [
      `${name} ${year} Champions League squad`,
      `${team.manager}'s ${name} ${year}`,
      `${name} ${year} — European Cup`,
      `${name} ${year} squad`,
    ]
    return options[bits.slot % options.length]!
  }
  const rest = [
    `${name} ${year}`,
    `${name} ${year} squad`,
    `${team.manager}'s ${name} ${year}`,
    `${name} ${year} in a ${team.formation}`,
    bits.top ? `${bits.top} and ${name} ${year}` : `${name} ${year}`,
    bits.tag ? `${name} ${year} — ${bits.tag}` : `${name} ${year}`,
    bits.silver ? `${name} ${year} (${bits.silver})` : `${year} ${name}`,
    `How ${name} ${year} is rated`,
    `${name} ${year} XI`,
  ]
  return rest[bits.slot]!
}

function extraParagraphs(team: HistoricalTeam): string[] {
  const note = siblingNote(team)
  return note ? [note] : []
}

function siblingNote(team: HistoricalTeam): string | undefined {
  const others = teams
    .filter((item) => item.clubId === team.clubId && item.id !== team.id)
    .sort((a, b) => b.eraYear - a.eraYear)
  if (others.length === 0) return undefined
  const years = others.map((item) => item.displaySeason)
  if (years.length === 1) {
    return `The other ${team.clubName} season in this catalogue is ${years[0]}.`
  }
  if (isCurrentSquad(team)) {
    return `Older ${team.clubName} sides on the site: ${years.join(", ")}.`
  }
  return `Other ${team.clubName} seasons in the catalogue: ${years.join(", ")}.`
}

export function relatedMatchups(team: HistoricalTeam, limit = 4): HistoricalTeam[] {
  const seen = new Set<string>([team.id])
  const out: HistoricalTeam[] = []

  const add = (id: string | undefined) => {
    if (!id || seen.has(id)) return
    const found = getTeam(id)
    if (!found) return
    seen.add(id)
    out.push(found)
  }

  add(defaultOpponent(team.id))
  for (const [home, away] of [...FEATURED_MATCHUPS, ...allVsPairs()]) {
    if (home === team.id) add(away)
    if (away === team.id) add(home)
    if (out.length >= limit) return out.slice(0, limit)
  }

  return out.slice(0, limit)
}

export type OrgHubCopy = {
  kicker: string
  title: string
  lead: string
  description: string
}

export function orgHubCopy(org: Club, sides: HistoricalTeam[]): OrgHubCopy {
  const custom = HUB_COPY[org.id]
  const years = sides.map((side) => side.displaySeason)
  const sketches = sides.map((side) => `${side.displaySeason} — ${firstSentence(side.summary)}`)
  const nation = org.kind === "nation" || sides[0]?.kind === "nation"
  const title = custom?.title ?? `${org.name}: ${years.join(" · ")}`
  const lead = custom?.lead ?? sketches.join(" ")
  const kicker = (custom?.kicker ?? title.split(":")[0] ?? (nation ? "National sides" : "Club seasons")).trim()
  const description = clip(
    custom?.description ??
      `${lead} ${
        nation
          ? "Open a year for the XI and the ratings, then run them against a club or another country."
          : "Open a season for the XI and the ratings."
      }`,
  )

  return { kicker, title, lead, description }
}

export const LEAGUE_NOTES: Record<ClubLeague, string> = {
  "premier-league":
    "English pages mix the arguments everyone has (United 99, the Invincibles, Istanbul, Mourinho’s first Chelsea) with the ones people forget they want: Revie’s Leeds, Clough’s Forest, Keegan’s Newcastle. The 2025/26 season sits in the same historical list without pretending to be a live roster.",
  "la-liga":
    "Spain here is mostly the clásico years people pause YouTube for — Guardiola’s Barça, Madrid’s European Cup sides, Simeone’s Atlético — plus Athletic, Sevilla and Valencia so it is not only two clubs shouting.",
  "serie-a":
    "Italy is the Milan derby in several decades, Juve when they actually had a European night, Napoli with Maradona and with the 2023 title. Calcio as a mood, not a FIFA league select screen.",
  bundesliga:
    "Bayern’s treble years, Klopp’s Dortmund, Gladbach when they were the thing, Leverkusen going unbeaten. German football in the catalogue is more than one red shirt.",
  "ligue-1":
    "PSG’s expensive decades, Marseille ’93, Lyon when they could not stop winning the league, Jardim’s Monaco with a teenager called Mbappé. France as clubs, not only the national team pages.",
  "liga-portugal":
    "Porto under Mourinho, Benfica with Eusébio, Sporting with a skinny winger who left for Manchester. Portuguese sides that changed European ties, not a complete Primeira Liga dump.",
  eredivisie:
    "Ajax 95 is the one everyone books. Van Gaal’s children, plus PSV’s European Cup and Feyenoord’s earlier one, because Dutch football did not start and end in Amsterdam.",
  scottish:
    "Lisbon Lions. Nine-in-a-row Rangers. Two Glasgow clubs, two very different European stories, no filler from the rest of the SPFL.",
  "other-europe":
    "The nights that still get put on grainy tape: Red Star in Bari, Steaua in Seville, Galatasaray in Copenhagen. Not a ‘rest of world’ junk drawer — three specific miracles.",
  "south-america":
    "Santos with Pelé, Flamengo with Zico, Boca and River as club sides rather than just Argentina shirts. Libertadores nights, not national-team shirts with a different badge.",
}

export const REGION_NOTES: Record<NationRegion, string> = {
  europe:
    "Euros winners, World Cup winners, and the nearly sides that still get shouted about — Cruyff’s Netherlands, Croatia in 2018, Greece in 2004. 2026 squads are in the same list as 1966.",
  "south-america":
    "Brazil in several peaks (and 2014), Argentina with Maradona and with Messi, Uruguay as the original nuisance, Colombia when Valderrama or James ran the midfield.",
  africa:
    "Not a complete CAF archive. Cameroon 90, Nigeria 94, Senegal knocking out France, Morocco to a World Cup semi. The nights that changed who Europe thought could win.",
  concacaf:
    "Mexico at a home World Cup, the US in 2002. Thin on purpose — we built the arguments people actually type, not every Gold Cup squad.",
  asia:
    "Japan and South Korea, 2002, co-hosts who stopped being a footnote. If you want a 2026 Asian XI, it is not on this page yet.",
}

export function catalogCounts(): { clubs: number; nations: number; clubSides: number; nationSides: number } {
  const clubSides = teams.filter((team) => team.kind !== "nation")
  const nationSides = teams.filter((team) => team.kind === "nation")
  return {
    clubs: new Set(clubSides.map((team) => team.clubId)).size,
    nations: new Set(nationSides.map((team) => team.clubId)).size,
    clubSides: clubSides.length,
    nationSides: nationSides.length,
  }
}

export function vsPageCopy(home: HistoricalTeam, away: HistoricalTeam, _runs: number) {
  const matchup = `${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}`
  const editorial = matchupEditorial(home, away)
  const feature = matchupFeature(home, away)
  const homeTag = home.styleTags[0] ?? home.formation
  const awayTag = away.styleTags[0] ?? away.formation
  return {
    title: feature ? `${home.clubName} vs ${away.clubName}: ${feature.title}` : matchup,
    description: clip(editorial),
    lead: editorial,
    editorial,
    kicker: feature?.title ?? `${home.displaySeason} vs ${away.displaySeason}`,
    sectionHeading: `${home.manager}'s ${home.displaySeason} against ${away.manager}'s ${away.displaySeason}`,
    snapshotHeading: `${home.clubName} ${home.displaySeason} against ${away.clubName} ${away.displaySeason} — what the runs say`,
    contextHeading: `What ${home.manager}'s ${home.clubName} ${home.displaySeason} actually was`,
    hingeHeading: `${homeTag} against ${awayTag}`,
    readingHeading: `A ${home.clubName} win versus a ${away.clubName} win`,
    faqHeading: `${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}`,
    playHeading: `${home.clubName} ${home.displaySeason} against ${away.clubName} ${away.displaySeason}`,
    longReadKicker: `${home.clubName} ${home.displaySeason} vs ${away.clubName} ${away.displaySeason}`,
    whyKicker: `${home.clubName} ${home.displaySeason}`,
    hingeKicker: `${homeTag} against ${awayTag}`,
    readingKicker: `${home.clubName} or ${away.clubName}`,
    snapshotKicker: `${home.displaySeason} vs ${away.displaySeason}`,
    faqKicker: `${home.clubName} vs ${away.clubName}`,
    playKicker: `${home.manager} vs ${away.manager}`,
  }
}
