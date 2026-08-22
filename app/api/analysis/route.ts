import { NextResponse } from "next/server"
import { generatePreMatchAnalysis } from "@/lib/ai/analysis"
import { getTeam } from "@/data/teams"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { homeId?: string; awayId?: string }
    const home = body.homeId ? getTeam(body.homeId) : undefined
    const away = body.awayId ? getTeam(body.awayId) : undefined
    if (!home || !away) {
      return NextResponse.json({ error: "Unknown teams" }, { status: 404 })
    }
    if (home.id === away.id) {
      return NextResponse.json({ error: "Pick two different teams" }, { status: 400 })
    }
    const result = await generatePreMatchAnalysis(home, away)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Could not generate analysis" }, { status: 500 })
  }
}
