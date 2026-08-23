export function slugify(value: string): string {
  return value
    .replace(/['’]/g, "")
    .replace(/æ/gi, "ae")
    .replace(/ø/gi, "o")
    .replace(/å/gi, "a")
    .replace(/ł/gi, "l")
    .replace(/đ/gi, "d")
    .replace(/ß/g, "ss")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function displayMinute(minute: number): string {
  if (minute <= 90) return `${minute}'`
  return `90+${minute - 90}'`
}

export function formatRating(value: number): string {
  return Math.round(value).toString().padStart(2, "0")
}

export function formatXg(value: number): string {
  return value.toFixed(2)
}

export function formatPct(value: number): string {
  return `${Math.round(value)}%`
}

export function teamLabel(clubName: string, displaySeason: string): string {
  return `${clubName} ${displaySeason}`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function round1(value: number): number {
  return Math.round(value * 10) / 10
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100
}
