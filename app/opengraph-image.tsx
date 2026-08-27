import { ImageResponse } from "next/og"
import { BRAND_INK, brandColor, brandRows } from "@/lib/brand-mark"

export const alt = "LegendaryMatch — Football and soccer match simulator"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  const rows = brandRows()
  const cell = 6
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: BRAND_INK,
          color: "#d7ead0",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 10,
                color: "#c5d0be",
                textTransform: "uppercase",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              Legendary
            </div>
            <div
              style={{
                width: 72,
                height: 1,
                backgroundColor: "#d4b45a",
                marginTop: 12,
                marginBottom: 12,
              }}
            />
            <div
              style={{
                fontSize: 56,
                letterSpacing: 12,
                color: "#d4b45a",
                textTransform: "uppercase",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              Match
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 48,
            lineHeight: 1.35,
            color: "#d7ead0",
            letterSpacing: 1,
          }}
        >
          Pick a team. Pick an era. Settle the debate.
        </div>
        <div style={{ marginTop: 20, fontSize: 20, color: "#7e9876", letterSpacing: 2 }}>
          Football match simulator · Historical squads
        </div>
      </div>
    ),
    { ...size },
  )
}
