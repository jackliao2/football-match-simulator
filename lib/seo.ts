import type { Metadata } from "next"
import { teamPageCopy } from "@/lib/page-copy"
import { teamPath } from "@/lib/paths"
import { SITE, absoluteUrl } from "@/lib/site"
import type { HistoricalTeam } from "@/types"

const CLUB_ALIASES: Record<string, string[]> = {
  barcelona: ["barcelona", "barca", "fc barcelona"],
  "real-madrid": ["real madrid"],
  "manchester-united": ["manchester united", "man united"],
  arsenal: ["arsenal"],
  liverpool: ["liverpool"],
  "ac-milan": ["ac milan"],
  "manchester-city": ["manchester city", "man city"],
  chelsea: ["chelsea"],
  "bayern-munich": ["bayern", "bayern munich"],
  "inter-milan": ["inter", "inter milan"],
  juventus: ["juventus"],
  ajax: ["ajax"],
  tottenham: ["tottenham", "spurs"],
  "paris-saint-germain": ["psg", "paris saint-germain"],
  brazil: ["brazil"],
  argentina: ["argentina"],
  england: ["england"],
  france: ["france"],
  spain: ["spain"],
  germany: ["germany"],
  italy: ["italy"],
}

export const PLANNER_KEYWORDS = [
  "football match simulator",
  "football simulator online",
  "match simulator football",
  "custom football match simulator",
  "simulate football match",
  "football simulator",
  "soccer match simulator",
  "who would win football",
  "dream football match",
  "world cup simulator",
  "historical football teams",
  "legendary football squads",
  "barcelona 2009 squad",
  "real madrid 2017 squad",
  "arsenal 2004 squad",
  "manchester united 2008 squad",
  "liverpool 2005 squad",
  "ac milan 2007 squad",
  "brazil 1970",
  "prime barcelona",
  "messi's prime",
  "best football team ever",
  "barcelona vs real madrid",
]

const HOME_TITLE = `${SITE.name} — Football Match Simulator`

export const defaultMetadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: PLANNER_KEYWORDS,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: HOME_TITLE,
    description: SITE.description,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
  },
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export function seasonYears(team: HistoricalTeam): string[] {
  if (team.kind === "nation" || !team.season.includes("-")) {
    return [team.displaySeason.replace("/", "-")]
  }
  const [startStr, endPart] = team.season.split("-")
  const start = Number(startStr)
  if (!Number.isFinite(start) || !endPart) return [team.displaySeason]
  let end = Number(endPart.length === 2 ? `${String(start).slice(0, 2)}${endPart}` : endPart)
  if (!Number.isFinite(end)) return [String(start)]
  if (end < start) end += 100
  return [...new Set([String(start), String(end)])]
}

export function squadKeywords(team: HistoricalTeam): string[] {
  const names = CLUB_ALIASES[team.clubId] ?? [team.clubName.toLowerCase()]
  const years = seasonYears(team)
  const phrases: string[] = [
    `${team.clubName} ${team.displaySeason} squad`,
    `${team.clubName} ${team.displaySeason} lineup`,
    `${team.clubName} ${team.displaySeason} formation`,
    `simulate ${team.clubName} ${team.displaySeason}`,
  ]
  for (const name of names) {
    for (const year of years) {
      phrases.push(
        `${name} ${year} squad`,
        `${year} ${name} squad`,
        `${name} squad ${year}`,
        `${name} ${year} team`,
        `${name} ${year} lineup`,
      )
    }
  }
  return [...new Set(phrases)]
}

export function clubHubKeywords(name: string, clubId: string, teams: HistoricalTeam[]): string[] {
  const aliases = CLUB_ALIASES[clubId] ?? [name.toLowerCase()]
  const phrases = [`${name} squad`, `${name} historical team`, `${name} current squad`]
  for (const team of teams) {
    for (const year of seasonYears(team)) {
      for (const alias of aliases) {
        phrases.push(`${alias} ${year} squad`, `${year} ${alias} squad`)
      }
    }
  }
  phrases.push("football match simulator", "simulate football match")
  return [...new Set(phrases)]
}

export function isCurrentSquad(team: HistoricalTeam): boolean {
  return team.kind === "nation" ? team.eraYear >= 2026 : team.eraYear >= 2025
}

export function teamMetadata(team: HistoricalTeam): Metadata {
  const path = teamPath(team)
  const copy = teamPageCopy(team)
  return {
    title: { absolute: `${copy.title} | ${SITE.name}` },
    description: copy.description,
    keywords: [
      `${team.clubName} ${team.displaySeason}`,
      `${team.clubName} ${team.displaySeason} squad`,
      team.kind === "nation" ? `${team.clubName} ${team.displaySeason} national team` : `${team.clubName} ${team.displaySeason} lineup`,
    ],
    alternates: { canonical: path },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(path),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  }
}
