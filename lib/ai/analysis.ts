import type { HistoricalTeam, Player } from "@/types"
import { createCommentaryProvider } from "@/lib/ai/provider"
import { simulateMany } from "@/lib/simulation"
import { starters } from "@/lib/simulation/ratings"
import type { MonteCarloResult } from "@/types"

const ATTACK_POS = new Set(["ST", "CF", "LW", "RW", "SS", "CAM"])
const MID_POS = new Set(["CM", "CDM", "CAM", "LCM", "RCM", "LDM", "RDM", "LM", "RM"])
const DEF_POS = new Set(["CB", "LB", "RB", "LCB", "RCB", "LWB", "RWB"])

export const ANALYSIS_SYSTEM_PROMPT = `You write premium, fan-first matchup copy for a historical football team simulator.

Hard rules:
- Return valid JSON only, with exactly these string fields: headline, matchupStory, hinge, homeRoute, awayRoute.
- headline: 6-14 words. Celebrate the collision of eras; no winner and no markdown.
- matchupStory: maximum 42 words. Mention both full team seasons, both managers, and what makes their football identities collide.
- hinge: maximum 28 words. Describe the tactical question that could swing the matchup.
- homeRoute: maximum 32 words. Describe how the home side could win, naming at least two supplied home players.
- awayRoute: maximum 32 words. Describe how the away side could win, naming at least two supplied away players.
- This is NOT a match report. Do not invent scorers, cards, events or statistics.
- Never invent players who are not in the supplied squads.
- Never claim this was a real historical fixture. These sides may be from different eras.
- Ratings are era-relative: a 95 in 1970 is greatness in 1970, not a claim about modern athleticism.
- Give both fanbases a credible route to victory. Do not rank players' careers or settle GOAT debates.
- Avoid absolutes and insults. Never use: unstoppable, cannot cope, no answer, destroy, carve apart, outclass, superior, easy win, definitely, will punish.
- Sound like the opening of a great Champions League broadcast: vivid, specific and respectful. No markdown and no headings.

The JSON is the source of truth.`

export interface AnalysisCopy {
  headline: string
  matchupStory: string
  hinge: string
  homeRoute: string
  awayRoute: string
}

export interface PreMatchAnalysis {
  copy: AnalysisCopy
  simulation: MonteCarloResult
}

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
      fullName: `${home.clubName} ${home.displaySeason}`,
      season: home.displaySeason,
      manager: home.manager,
      formation: home.formation,
      summary: home.summary,
      achievements: home.achievements,
      trophies: home.trophies.map((trophy) => trophy.label),
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
      fullName: `${away.clubName} ${away.displaySeason}`,
      season: away.displaySeason,
      manager: away.manager,
      formation: away.formation,
      summary: away.summary,
      achievements: away.achievements,
      trophies: away.trophies.map((trophy) => trophy.label),
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

function shortFallback(home: HistoricalTeam, away: HistoricalTeam): AnalysisCopy {
  const homeCore = starters(home).sort(byOverall).slice(0, 3)
  const awayCore = starters(away).sort(byOverall).slice(0, 3)
  const homeNames = homeCore.map((player) => player.name)
  const awayNames = awayCore.map((player) => player.name)

  return {
    headline: "Two great eras, one match they never got to play",
    matchupStory: `${home.manager}'s ${home.clubName} ${home.displaySeason} bring ${home.styleTags[0] ?? "their defining style"}; ${away.manager}'s ${away.clubName} ${away.displaySeason} answer with ${away.styleTags[0] ?? "a different rhythm"}.`,
    hinge: `${home.clubName}'s ${home.formation} against ${away.clubName}'s ${away.formation}: whichever midfield escapes pressure first can shape the night.`,
    homeRoute: `${homeNames.slice(0, 2).join(" and ")} give ${home.clubName} a route through control, timing and the final pass.`,
    awayRoute: `${awayNames.slice(0, 2).join(" and ")} give ${away.clubName} a route through movement, transition and decisive moments.`,
  }
}

function cleanCopy(value: string, maxLength: number): string {
  return value
    .replace(/^[\s#>*_`-]+/, "")
    .replace(/[*_`#]/g, "")
    .replace(/\bwill punish\b/gi, "could test")
    .replace(/\bwill\b/gi, "could")
    .replace(/\bcannot cope\b/gi, "may find it difficult")
    .replace(/\b(?:can't|cannot) handle\b/gi, "may struggle to contain")
    .replace(/\b(?:nobody|no one) can stop\b/gi, "few defenders would enjoy facing")
    .replace(/\bcarve apart\b/gi, "stretch")
    .replace(/\boutclass(?:es|ed)?\b/gi, "hold an edge over")
    .replace(/\bunstoppable\b/gi, "a major threat")
    .replace(/\bsuperior\b/gi, "stronger in this matchup")
    .replace(/\bdefinitely\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
}

function mentionsAtLeastTwoStarters(text: string, team: HistoricalTeam): boolean {
  const normalized = text.toLocaleLowerCase()
  const mentioned = starters(team).filter((player) => {
    const tokens = player.name.toLocaleLowerCase().split(/\s+/)
    const surname = tokens.at(-1) ?? player.name.toLocaleLowerCase()
    return normalized.includes(surname)
  })
  return mentioned.length >= 2
}

function parseAnalysisCopy(raw: string, home: HistoricalTeam, away: HistoricalTeam): AnalysisCopy | null {
  try {
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "")
    const value = JSON.parse(cleaned) as Partial<AnalysisCopy>
    const fields: Array<keyof AnalysisCopy> = ["headline", "matchupStory", "hinge", "homeRoute", "awayRoute"]
    if (!fields.every((field) => typeof value[field] === "string" && value[field]!.trim())) return null
    const copy = {
      headline: cleanCopy(value.headline!, 120),
      matchupStory: cleanCopy(value.matchupStory!, 360),
      hinge: cleanCopy(value.hinge!, 240),
      homeRoute: cleanCopy(value.homeRoute!, 280),
      awayRoute: cleanCopy(value.awayRoute!, 280),
    }
    const banned = /\b(?:will|unstoppable|cannot|can't|nobody|no one|destroy|outclass|superior|definitely)\b/i
    if (Object.values(copy).some((text) => banned.test(text))) return null
    const story = copy.matchupStory.toLocaleLowerCase()
    if (!story.includes(home.displaySeason.toLocaleLowerCase()) || !story.includes(away.displaySeason.toLocaleLowerCase())) return null
    if (!mentionsAtLeastTwoStarters(copy.homeRoute, home) || !mentionsAtLeastTwoStarters(copy.awayRoute, away)) return null
    return copy
  } catch {
    return null
  }
}

export async function generatePreMatchAnalysis(
  home: HistoricalTeam,
  away: HistoricalTeam,
): Promise<{ analysis: PreMatchAnalysis; source: "ai" | "template" }> {
  const fallback = shortFallback(home, away)
  const simulation = simulateMany(home, away, 100, `ai-analysis:${home.id}:${away.id}`)
  const provider = createCommentaryProvider()
  if (!provider) return { analysis: { copy: fallback, simulation }, source: "template" }

  try {
    const raw = await provider.generate(ANALYSIS_SYSTEM_PROMPT, analysisPayload(home, away), {
      maxTokens: 420,
      temperature: 0.5,
    })
    const copy = parseAnalysisCopy(raw, home, away)
    if (!copy) throw new Error("AI provider returned invalid analysis JSON")
    return { analysis: { copy, simulation }, source: "ai" }
  } catch (error) {
    console.error(
      "[ai-provider]",
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown provider error",
        feature: "analysis",
      }),
    )
    return { analysis: { copy: fallback, simulation }, source: "template" }
  }
}
