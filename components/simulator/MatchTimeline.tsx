import type { MatchEvent, SimulatedMatch } from "@/types"

function eventLabel(event: MatchEvent): string {
  if (event.type === "goal") {
    return event.assist
      ? `GOAL ${event.player} (${event.assist})`
      : event.detail
        ? `GOAL ${event.player} — ${event.detail}`
        : `GOAL ${event.player}`
  }
  if (event.type === "yellow") return `YELLOW ${event.player}`
  if (event.type === "red") return `RED ${event.player}`
  if (event.type === "sub") return `SUB ${event.detail ?? event.player}`
  if (event.type === "save") return `SAVE ${event.player}`
  return `CHANCE ${event.player}`
}

function eventTone(type: MatchEvent["type"]): string {
  if (type === "goal") return "text-gold"
  if (type === "red") return "text-danger"
  if (type === "yellow") return "text-gold-2"
  return "text-muted"
}

export function MatchTimeline({ match }: { match: SimulatedMatch }) {
  return (
    <section className="result-panel">
      <h2 className="border-b border-white/10 px-4 py-3 font-mono text-lg font-semibold tracking-tight">
        <span className="mb-1 block font-display text-[8px] uppercase tracking-[0.22em] text-gold">Events</span>
        Match events
      </h2>
      <ol className="divide-y divide-white/10">
        {match.events.map((event, index) => (
          <li
            key={`${event.type}-${event.minute}-${event.player}-${index}`}
            className="grid grid-cols-[4.5rem_1fr] gap-3 px-4 py-3 text-sm"
          >
            <span className="font-mono text-gold">{event.displayMinute}</span>
            <span>
              <span className={eventTone(event.type)}>{eventLabel(event)}</span>
              <span className="ml-2 text-[10px] uppercase tracking-wider text-muted">
                {event.team === "home" ? match.homeTeam : match.awayTeam}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
