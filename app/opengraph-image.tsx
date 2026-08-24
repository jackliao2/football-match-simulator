import { ImageResponse } from "next/og"

export const alt = "LegendaryMatch — Football match simulator"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#070907",
          color: "#d7ead0",
          padding: 72,
          border: "18px solid #d4b45a",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            color: "#d4b45a",
            textTransform: "uppercase",
          }}
        >
          LegendaryMatch
        </div>
        <div style={{ fontSize: 54, marginTop: 28, lineHeight: 1.2 }}>Pick a team. Pick an era.</div>
        <div style={{ fontSize: 54, lineHeight: 1.2 }}>Settle the debate.</div>
        <div style={{ marginTop: 36, fontSize: 22, color: "#7e9876" }}>
          Historical squads · Seeded simulation · No club crests
        </div>
      </div>
    ),
    { ...size },
  )
}
