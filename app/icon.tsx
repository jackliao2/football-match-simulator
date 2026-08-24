import { ImageResponse } from "next/og"
import { BRAND_INK, BRAND_MARK_SIZE, brandColor, brandRows } from "@/lib/brand-mark"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  const rows = brandRows()
  const cell = size.width / BRAND_MARK_SIZE
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BRAND_INK,
        }}
      >
        {rows.map((row, y) => (
          <div key={y} style={{ display: "flex", height: cell }}>
            {[...row].map((token, x) => (
              <div
                key={x}
                style={{
                  width: cell,
                  height: cell,
                  backgroundColor: brandColor(token) ?? BRAND_INK,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    ),
    { ...size },
  )
}
