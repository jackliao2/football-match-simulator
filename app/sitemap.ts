import type { MetadataRoute } from "next"
import { allVsPairs } from "@/data/matchups"
import { CLUB_COMPARES } from "@/data/compare"
import { primeEntities } from "@/data/prime"
import { isIndexableTeamPage } from "@/data/team-editorial"
import { clubs, nations } from "@/data/clubs"
import { teams } from "@/data/teams"
import { teamPath } from "@/lib/paths"
import { SITE, absoluteUrl } from "@/lib/site"
import { LOCALES, languageAlternates, localizedPath, type Locale } from "@/lib/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const contentDate = SITE.contentUpdatedIso
  const legalDate = SITE.legalUpdatedIso
  const multilingualPaths = new Map<string, readonly Locale[]>([
    ["/", LOCALES],
    ["/simulate", ["es"]],
  ])
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1, lastModified: contentDate },
    { url: absoluteUrl("/simulate"), changeFrequency: "weekly", priority: 0.9, lastModified: contentDate },
    { url: absoluteUrl("/teams"), changeFrequency: "weekly", priority: 0.8, lastModified: contentDate },
    { url: absoluteUrl("/national-teams"), changeFrequency: "weekly", priority: 0.8, lastModified: contentDate },
    { url: absoluteUrl("/prime"), changeFrequency: "monthly", priority: 0.6, lastModified: contentDate },
    { url: absoluteUrl("/vs"), changeFrequency: "weekly", priority: 0.7, lastModified: contentDate },
    { url: absoluteUrl("/best-football-team-ever"), changeFrequency: "monthly", priority: 0.8, lastModified: contentDate },
    { url: absoluteUrl("/compare"), changeFrequency: "monthly", priority: 0.7, lastModified: contentDate },
    { url: absoluteUrl("/search"), changeFrequency: "weekly", priority: 0.6, lastModified: contentDate },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3, lastModified: legalDate },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3, lastModified: legalDate },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.3, lastModified: legalDate },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5, lastModified: legalDate },
    { url: absoluteUrl("/methodology"), changeFrequency: "yearly", priority: 0.5, lastModified: contentDate },
  ]

  for (const route of staticRoutes) {
    const path = new URL(route.url).pathname || "/"
    const locales = multilingualPaths.get(path)
    if (locales) route.alternates = { languages: languageAlternates(path, locales) }
  }

  const localizedRoutes: MetadataRoute.Sitemap = [
    ...LOCALES.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, "/")),
      changeFrequency: "weekly" as const,
      priority: 0.85,
      lastModified: contentDate,
      alternates: { languages: languageAlternates("/") },
    })),
    {
      url: absoluteUrl("/es/simulate"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: contentDate,
      alternates: { languages: languageAlternates("/simulate", ["es"]) },
    },
  ]

  const clubRoutes = clubs.map((club) => ({
    url: absoluteUrl(`/teams/${club.id}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: contentDate,
  }))

  const nationRoutes = nations.map((nation) => ({
    url: absoluteUrl(`/national-teams/${nation.id}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: contentDate,
  }))

  const teamRoutes = teams.filter((team) => isIndexableTeamPage(team.id)).map((team) => {
    const current = team.kind === "nation" ? team.eraYear >= 2026 : team.eraYear >= 2025
    return {
      url: absoluteUrl(teamPath(team)),
      changeFrequency: current ? ("weekly" as const) : ("monthly" as const),
      priority: current ? 0.9 : 0.85,
      lastModified: contentDate,
    }
  })

  const primeRoutes = primeEntities.map((entity) => ({
    url: absoluteUrl(`/prime/${entity.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.65,
    lastModified: contentDate,
  }))

  const vsRoutes = allVsPairs().map(([a, b]) => ({
    url: absoluteUrl(`/vs/${a}-vs-${b}`),
    changeFrequency: "monthly" as const,
    priority: 0.55,
    lastModified: contentDate,
  }))

  const compareRoutes = CLUB_COMPARES.map((pair) => ({
    url: absoluteUrl(`/compare/${pair.slug}`),
    changeFrequency: "monthly" as const,
    priority: pair.slug === "barcelona-vs-real-madrid" ? 0.8 : 0.6,
    lastModified: contentDate,
  }))

  return [
    ...staticRoutes,
    ...localizedRoutes,
    ...clubRoutes,
    ...nationRoutes,
    ...teamRoutes,
    ...primeRoutes,
    ...vsRoutes,
    ...compareRoutes,
  ]
}
