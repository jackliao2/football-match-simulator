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
  name: "LegendaryMatch",
  shortName: "LM",
  domain: "legendarymatch.com",
  email: "info@legendarymatch.com",
  legalUpdated: "26 August 2026",
  tagline: "Pick a team. Pick an era. Settle the debate.",
  description:
    "LegendaryMatch is a football match simulator online: pick a historical team or a current squad and simulate a custom football match. Barcelona 2009 squad vs Real Madrid 2017, Brazil 1970, Arsenal 2004, 2026 national sides — score, scorers, xG and who-would-win probabilities, not a chatbot guess.",
  disclaimer:
    "Independent football simulation project. Not affiliated with or endorsed by any club, league, federation or player.",
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
