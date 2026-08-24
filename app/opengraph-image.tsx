import { ImageResponse } from "next/og"
import { BRAND_INK, brandColor, brandRows } from "@/lib/brand-mark"

export const alt = "LegendaryMatch — Football match simulator"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  const rows = brandRows()
  const cell = 5
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
          padding: 72,
          border: "18px solid #d4b45a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
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
                fontSize: 18,
                letterSpacing: 6,
                color: "#7e9876",
                textTransform: "uppercase",
              }}
            >
              Legendary
            </div>
            <div
              style={{
                fontSize: 56,
                letterSpacing: 4,
                color: "#d4b45a",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              Match
            </div>
          </div>
        </div>
        <div style={{ fontSize: 40, marginTop: 40, lineHeight: 1.2 }}>Pick a team. Pick an era.</div>
        <div style={{ fontSize: 40, lineHeight: 1.2 }}>Settle the debate.</div>
        <div style={{ marginTop: 28, fontSize: 20, color: "#7e9876" }}>
          Football match simulator · Historical squads · No club crests
        </div>
      </div>
    ),
    { ...size },
  )
}
