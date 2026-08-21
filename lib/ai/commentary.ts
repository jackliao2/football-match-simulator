import type { SimulatedMatch } from "@/types"
import { createCommentaryProvider } from "@/lib/ai/provider"
import { templateMatchReport } from "@/lib/ai/templates"
import { toCommentaryPayload } from "@/lib/simulation"
import type { HistoricalTeam } from "@/types"

export const COMMENTARY_SYSTEM_PROMPT = `You write football match reports for a historical team simulator.

Hard rules:
- Never change the result, score, scorers, assists, cards or statistics.
- Never invent additional goals.
- Never invent players who are not in the supplied squads.
- Never contradict the structured statistics.
- Do not claim this was a real historical match. Treat it clearly as a simulation.
- Write 250-500 words.
- Sound like football commentary or match journalism.
- Explain tactical turning points using only the supplied events and stats.
- Mention important players who appear in the data.

The JSON is the source of truth. The simulation engine already decided the winner.`

export async function generateMatchReport(
  match: SimulatedMatch,
  home: HistoricalTeam,
  away: HistoricalTeam,
): Promise<{ report: string; source: "ai" | "template" }> {
  const payload = toCommentaryPayload(match, home, away)
  const provider = createCommentaryProvider()
  if (!provider) {
    return { report: templateMatchReport(match), source: "template" }
  }

  try {
    const report = await provider.generateMatchReport(COMMENTARY_SYSTEM_PROMPT, payload)
    return { report, source: "ai" }
  } catch {
    return { report: templateMatchReport(match), source: "template" }
  }
}
