import { ImageResponse } from "next/og"
import { resolveClubCompare } from "@/data/compare"
import { getClub } from "@/data/clubs"

export const alt = "Who is better?"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function CompareOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pair = resolveClubCompare(slug)
  const left = pair ? getClub(pair.leftClubId) : undefined
  const right = pair ? getClub(pair.rightClubId) : undefined
  const title = left && right ? `${left.name} or ${right.name}?` : "Who is better?"
  const call = pair?.verdictHeading ?? "Compare two primes, then simulate the night."

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
          border: "18px solid #5c8a48",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: "#d4b45a" }}>
          WHO IS BETTER
        </div>
        <div style={{ display: "flex", fontSize: 52, marginTop: 24, lineHeight: 1.15 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 20, color: "#f0d57a", lineHeight: 1.3 }}>
          {call}
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 22, color: "#7e9876" }}>
          LegendaryMatch — then simulate the primes
        </div>
      </div>
    ),
    { ...size },
  )
}
