import { StatTip } from "@/components/teams/StatTip"
import { faceStats } from "@/lib/player-stats"
import { slotsForFormation } from "@/lib/formations"
import type { HistoricalTeam } from "@/types"

export function Formation({ team }: { team: HistoricalTeam }) {
  const slots = slotsForFormation(team.formation)
  const byId = new Map(team.players.map((player) => [player.id, player]))
  const eleven = team.startingXI.map((id, index) => ({
    player: byId.get(id),
    slot: slots[index] ?? { x: 50, y: 50, label: "" },
  }))

  return (
    <div className="result-panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-display text-[8px] uppercase tracking-[0.18em] text-gold">
          Formation {team.formation}
        </span>
        <span className="font-mono text-xs text-muted">{team.manager}</span>
      </div>
      <div className="pitch-grid relative min-h-[20rem] w-full sm:min-h-[32rem]">
        {eleven.map(({ player, slot }, index) =>
          player ? (
            <div
              key={`${player.id}-${index}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
            >
              <div className="min-w-[4.6rem] border border-line-hi bg-ink/85 px-1 py-1 sm:min-w-[5.4rem]">
                <div className="font-display text-[8px] leading-tight tracking-wide text-gold sm:text-[9px]">
                  {player.shortName}
                </div>
                <div className="font-mono text-[10px] text-muted">
                  <StatTip overall={player.overall} stats={faceStats(player)} size="sm" />
                </div>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}
