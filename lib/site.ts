export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "https://legendarymatch.com").replace(/\/$/, "")
  return raw.replace(/^https:\/\/www\./i, "https://")
}

export const SITE = {
  name: "LegendaryMatch",
  shortName: "LM",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim() || "legendarymatch.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@legendarymatch.com",
  editorName: process.env.NEXT_PUBLIC_EDITOR_NAME?.trim() || "Jack",
  legalUpdated: "30 August 2026",
  legalUpdatedIso: "2026-08-30",
  contentUpdated: "9 September 2026",
  contentUpdatedIso: "2026-09-09",
  tagline: "Barcelona 2010/11 vs Madrid 2016/17. One simulated night.",
  description:
    "LegendaryMatch is an online football and soccer match simulator. Play Barcelona 2010/11 against Madrid 2016/17, Brazil 1970 against Spain 2010, or any two named seasons — score, scorers, xG and who-would-win probabilities.",
  disclaimer:
    "Independent football simulation project. Not affiliated with or endorsed by any club, league, federation or player.",
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
