export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return "http://localhost:3000"
}

export const SITE = {
  name: "Football Match Simulator",
  shortName: "FMS",
  tagline: "Pick a team. Pick an era. Settle the debate.",
  description:
    "Simulate football matches between legendary club sides and national teams — Barcelona, Real Madrid, Chelsea, Ajax, Brazil 1970, England 1966, Hungary 1954 and more. Pick a historical team and season. The engine produces score, scorers, xG and events, not a chatbot guess.",
  disclaimer:
    "Independent football simulation project. Not affiliated with or endorsed by any club, league, federation or player.",
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
