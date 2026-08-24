import { ImageResponse } from "next/og"
import { BRAND_INK, BRAND_MARK_SIZE, brandColor, brandRows } from "@/lib/brand-mark"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  const rows = brandRows()
  const cell = Math.floor(160 / BRAND_MARK_SIZE)
  const inner = BRAND_MARK_SIZE * cell
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_INK,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: inner,
            height: inner,
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
      </div>
    ),
    { ...size },
  )
}
