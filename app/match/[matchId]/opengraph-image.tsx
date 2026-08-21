import { ImageResponse } from "next/og"
import { getTeam } from "@/data/teams"
import { parseMatchId } from "@/lib/match-id"
import { simulateMatch } from "@/lib/simulation"

export const alt = "Simulated football match"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function MatchOpenGraphImage({
  params,
}: {
  params: Promise<{ matchId: string }>
}) {
  const { matchId } = await params
  const parsed = parseMatchId(matchId)
  const home = parsed ? getTeam(parsed.homeId) : undefined
  const away = parsed ? getTeam(parsed.awayId) : undefined
  const match = home && away && parsed ? simulateMatch(home, away, parsed.seed) : null

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
        <div style={{ fontSize: 20, letterSpacing: 6, color: "#d4b45a" }}>SIMULATED MATCH</div>
        {match && home && away ? (
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
            <div style={{ fontSize: 36, lineHeight: 1.3 }}>
              {home.clubName} {home.displaySeason}
            </div>
            <div style={{ fontSize: 72, color: "#d4b45a", margin: "18px 0" }}>
              {match.score.home} – {match.score.away}
            </div>
            <div style={{ fontSize: 36, lineHeight: 1.3 }}>
              {away.clubName} {away.displaySeason}
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 48, marginTop: 24 }}>Football Match Simulator</div>
        )}
      </div>
    ),
    { ...size },
  )
}
