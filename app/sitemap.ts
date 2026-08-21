import type { MetadataRoute } from "next"
import { allVsPairs } from "@/data/matchups"
import { primeEntities } from "@/data/prime"
import { clubs } from "@/data/clubs"
import { teams } from "@/data/teams"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/simulate"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/teams"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/prime"), changeFrequency: "monthly", priority: 0.6 },
  ]

  const clubRoutes = clubs.map((club) => ({
    url: absoluteUrl(`/teams/${club.id}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const teamRoutes = teams.map((team) => ({
    url: absoluteUrl(`/teams/${team.clubId}/${team.season}`),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

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

  return [...staticRoutes, ...clubRoutes, ...teamRoutes, ...primeRoutes, ...vsRoutes]
}
