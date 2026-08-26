import type { MetadataRoute } from "next"
import { allVsPairs } from "@/data/matchups"
import { primeEntities } from "@/data/prime"
import { clubs, nations } from "@/data/clubs"
import { teams } from "@/data/teams"
import { teamPath } from "@/lib/paths"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/simulate"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/teams"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/national-teams"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/prime"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/vs"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.3 },
  ]

  const clubRoutes = clubs.map((club) => ({
    url: absoluteUrl(`/teams/${club.id}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const nationRoutes = nations.map((nation) => ({
    url: absoluteUrl(`/national-teams/${nation.id}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const teamRoutes = teams.map((team) => {
    const current = team.kind === "nation" ? team.eraYear >= 2026 : team.eraYear >= 2025
    return {
      url: absoluteUrl(teamPath(team)),
      changeFrequency: current ? ("weekly" as const) : ("monthly" as const),
      priority: current ? 0.9 : 0.85,
    }
  })

  const primeRoutes = primeEntities.map((entity) => ({
    url: absoluteUrl(`/prime/${entity.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }))

  const vsRoutes = allVsPairs().map(([a, b]) => ({
    url: absoluteUrl(`/vs/${a}-vs-${b}`),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }))

  return [
    ...staticRoutes,
    ...clubRoutes,
    ...nationRoutes,
    ...teamRoutes,
    ...primeRoutes,
    ...vsRoutes,
  ]
}
