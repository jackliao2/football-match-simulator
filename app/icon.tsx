import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070907",
          color: "#d4b45a",
          fontSize: 16,
          fontWeight: 700,
          border: "2px solid #d4b45a",
        }}
      >
        L
      </div>
    ),
    { ...size },
  )
}
