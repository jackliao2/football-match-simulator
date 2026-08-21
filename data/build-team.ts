import type { HistoricalTeam, Player } from "@/types"
import { slugify } from "@/lib/format"

type RatingOverrides = Partial<
  Pick<
    Player,
    | "attack"
    | "passing"
    | "creativity"
    | "defending"
    | "physical"
    | "goalkeeping"
    | "finishing"
    | "chanceCreation"
  >
>

function shift(value: number, delta: number): number {
  return Math.max(20, Math.min(99, value + delta))
}

function positionDefaults(position: string, overall: number): RatingOverrides {
  const o = overall
  if (position === "GK") {
    return {
      goalkeeping: o,
      defending: shift(o, -8),
      physical: shift(o, -4),
      passing: shift(o, -18),
      attack: 18,
      finishing: 14,
      creativity: shift(o, -25),
      chanceCreation: 12,
    }
  }
  if (["CB", "LCB", "RCB"].includes(position)) {
    return {
      defending: o,
      physical: shift(o, -1),
      passing: shift(o, -10),
      attack: shift(o, -28),
      finishing: shift(o, -35),
      creativity: shift(o, -22),
      chanceCreation: shift(o, -30),
    }
  }
  if (["LB", "RB", "LWB", "RWB"].includes(position)) {
    return {
      defending: shift(o, -4),
      physical: shift(o, -3),
      passing: shift(o, -6),
      attack: shift(o, -10),
      finishing: shift(o, -18),
      creativity: shift(o, -8),
      chanceCreation: shift(o, -8),
    }
  }
  if (["CDM", "LDM", "RDM"].includes(position)) {
    return {
      defending: shift(o, -2),
      passing: shift(o, -3),
      physical: shift(o, -4),
      attack: shift(o, -16),
      finishing: shift(o, -22),
      creativity: shift(o, -8),
      chanceCreation: shift(o, -10),
    }
  }
  if (["CM", "LCM", "RCM"].includes(position)) {
    return {
      passing: o,
      creativity: shift(o, -2),
      chanceCreation: shift(o, -4),
      defending: shift(o, -12),
      attack: shift(o, -8),
      finishing: shift(o, -14),
      physical: shift(o, -8),
    }
  }
  if (["CAM", "LAM", "RAM"].includes(position)) {
    return {
      creativity: o,
      chanceCreation: shift(o, -1),
      passing: shift(o, -2),
      attack: shift(o, -4),
      finishing: shift(o, -8),
      defending: shift(o, -24),
      physical: shift(o, -10),
    }
  }
  if (["LW", "RW", "LM", "RM"].includes(position)) {
    return {
      attack: o,
      finishing: shift(o, -3),
      chanceCreation: shift(o, -4),
      creativity: shift(o, -5),
      passing: shift(o, -8),
      physical: shift(o, -8),
      defending: shift(o, -26),
    }
  }
  return {
    attack: o,
    finishing: o,
    chanceCreation: shift(o, -8),
    passing: shift(o, -10),
    creativity: shift(o, -10),
    physical: shift(o, -6),
    defending: shift(o, -32),
  }
}

export function pl(
  name: string,
  shortName: string,
  position: string,
  overall: number,
  overrides: RatingOverrides = {},
): Player {
  return {
    id: slugify(name),
    name,
    shortName,
    position,
    overall,
    ...positionDefaults(position, overall),
    ...overrides,
  }
}

type TeamInput = Omit<HistoricalTeam, "id" | "overallRating" | "kind"> & {
  overallRating?: number
  kind?: HistoricalTeam["kind"]
}

export function makeTeam(input: TeamInput): HistoricalTeam {
  const overallRating =
    input.overallRating ??
    Math.round(
      input.attackRating * 0.28 +
        input.midfieldRating * 0.28 +
        input.defenseRating * 0.22 +
        input.goalkeeperRating * 0.12 +
        input.chemistryRating * 0.1,
    )

  return {
    ...input,
    kind: input.kind ?? "club",
    id: `${input.clubId}-${input.season}`,
    overallRating,
  }
}
