import { clamp } from "@/lib/format"
import type { Player } from "@/types"

export interface FaceStat {
  key: string
  value: number
}

export interface FaceStats {
  kind: "outfield" | "gk"
  items: [FaceStat, FaceStat, FaceStat, FaceStat, FaceStat, FaceStat]
}

const PACE_BIAS: Record<string, number> = {
  ST: 4,
  CF: 2,
  LW: 8,
  RW: 8,
  LM: 6,
  RM: 6,
  CAM: 2,
  LAM: 3,
  RAM: 3,
  CM: -2,
  LCM: -2,
  RCM: -2,
  CDM: -8,
  LDM: -8,
  RDM: -8,
  LB: 4,
  RB: 4,
  LWB: 6,
  RWB: 6,
  CB: -14,
  LCB: -14,
  RCB: -14,
  GK: -22,
}

function jitter(name: string, salt: number): number {
  let hash = salt * 2654435761
  for (let i = 0; i < name.length; i += 1) {
    hash = Math.imul(hash ^ name.charCodeAt(i), 16777619)
  }
  return ((hash >>> 0) % 7) - 3
}

function n(value: number): number {
  return clamp(Math.round(value), 28, 99)
}

export type StatSource = Pick<
  Player,
  | "name"
  | "position"
  | "overall"
  | "attack"
  | "passing"
  | "creativity"
  | "defending"
  | "physical"
  | "goalkeeping"
  | "finishing"
>

export function faceStats(player: StatSource): FaceStats {
  const overall = player.overall
  const pos = player.position
  const j = (salt: number) => jitter(player.name, salt)

  if (pos === "GK") {
    const gk = player.goalkeeping ?? overall
    return {
      kind: "gk",
      items: [
        { key: "DIV", value: n(gk + j(1)) },
        { key: "HAN", value: n(gk - 2 + j(2)) },
        { key: "KIC", value: n((player.passing ?? gk - 14) + j(3)) },
        { key: "REF", value: n(gk + 1 + j(4)) },
        { key: "SPD", value: n((player.physical ?? overall) - 20 + j(5)) },
        { key: "POS", value: n(gk - 1 + j(6)) },
      ],
    }
  }

  const phy = player.physical ?? overall - 4
  const sho = player.finishing ?? player.attack ?? overall - 8
  const pas = player.passing ?? overall - 6
  const dri = player.creativity ?? player.attack ?? overall - 4
  const def = player.defending ?? overall - 20
  const pac = phy * 0.55 + overall * 0.45 + (PACE_BIAS[pos] ?? 0)

  return {
    kind: "outfield",
    items: [
      { key: "PAC", value: n(pac + j(1)) },
      { key: "SHO", value: n(sho + j(2) * 0.35) },
      { key: "PAS", value: n(pas + j(3) * 0.3) },
      { key: "DRI", value: n(dri + j(4) * 0.35) },
      { key: "DEF", value: n(def + j(5) * 0.3) },
      { key: "PHY", value: n(phy + j(6) * 0.3) },
    ],
  }
}

export function statTone(value: number): string {
  if (value >= 92) return "text-gold-2"
  if (value >= 85) return "text-gold"
  if (value >= 75) return "text-text"
  return "text-muted"
}

export function statsSummary(stats: FaceStats): string {
  return stats.items.map((item) => `${item.key} ${item.value}`).join(" · ")
}
