import { NextResponse } from "next/server"
import { generateMatchReport } from "@/lib/ai/commentary"
import { parseMatchId } from "@/lib/match-id"
import { simulateMatch } from "@/lib/simulation"
import { getTeam } from "@/data/teams"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { matchId?: string }
    const parsed = body.matchId ? parseMatchId(body.matchId) : null
    if (!parsed) {
      return NextResponse.json({ error: "Invalid match id" }, { status: 400 })
    }
    const home = getTeam(parsed.homeId)
    const away = getTeam(parsed.awayId)
    if (!home || !away) {
      return NextResponse.json({ error: "Unknown teams" }, { status: 404 })
    }
    const match = simulateMatch(home, away, parsed.seed)
    const result = await generateMatchReport(match, home, away)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Could not generate commentary" }, { status: 500 })
  }
}
