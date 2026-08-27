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
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim() || "legendarymatch.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@legendarymatch.com",
  legalUpdated: "26 August 2026",
  tagline: "Pick a team. Pick an era. Settle the debate.",
  description:
    "LegendaryMatch is an online football and soccer match simulator: pick historical or current squads and simulate a custom match. Barcelona 2009 vs Real Madrid 2017, Brazil 1970, Arsenal 2004 and more — score, scorers, xG and who-would-win probabilities.",
  disclaimer:
    "Independent football simulation project. Not affiliated with or endorsed by any club, league, federation or player.",
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
