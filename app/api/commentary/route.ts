import { NextResponse } from "next/server"
import { generateMatchReport } from "@/lib/ai/commentary"
import {
  AiRequestBodyError,
  aiCacheTtlMs,
  guardAiRequest,
  readAiJson,
  withAiCache,
} from "@/lib/ai/guard"
import { getAiCacheNamespace, isAiConfigured } from "@/lib/ai/provider"
import { parseMatchId } from "@/lib/match-id"
import { simulateMatch } from "@/lib/simulation"
import { getTeam } from "@/data/teams"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(request: Request) {
  const startedAt = Date.now()
  const guard = guardAiRequest(request, "commentary")
  if (!guard.allowed) {
    console.warn(
      "[ai-request]",
      JSON.stringify({ event: "rejected", feature: "commentary", status: guard.status }),
    )
    return NextResponse.json({ error: guard.error }, { status: guard.status, headers: guard.headers })
  }

  try {
    const body = await readAiJson<{ matchId?: string }>(request)
    const parsed = body.matchId ? parseMatchId(body.matchId) : null
    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid match id" },
        { status: 400, headers: guard.headers },
      )
    }
    const home = getTeam(parsed.homeId)
    const away = getTeam(parsed.awayId)
    if (!home || !away) {
      return NextResponse.json({ error: "Unknown teams" }, { status: 404, headers: guard.headers })
    }
    const match = simulateMatch(home, away, parsed.seed)
    const cacheKey = `commentary:${getAiCacheNamespace()}:${match.id}`
    const cached = await withAiCache(
      cacheKey,
      aiCacheTtlMs("commentary"),
      () => generateMatchReport(match, home, away),
      (result) => result.source === "ai" || !isAiConfigured(),
    )
    console.info(
      "[ai-request]",
      JSON.stringify({
        cache: cached.status,
        durationMs: Date.now() - startedAt,
        feature: "commentary",
        source: cached.value.source,
      }),
    )
    return NextResponse.json(cached.value, {
      headers: { ...guard.headers, "X-AI-Cache": cached.status },
    })
  } catch (error) {
    if (error instanceof AiRequestBodyError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status, headers: guard.headers },
      )
    }
    console.error(
      "[ai-request]",
      JSON.stringify({
        durationMs: Date.now() - startedAt,
        error: error instanceof Error ? error.message : "Unknown request error",
        feature: "commentary",
      }),
    )
    return NextResponse.json(
      { error: "Could not generate commentary" },
      { status: 500, headers: guard.headers },
    )
  }
}
