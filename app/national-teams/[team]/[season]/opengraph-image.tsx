import { ImageResponse } from "next/og"
import { getTeamByClubSeason } from "@/data/teams"
import { teamOgCopy } from "@/lib/og-copy"

export const alt = "Named historical national team"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function NationOpenGraphImage({
  params,
}: {
  params: Promise<{ team: string; season: string }>
}) {
  const { team: teamId, season } = await params
  const team = getTeamByClubSeason(teamId, season)
  const copy = team ? teamOgCopy(team) : null

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
        <div style={{ fontSize: 20, letterSpacing: 6, color: "#d4b45a" }}>
          {copy?.kicker ?? "LM"}
        </div>
        <div style={{ fontSize: 52, marginTop: 24, lineHeight: 1.15 }}>{copy?.heading ?? "National Team"}</div>
        <div style={{ fontSize: 24, marginTop: 16, color: "#7e9876", lineHeight: 1.3 }}>
          {copy?.subtitle ?? "LegendaryMatch"}
        </div>
        {team ? (
          <div style={{ display: "flex", gap: 28, marginTop: 40, fontSize: 22, color: "#d4b45a" }}>
            <span>{`ATK ${team.attackRating}`}</span>
            <span>{`MID ${team.midfieldRating}`}</span>
            <span>{`DEF ${team.defenseRating}`}</span>
            <span>{`OVR ${team.overallRating}`}</span>
          </div>
        ) : null}
      </div>
    ),
    { ...size },
  )
}
