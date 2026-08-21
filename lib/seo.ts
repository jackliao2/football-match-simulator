import type { Metadata } from "next"
import { teamPath } from "@/lib/paths"
import { SITE, absoluteUrl } from "@/lib/site"
import type { HistoricalTeam } from "@/types"

export const defaultMetadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Football Match Simulator — Legendary Teams From Any Era",
    template: "%s | Football Match Simulator",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "football match simulator",
    "football simulator online",
    "simulate football match",
    "historical football teams",
    "legendary squads",
    "world cup squads",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Football Match Simulator — Legendary Teams From Any Era",
    description: SITE.description,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Football Match Simulator — Legendary Teams From Any Era",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export function teamMetadata(team: HistoricalTeam): Metadata {
  const path = teamPath(team)
  return {
    title: { absolute: `${team.seoTitle} | Football Match Simulator` },
    description: team.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title: team.seoTitle,
      description: team.seoDescription,
      url: absoluteUrl(path),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: team.seoTitle,
      description: team.seoDescription,
    },
  }
}
