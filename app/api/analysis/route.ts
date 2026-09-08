import { NextResponse } from "next/server"
import { generatePreMatchAnalysis } from "@/lib/ai/analysis"
import {
  AiRequestBodyError,
  applyDailyAiQuota,
  guardAiRequest,
  readAiJson,
  rememberAnalysisFallback,
  shouldSkipAnalysisProvider,
} from "@/lib/ai/guard"
import { isAiConfigured } from "@/lib/ai/provider"
import { getTeam } from "@/data/teams"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(request: Request) {
  const startedAt = Date.now()
  const burst = guardAiRequest(request, "analysis")
  const guard = await applyDailyAiQuota(request, burst)
  if (!guard.allowed) {
    console.warn(
      "[ai-request]",
      JSON.stringify({ event: "rejected", feature: "analysis", status: guard.status }),
    )
    return NextResponse.json({ error: guard.error }, { status: guard.status, headers: guard.headers })
  }

  try {
    const body = await readAiJson<{ homeId?: string; awayId?: string }>(request)
    const home = body.homeId ? getTeam(body.homeId) : undefined
    const away = body.awayId ? getTeam(body.awayId) : undefined
    if (!home || !away) {
      return NextResponse.json({ error: "Unknown teams" }, { status: 404, headers: guard.headers })
    }
    if (home.id === away.id) {
      return NextResponse.json(
        { error: "Pick two different teams" },
        { status: 400, headers: guard.headers },
      )
    }

    const skipProvider = shouldSkipAnalysisProvider(home.id, away.id)
    const result = await generatePreMatchAnalysis(home, away, { skipProvider })
    if (result.source === "template" && isAiConfigured() && !skipProvider) {
      rememberAnalysisFallback(home.id, away.id)
    }
    console.info(
      "[ai-request]",
      JSON.stringify({
        cache: skipProvider ? "fallback-skip" : "disabled",
        durationMs: Date.now() - startedAt,
        feature: "analysis",
        source: result.source,
      }),
    )
    return NextResponse.json(result, {
      headers: { ...guard.headers, "X-AI-Cache": skipProvider ? "fallback-skip" : "disabled" },
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
        feature: "analysis",
      }),
    )
    return NextResponse.json(
      { error: "Could not generate analysis" },
      { status: 500, headers: guard.headers },
    )
  }
}
