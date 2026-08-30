import { describe, expect, it } from "vitest"
import { ImageResponse } from "next/og"
import { createElement } from "react"
import { getTeam } from "@/data/teams"
import { simulateMatch } from "@/lib/simulation"

describe("match open graph image tree", () => {
  it("renders a PNG when labels are single text nodes", async () => {
    const home = getTeam("barcelona-2008-09")
    const away = getTeam("real-madrid-2016-17")
    expect(home && away).toBeTruthy()
    const match = simulateMatch(home!, away!, "a71d92")
    const homeLabel = `${home!.clubName} ${home!.displaySeason}`
    const awayLabel = `${away!.clubName} ${away!.displaySeason}`
    const scoreLabel = `${match.score.home} - ${match.score.away}`

    const response = new ImageResponse(
      createElement(
        "div",
        {
          style: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#070907",
            color: "#d7ead0",
          },
        },
        createElement("div", { style: { fontSize: 36 } }, homeLabel),
        createElement("div", { style: { fontSize: 72 } }, scoreLabel),
        createElement("div", { style: { fontSize: 36 } }, awayLabel),
      ),
      { width: 1200, height: 630 },
    )

    const bytes = await response.arrayBuffer()
    expect(bytes.byteLength).toBeGreaterThan(1000)
  }, 15000)

  it("rejects adjacent text nodes inside a non-flex div", async () => {
    const response = new ImageResponse(
      createElement(
        "div",
        { style: { width: "100%", height: "100%", display: "flex" } },
        createElement("div", { style: { fontSize: 36 } }, "Barcelona", " ", "2008/09"),
      ),
      { width: 1200, height: 630 },
    )

    await expect(response.arrayBuffer()).rejects.toThrow(/display: flex/)
  }, 15000)
})
