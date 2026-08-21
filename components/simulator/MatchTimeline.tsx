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

export function MatchTimeline({ match }: { match: SimulatedMatch }) {
  const events = match.events.filter((event) => event.type !== "chance" || true)
  return (
    <section className="border-2 border-line bg-panel">
      <h2 className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.16em] text-gold">
        Match Events
      </h2>
      <ol className="divide-y divide-line">
        {events.map((event, index) => (
          <li
            key={`${event.type}-${event.minute}-${event.player}-${index}`}
            className="grid grid-cols-[4.5rem_1fr] gap-3 px-4 py-3 text-sm"
          >
            <span className="font-mono text-gold">{event.displayMinute}</span>
            <span>
              <span className={event.team === "home" ? "text-text" : "text-muted"}>
                {eventLabel(event)}
              </span>
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
