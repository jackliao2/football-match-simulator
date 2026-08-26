import type { HistoricalTeam, Player } from "@/types"
import { createCommentaryProvider } from "@/lib/ai/provider"
import { starters } from "@/lib/simulation/ratings"

const ATTACK_POS = new Set(["ST", "CF", "LW", "RW", "SS", "CAM"])
const MID_POS = new Set(["CM", "CDM", "CAM", "LCM", "RCM", "LDM", "RDM", "LM", "RM"])
const DEF_POS = new Set(["CB", "LB", "RB", "LCB", "RCB", "LWB", "RWB"])

export const ANALYSIS_SYSTEM_PROMPT = `You write pre-match tactical analysis for a historical football team simulator.

Hard rules:
- This is NOT a match report. Do not invent a score, scorers, cards or a winner.
- Never invent players who are not in the supplied squads.
- Never claim this was a real historical fixture. These sides may be from different eras.
- Ratings are era-relative: a 95 in 1970 is greatness in 1970, not a claim about modern athleticism.
- Write 450-800 words in English.
- Use these section headings in this order, in capitals:
  OPENING
  STYLE CLASH
  FORWARD DUEL
  MIDFIELD CONTROL
  DEFENCE AND KEEPERS
  COACHING
  ENGINE READ
- Be specific: name forwards, creators, destroyers and keepers from the JSON.
- Compare styles (possession, press, counter, width, tempo) using the supplied numbers.
- The ENGINE READ section may say which side the model rates stronger and why, but must stress that a single simulated seed can still swing.

The JSON is the source of truth.`

function byOverall(a: Player, b: Player) {
  return b.overall - a.overall
}

function pick(team: HistoricalTeam, roles: Set<string>, count = 3): Player[] {
  return starters(team).filter((player) => roles.has(player.position)).sort(byOverall).slice(0, count)
}

function names(players: Player[]): string {
  if (players.length === 0) return "nobody listed in those roles"
  return players.map((player) => `${player.name} (${player.position} ${player.overall})`).join(", ")
}

function gk(team: HistoricalTeam): Player | undefined {
  return starters(team).find((player) => player.position === "GK") ?? team.players.find((player) => player.position === "GK")
}

function styleLine(team: HistoricalTeam): string {
  return `${team.clubName} ${team.displaySeason} line up in a ${team.formation} under ${team.manager}. Tagged ${team.styleTags.join(", ") || "balanced"}. Possession ${team.possession}, press ${team.pressing}, tempo ${team.tempo}, counter ${team.counterAttack}, width ${team.width}. Unit ratings: ATK ${team.attackRating} / MID ${team.midfieldRating} / DEF ${team.defenseRating} / GK ${team.goalkeeperRating} / CHE ${team.chemistryRating} / OVR ${team.overallRating}.`
}

export function analysisPayload(home: HistoricalTeam, away: HistoricalTeam) {
  return {
    disclaimer: "Pre-match analysis of two historical squads. Not a simulated result.",
    home: {
      id: home.id,
      name: home.clubName,
      season: home.displaySeason,
      manager: home.manager,
      formation: home.formation,
      overall: home.overallRating,
      styleTags: home.styleTags,
      ratings: {
        attack: home.attackRating,
        midfield: home.midfieldRating,
        defence: home.defenseRating,
        goalkeeper: home.goalkeeperRating,
        chemistry: home.chemistryRating,
        possession: home.possession,
        pressing: home.pressing,
        tempo: home.tempo,
        counterAttack: home.counterAttack,
        width: home.width,
        aerialThreat: home.aerialThreat,
      },
      xi: starters(home).map((player) => ({
        name: player.name,
        position: player.position,
        overall: player.overall,
      })),
      forwards: pick(home, ATTACK_POS, 4).map((player) => ({
        name: player.name,
        position: player.position,
        overall: player.overall,
        finishing: player.finishing,
        attack: player.attack,
      })),
      midfield: pick(home, MID_POS, 4).map((player) => ({
        name: player.name,
        position: player.position,
        overall: player.overall,
      })),
      defence: pick(home, DEF_POS, 4).map((player) => ({
        name: player.name,
        position: player.position,
        overall: player.overall,
      })),
      keeper: gk(home)
        ? { name: gk(home)!.name, overall: gk(home)!.overall }
        : null,
    },
    away: {
      id: away.id,
      name: away.clubName,
      season: away.displaySeason,
      manager: away.manager,
      formation: away.formation,
      overall: away.overallRating,
      styleTags: away.styleTags,
      ratings: {
        attack: away.attackRating,
        midfield: away.midfieldRating,
        defence: away.defenseRating,
        goalkeeper: away.goalkeeperRating,
        chemistry: away.chemistryRating,
        possession: away.possession,
        pressing: away.pressing,
        tempo: away.tempo,
        counterAttack: away.counterAttack,
        width: away.width,
        aerialThreat: away.aerialThreat,
      },
      xi: starters(away).map((player) => ({
        name: player.name,
        position: player.position,
        overall: player.overall,
      })),
      forwards: pick(away, ATTACK_POS, 4).map((player) => ({
        name: player.name,
        position: player.position,
        overall: player.overall,
        finishing: player.finishing,
        attack: player.attack,
      })),
      midfield: pick(away, MID_POS, 4).map((player) => ({
        name: player.name,
        position: player.position,
        overall: player.overall,
      })),
      defence: pick(away, DEF_POS, 4).map((player) => ({
        name: player.name,
        position: player.position,
        overall: player.overall,
      })),
      keeper: gk(away)
        ? { name: gk(away)!.name, overall: gk(away)!.overall }
        : null,
    },
  }
}

function compare(label: string, a: number, b: number, home: string, away: string): string {
  if (a >= b + 4) return `${home} hold a clear edge in ${label} (${a} vs ${b}).`
  if (b >= a + 4) return `${away} hold a clear edge in ${label} (${b} vs ${a}).`
  if (a >= b + 2) return `${home} are a shade stronger in ${label} (${a} vs ${b}).`
  if (b >= a + 2) return `${away} are a shade stronger in ${label} (${b} vs ${a}).`
  return `${label} is essentially level (${a} vs ${b}).`
}

export function templatePreMatchAnalysis(home: HistoricalTeam, away: HistoricalTeam): string {
  const homeFwd = pick(home, ATTACK_POS, 3)
  const awayFwd = pick(away, ATTACK_POS, 3)
  const homeMid = pick(home, MID_POS, 3)
  const awayMid = pick(away, MID_POS, 3)
  const homeDef = pick(home, DEF_POS, 3)
  const awayDef = pick(away, DEF_POS, 3)
  const homeGk = gk(home)
  const awayGk = gk(away)

  const possGap = home.possession - away.possession
  const pressGap = home.pressing - away.pressing
  const style =
    possGap >= 8
      ? `${home.clubName} should see more of the ball. ${away.clubName} are built to live without it and hurt on the break (counter ${away.counterAttack}).`
      : possGap <= -8
        ? `${away.clubName} should see more of the ball. ${home.clubName} are set up to absorb and spring (counter ${home.counterAttack}).`
        : `Neither side is a pure possession bully here. The matchup is a collision of similar territorial ideas, so the midfield duel decides who sets the rhythm.`

  const press =
    pressGap >= 8
      ? `${home.clubName} will hunt higher up the pitch (press ${home.pressing} vs ${away.pressing}). If the first wave sticks, ${away.clubName} have to play through smoke.`
      : pressGap <= -8
        ? `${away.clubName} bring the heavier press (press ${away.pressing} vs ${home.pressing}). ${home.clubName} need clean first passes out of the back.`
        : `Both sides press at a similar intensity. This is more about compactness and when to jump than about one team smothering the other.`

  const engineBits = [
    compare("attack", home.attackRating, away.attackRating, home.clubName, away.clubName),
    compare("midfield", home.midfieldRating, away.midfieldRating, home.clubName, away.clubName),
    compare("defence", home.defenseRating, away.defenseRating, home.clubName, away.clubName),
    compare("goalkeeping", home.goalkeeperRating, away.goalkeeperRating, home.clubName, away.clubName),
    compare("overall rating", home.overallRating, away.overallRating, home.clubName, away.clubName),
  ]

  const ovrGap = home.overallRating - away.overallRating
  const lean =
    Math.abs(ovrGap) <= 1
      ? "The model sees these squads as essentially even. A single seed should not pretend to settle the debate."
      : ovrGap > 0
        ? `${home.clubName} are the side the ratings lean toward, but the gap is not a script. Replay the fixture and the scoreline can move.`
        : `${away.clubName} are the side the ratings lean toward, but the gap is not a script. Replay the fixture and the scoreline can move.`

  return [
    "OPENING",
    `A historical simulator, not a recorded fixture: ${home.clubName} ${home.displaySeason} against ${away.clubName} ${away.displaySeason}. ${styleLine(home)} ${styleLine(away)}`,
    "STYLE CLASH",
    `${style} ${press} Width sits at ${home.width} versus ${away.width}; aerial threat ${home.aerialThreat} versus ${away.aerialThreat}. Tempo ${home.tempo} against ${away.tempo} tells you who wants the game stretched. Chemistry ${home.chemistryRating} vs ${away.chemistryRating} is the cohesion term — legendary sides usually have it.`,
    "FORWARD DUEL",
    `${home.clubName} attack through ${names(homeFwd)}. ${away.clubName} answer with ${names(awayFwd)}. This is the headline matchup: finishing quality against the other box, movement off the last line, and whether the wide forwards can isolate full-backs. Attack unit ratings: ${home.attackRating} vs ${away.attackRating}.`,
    "MIDFIELD CONTROL",
    `${home.clubName} midfield: ${names(homeMid)}. ${away.clubName}: ${names(awayMid)}. Whoever wins the centre decides whether this is a territorial squeeze or a transition fight. Midfield ratings ${home.midfieldRating} vs ${away.midfieldRating}. Look at the deepest midfielder on each side — that is where counters are born or buried.`,
    "DEFENCE AND KEEPERS",
    `${home.clubName} defensive spine: ${names(homeDef)}${homeGk ? `, with ${homeGk.name} (${homeGk.overall}) in goal` : ""}. ${away.clubName}: ${names(awayDef)}${awayGk ? `, ${awayGk.name} (${awayGk.overall}) behind them` : ""}. Defence ${home.defenseRating} vs ${away.defenseRating}; keeping ${home.goalkeeperRating} vs ${away.goalkeeperRating}. High-line sides will live or die on recovery pace. Low blocks will ask their centre-backs to win the first contact and their keeper to handle the second.`,
    "COACHING",
    `${home.manager} versus ${away.manager}. ${home.manager} has this ${home.clubName} side in a ${home.formation} built around ${home.styleTags.slice(0, 3).join(", ") || "balance"}. ${away.manager} answers with a ${away.formation} and ${away.styleTags.slice(0, 3).join(", ") || "a more mixed idea"}. Coaching here is encoded in shape, press and possession numbers — not in invented substitutions.`,
    "ENGINE READ",
    `${engineBits.join(" ")} ${lean} Run one match for a story. Run a hundred if you want the distribution.`,
  ].join("\n\n")
}

export async function generatePreMatchAnalysis(
  home: HistoricalTeam,
  away: HistoricalTeam,
): Promise<{ report: string; source: "ai" | "template" }> {
  const fallback = templatePreMatchAnalysis(home, away)
  const provider = createCommentaryProvider()
  if (!provider) return { report: fallback, source: "template" }

  try {
    const report = await provider.generate(ANALYSIS_SYSTEM_PROMPT, analysisPayload(home, away), {
      maxTokens: 1600,
    })
    return { report, source: "ai" }
  } catch (error) {
    console.error(
      "[ai-provider]",
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown provider error",
        feature: "analysis",
      }),
    )
    return { report: fallback, source: "template" }
  }
}
