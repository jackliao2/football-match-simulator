export interface PitchSlot {
  x: number
  y: number
  label: string
}

const FOUR_BACK: PitchSlot[] = [
  { x: 12, y: 70, label: "LB" },
  { x: 36, y: 76, label: "CB" },
  { x: 64, y: 76, label: "CB" },
  { x: 88, y: 70, label: "RB" },
]

const GK: PitchSlot = { x: 50, y: 92, label: "GK" }

export const FORMATION_SLOTS: Record<string, PitchSlot[]> = {
  "4-3-3": [
    { x: 16, y: 14, label: "LW" },
    { x: 50, y: 8, label: "ST" },
    { x: 84, y: 14, label: "RW" },
    { x: 28, y: 38, label: "CM" },
    { x: 50, y: 48, label: "CDM" },
    { x: 72, y: 38, label: "CM" },
    ...FOUR_BACK,
    GK,
  ],
  "4-4-2": [
    { x: 34, y: 12, label: "ST" },
    { x: 66, y: 12, label: "ST" },
    { x: 12, y: 38, label: "LM" },
    { x: 36, y: 42, label: "CM" },
    { x: 64, y: 42, label: "CM" },
    { x: 88, y: 38, label: "RM" },
    ...FOUR_BACK,
    GK,
  ],
  "4-2-3-1": [
    { x: 50, y: 10, label: "ST" },
    { x: 16, y: 28, label: "LW" },
    { x: 50, y: 32, label: "CAM" },
    { x: 84, y: 28, label: "RW" },
    { x: 34, y: 52, label: "CDM" },
    { x: 66, y: 52, label: "CDM" },
    ...FOUR_BACK,
    GK,
  ],
  "4-3-2-1": [
    { x: 50, y: 10, label: "ST" },
    { x: 32, y: 28, label: "CAM" },
    { x: 68, y: 28, label: "CAM" },
    { x: 22, y: 48, label: "CM" },
    { x: 50, y: 52, label: "CM" },
    { x: 78, y: 48, label: "CM" },
    ...FOUR_BACK,
    GK,
  ],
  "3-4-2-1": [
    { x: 50, y: 10, label: "ST" },
    { x: 32, y: 26, label: "CAM" },
    { x: 68, y: 26, label: "CAM" },
    { x: 10, y: 48, label: "LWB" },
    { x: 36, y: 52, label: "CM" },
    { x: 64, y: 52, label: "CM" },
    { x: 90, y: 48, label: "RWB" },
    { x: 22, y: 76, label: "CB" },
    { x: 50, y: 80, label: "CB" },
    { x: 78, y: 76, label: "CB" },
    GK,
  ],
  "3-5-2": [
    { x: 34, y: 12, label: "ST" },
    { x: 66, y: 12, label: "ST" },
    { x: 50, y: 30, label: "CAM" },
    { x: 12, y: 46, label: "LWB" },
    { x: 36, y: 50, label: "CM" },
    { x: 64, y: 50, label: "CM" },
    { x: 88, y: 46, label: "RWB" },
    { x: 22, y: 76, label: "CB" },
    { x: 50, y: 80, label: "CB" },
    { x: 78, y: 76, label: "CB" },
    GK,
  ],
  "4-3-1-2": [
    { x: 34, y: 12, label: "ST" },
    { x: 66, y: 12, label: "ST" },
    { x: 50, y: 30, label: "CAM" },
    { x: 22, y: 48, label: "CM" },
    { x: 50, y: 52, label: "CM" },
    { x: 78, y: 48, label: "CM" },
    ...FOUR_BACK,
    GK,
  ],
  "3-2-4-1": [
    { x: 50, y: 10, label: "ST" },
    { x: 12, y: 30, label: "LW" },
    { x: 36, y: 34, label: "CM" },
    { x: 64, y: 34, label: "CM" },
    { x: 88, y: 30, label: "RW" },
    { x: 34, y: 54, label: "CDM" },
    { x: 66, y: 54, label: "CDM" },
    { x: 18, y: 76, label: "CB" },
    { x: 50, y: 80, label: "CB" },
    { x: 82, y: 76, label: "CB" },
    GK,
  ],
}

export function slotsForFormation(formation: string): PitchSlot[] {
  return FORMATION_SLOTS[formation] ?? FORMATION_SLOTS["4-3-3"]!
}
