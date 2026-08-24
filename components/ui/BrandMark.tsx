import { BRAND_MARK_SIZE, brandColor, brandRows } from "@/lib/brand-mark"

export function BrandMark({
  size = 32,
  className = "",
}: {
  size?: number
  className?: string
}) {
  const rows = brandRows()
  const scale = size / BRAND_MARK_SIZE
  return (
    <span
      aria-hidden
      className={`brand-mark ${className}`.trim()}
      style={{
        width: size,
        height: size,
        display: "inline-grid",
        gridTemplateColumns: `repeat(${BRAND_MARK_SIZE}, ${scale}px)`,
        gridTemplateRows: `repeat(${BRAND_MARK_SIZE}, ${scale}px)`,
        imageRendering: "pixelated",
      }}
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) => {
          const color = brandColor(cell)
          return (
            <span
              key={`${x}-${y}`}
              style={{ backgroundColor: color ?? "transparent" }}
            />
          )
        }),
      )}
    </span>
  )
}
