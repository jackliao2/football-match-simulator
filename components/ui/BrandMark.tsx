import { BRAND_MARK_SIZE, brandRects } from "@/lib/brand-mark"

export function BrandMark({
  size = 32,
  className = "",
}: {
  size?: number
  className?: string
}) {
  const rects = brandRects()
  return (
    <svg
      aria-hidden
      className={`brand-mark ${className}`.trim()}
      width={size}
      height={size}
      viewBox={`0 0 ${BRAND_MARK_SIZE} ${BRAND_MARK_SIZE}`}
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={rect.w} height={1} fill={rect.color} />
      ))}
    </svg>
  )
}
