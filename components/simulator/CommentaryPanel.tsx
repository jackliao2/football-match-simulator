"use client"

import { useState } from "react"
import { ResultPanel } from "@/components/ui/ResultPanel"
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
    <ResultPanel
      kicker="Report"
      title="Match report"
      aside={source === "ai" ? "LLM brief" : source === "template" ? "Local brief" : undefined}
    >
      <div className="grid gap-4 p-4 sm:p-5">
        <p className="font-mono text-sm leading-6 text-muted">
          Optional write-up of this simulated result. The engine already decided the score.
        </p>
        {!report ? (
          <button type="button" className="rail-btn rail-btn-primary w-full sm:w-auto" onClick={generate} disabled={loading}>
            {loading ? "Writing…" : "Generate report"}
          </button>
        ) : null}
        {error ? <p className="font-mono text-sm text-danger">{error}</p> : null}
        {report ? (
          <div className="whitespace-pre-wrap font-mono text-sm leading-7 text-text">{report}</div>
        ) : null}
      </div>
    </ResultPanel>
  )
}
