"use client"

import { useState } from "react"
import { PixelButton } from "@/components/ui/PixelButton"
import { PixelCard, PixelCardHeader } from "@/components/ui/PixelCard"
import { track } from "@/lib/analytics"

export function CommentaryPanel({ matchId }: { matchId: string }) {
  const [report, setReport] = useState<string | null>(null)
  const [source, setSource] = useState<"ai" | "template" | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/commentary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId }),
      })
      const data = (await response.json()) as {
        report?: string
        source?: "ai" | "template"
        error?: string
      }
      if (!response.ok || !data.report) {
        throw new Error(data.error ?? "Could not generate a report")
      }
      setReport(data.report)
      setSource(data.source ?? "template")
      track("ai_report_generated", { source: data.source ?? "template", matchId })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate a report")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PixelCard>
      <PixelCardHeader>AI Match Report</PixelCardHeader>
      <div className="grid gap-4 p-4">
        <p className="text-sm leading-6 text-muted">
          Optional write-up of this simulated result. The engine already decided the score; this
          only describes it. If no AI key is configured, a local template is used instead.
        </p>
        {!report ? (
          <PixelButton onClick={generate} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Writing…" : "Generate Match Report"}
          </PixelButton>
        ) : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {report ? (
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
              {source === "ai" ? "Generated from structured match JSON" : "Local template report"}
            </p>
            <div className="whitespace-pre-wrap text-sm leading-7 text-text">{report}</div>
          </div>
        ) : null}
      </div>
    </PixelCard>
  )
}
