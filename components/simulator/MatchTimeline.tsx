import type { HistoricalTeam, MatchEvent, SimulatedMatch } from "@/types"

function eventLabel(event: MatchEvent): string {
  if (event.type === "goal") {
    return event.assist ? `${event.player} (${event.assist})` : event.player
  }
  if (event.type === "yellow") return event.player
  if (event.type === "red") return event.player
  if (event.type === "sub") return event.detail ?? event.player
  if (event.type === "save") return event.player
  return event.player
}

function eventTag(type: MatchEvent["type"]): string {
  if (type === "goal") return "GOAL"
  if (type === "yellow") return "YEL"
  if (type === "red") return "RED"
  if (type === "sub") return "SUB"
  if (type === "save") return "SAVE"
  return "CH"
}

function eventTone(type: MatchEvent["type"]): string {
  if (type === "goal") return "text-gold"
  if (type === "red") return "text-danger"
  if (type === "yellow") return "text-gold-2"
  return "text-muted"
}

export function MatchTimeline({
  match,
  home,
  away,
}: {
  match: SimulatedMatch
  home?: HistoricalTeam
  away?: HistoricalTeam
}) {
  const homeTag = home?.clubCode ?? match.homeTeam
  const awayTag = away?.clubCode ?? match.awayTeam

  return (
    <section className="result-panel">
      <h2 className="border-b border-white/10 px-3 py-2 font-display text-[8px] uppercase tracking-[0.18em] text-gold">
        Events
      </h2>
      <ol>
        {match.events.map((event, index) => (
          <li
            key={`${event.type}-${event.minute}-${event.player}-${index}`}
            className="grid grid-cols-[2.4rem_2.4rem_minmax(0,1fr)_2.4rem] items-center gap-2 px-3 py-1 font-mono text-[12px] leading-5"
          >
            <span className="text-gold">{event.displayMinute}</span>
            <span className={eventTone(event.type)}>{eventTag(event.type)}</span>
            <span className="min-w-0 truncate text-text">{eventLabel(event)}</span>
            <span className="text-right text-[10px] tracking-wider text-muted">
              {event.team === "home" ? homeTag : awayTag}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
