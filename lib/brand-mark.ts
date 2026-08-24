import mark from "@/data/brand-mark.json"

export const BRAND_MARK_SIZE = mark.size
export const BRAND_INK = "#070907"

const palette = mark.palette as Record<string, string>

export function brandColor(cell: string): string | null {
  if (cell === "." || cell === " ") return null
  return palette[cell] ?? null
}

export function brandRows(): string[] {
  return mark.rows
}

export function brandPixels(): Array<string | null> {
  return mark.rows.flatMap((row) => [...row].map(brandColor))
}
