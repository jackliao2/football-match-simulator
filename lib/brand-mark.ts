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

export type BrandRect = { x: number; y: number; w: number; color: string }

export function brandRects(): BrandRect[] {
  const rects: BrandRect[] = []
  const rows = brandRows()
  for (let y = 0; y < rows.length; y += 1) {
    const row = rows[y]!
    let x = 0
    while (x < row.length) {
      const cell = row[x]!
      const color = brandColor(cell)
      let w = 1
      while (x + w < row.length && row[x + w] === cell) w += 1
      if (color) rects.push({ x, y, w, color })
      x += w
    }
  }
  return rects
}
