import type { HistoricalTeam, Player, SimulatedMatch } from "@/types"
import { createCommentaryProvider } from "@/lib/ai/provider"
import { simulateMany } from "@/lib/simulation"
import { starters } from "@/lib/simulation/ratings"
import type { MonteCarloResult } from "@/types"

const ATTACK_POS = new Set(["ST", "CF", "LW", "RW", "SS", "CAM"])
const MID_POS = new Set(["CM", "CDM", "LCM", "RCM", "LDM", "RDM", "LM", "RM"])
const DEF_POS = new Set(["CB", "LB", "RB", "LCB", "RCB", "LWB", "RWB"])
const LEFT_POS = ["LW", "LM", "LAM", "LWB", "LB"]
const RIGHT_POS = ["RW", "RM", "RAM", "RWB", "RB"]

export const ANALYSIS_SYSTEM_PROMPT = `You write premium, fan-first matchup copy for a historical football team simulator.

Hard rules:
- Return valid JSON only, with exactly these string fields: headline, matchupStory, callTitle, callBody, decidingSequence, pressurePoint, openingPhase, keyDuel, coachingMove, chaosFactor, finalWord.
- headline: 6-14 words. Celebrate the collision of eras; no winner and no markdown.
- Every field except headline and callTitle must be a complete grammatical sentence, not a label or sentence fragment.
- matchupStory: maximum 42 words. Mention both full team seasons, both managers, and what makes their football identities collide.
- callTitle: 4-9 words. Make one match-specific football assertion. Never write "Too close to call", generic probability language, ratings, numbers or markdown.
- callBody: maximum 38 words. Use engineRead and narrativeGuide to make the call, but translate it into football. Name supplied players and identify the single tactical pattern most likely to tilt the game. Do not repeat win totals, percentages or ratings.
- decidingSequence: maximum 38 words. Describe one vivid, concrete sequence likely to decide the game, naming players from both supplied squads.
- pressurePoint: maximum 28 words. Identify one specific zone or unit where the matchup advantage is most likely to appear. Write a statement, not a question.
- openingPhase: maximum 42 words. Explain how the first 20 minutes are likely to look: who takes territory, how the press begins, and where the first clean progression comes from. Name at least two supplied players.
- keyDuel: maximum 42 words. Analyse one player-versus-player or player-versus-unit duel. Name both sides of the duel and explain the football mechanism in a complete sentence, not career status. Avoid declaring either player categorically better.
- coachingMove: maximum 42 words. Give the most plausible in-match adjustment for the manager whose initial plan is under greater pressure. Use the supplied formation and players; do not invent substitutions.
- chaosFactor: maximum 34 words. Identify the one variable that could break the model's expected pattern: set pieces, transition volume, goalkeeper performance, aerial play, or another input-supported detail. Name a supplied player or exact unit. Never use generic "mistakes" or "errors" as the answer.
- finalWord: maximum 34 words. End with a clear, memorable verdict naming the side with the better repeatable route and the decisive supplied player or tactical mechanism, then state the specific counter-pattern that could reverse it. No percentages or generic hedging.
- This is NOT a match report. Do not invent scorers, cards, events or statistics.
- Never invent players who are not in the supplied squads.
- Never claim this was a real historical fixture. These sides may be from different eras.
- Ratings are era-relative: a 95 in 1970 is greatness in 1970, not a claim about modern athleticism.
- Judge this team-vs-team matchup without ranking players' careers or settling GOAT debates.
- Match the force of the language to narrativeGuide.tier. For "overwhelming", write a commanding forecast: the favourite can overwhelm, suffocate, swarm, tear open, turn the match into a siege, or make it a survival test. Do not soften a major mismatch into "could control large spells", "may have an edge", or "could create chances". For "strong", make the favourite and repeatable route unmistakable. For "competitive", stay balanced without writing "too close to call".
- A commanding forecast is not a guarantee. Preserve one credible underdog escape route in chaosFactor or finalWord, but do not let that counter-pattern dilute callTitle or callBody.
- Follow narrativeGuide.primaryThreats and engineRead.topScorers/topAssists. In a mismatch, the dominant side's elite forwards and main creators must be the story. At least two of callBody, decidingSequence, openingPhase and keyDuel must name a primaryThreat. If a famous front two or front three lead the scoring model, foreground that combination.
- Flank duels MUST be taken from matchupGeometry. A left-sided attacker faces the opponent's right-sided defender. Never pair two left-sided or two right-sided players from opposite teams as a duel.
- decidingSequence is a plausible pattern, not a dated event. Do not invent a specific clock time, scorer or save that is not in representativeNight.
- representativeNight is the displayed scoreline (the most common score across 100 worlds). callTitle and callBody must not contradict it: if the score is a draw, do not write as if one side already won the night.
- Full-backs and supporting defenders may explain width, but must not take over the report. Do not name the same non-primary player in more than one of decidingSequence, openingPhase, keyDuel and coachingMove unless engineRead lists that player among the top two creators.
- Avoid categorical player-ranking claims and insults. Never use: unstoppable, cannot cope, no answer, destroy, outclass, superior, easy win, definitely, will punish. "Overwhelm" describes a projected team pattern and is allowed only for an overwhelming tier.
- Sound like the opening of a great Champions League broadcast: vivid, specific, decisive and respectful. No markdown and no headings.

The JSON is the source of truth.`

export interface AnalysisCopy {
  headline: string
  matchupStory: string
  callTitle: string
  callBody: string
  decidingSequence: string
  pressurePoint: string
  openingPhase: string
  keyDuel: string
  coachingMove: string
  chaosFactor: string
  finalWord: string
}

export interface PreMatchAnalysis {
  copy: AnalysisCopy
  featuredMatch: SimulatedMatch
  simulation: MonteCarloResult
}

function representativeNight(matches: SimulatedMatch[], simulation: MonteCarloResult): SimulatedMatch {
  const lean = simulation.homeWins - simulation.awayWins
  const desired = lean >= 5 ? "home" : lean <= -5 ? "away" : "any"
  const outcomeOf = (match: SimulatedMatch) =>
    match.score.home === match.score.away ? "draw" : match.score.home > match.score.away ? "home" : "away"
  const leanMatches = desired === "any" ? matches : matches.filter((match) => outcomeOf(match) === desired)
  const pool = leanMatches.length > 0 ? leanMatches : matches
  const counts = new Map<string, number>()
  for (const match of pool) {
    const key = `${match.score.home}-${match.score.away}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  const modal = [...counts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))[0]?.[0]
  const [homeGoals, awayGoals] = (modal ?? simulation.mostCommonScore).split("-").map((value) => Number(value))
  return (
    pool.find((match) => match.score.home === homeGoals && match.score.away === awayGoals) ??
    pool[0] ??
    matches[0]!
  )
}

function flankSide(position: string): "left" | "right" | "central" {
  if (LEFT_POS.includes(position) || position === "LCB" || position === "LCM" || position === "LDM") return "left"
  if (RIGHT_POS.includes(position) || position === "RCB" || position === "RCM" || position === "RDM") return "right"
  return "central"
}

function flankAttacker(team: HistoricalTeam, side: "left" | "right"): Player | undefined {
  const xi = starters(team)
  const order = side === "left" ? ["LW", "LM", "LAM"] : ["RW", "RM", "RAM"]
  for (const position of order) {
    const player = xi.find((item) => item.position === position)
    if (player) return player
  }
  return xi.find((item) => flankSide(item.position) === side && ATTACK_POS.has(item.position))
}

function flankDefender(team: HistoricalTeam, side: "left" | "right"): Player | undefined {
  const xi = starters(team)
  const order = side === "left" ? ["LB", "LWB"] : ["RB", "RWB"]
  for (const position of order) {
    const player = xi.find((item) => item.position === position)
    if (player) return player
  }
  return xi.find((item) => flankSide(item.position) === side && DEF_POS.has(item.position))
}

function describeDuel(attacker: Player | undefined, defender: Player | undefined): string {
  if (!attacker || !defender) return "no clear wide pairing"
  return `${attacker.name} (${attacker.position}) attacks ${defender.name} (${defender.position})`
}

function centralNames(team: HistoricalTeam): string {
  const mids = starters(team).filter((player) =>
    ["CM", "CDM", "CAM", "LCM", "RCM", "LDM", "RDM"].includes(player.position),
  )
  return mids.map((player) => player.name).join(", ") || "central midfield"
}

function matchupGeometry(home: HistoricalTeam, away: HistoricalTeam) {
  return {
    note: "Positions mirror across the halfway line. A left-sided attacker faces the opponent's right-sided defender.",
    homeLeftVsAwayRight: describeDuel(flankAttacker(home, "left"), flankDefender(away, "right")),
    homeRightVsAwayLeft: describeDuel(flankAttacker(home, "right"), flankDefender(away, "left")),
    awayLeftVsHomeRight: describeDuel(flankAttacker(away, "left"), flankDefender(home, "right")),
    awayRightVsHomeLeft: describeDuel(flankAttacker(away, "right"), flankDefender(home, "left")),
    centralZone: `${centralNames(home)} against ${centralNames(away)}`,
  }
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

export function analysisPayload(
  home: HistoricalTeam,
  away: HistoricalTeam,
  simulation?: MonteCarloResult,
  featuredMatch?: SimulatedMatch,
) {
  const leaderIsHome = simulation ? simulation.homeWins >= simulation.awayWins : home.overallRating >= away.overallRating
  const leader = leaderIsHome ? home : away
  const trailer = leaderIsHome ? away : home
  const leaderWins = simulation ? (leaderIsHome ? simulation.homeWins : simulation.awayWins) : 0
  const trailerWins = simulation ? (leaderIsHome ? simulation.awayWins : simulation.homeWins) : 0
  const winGap = leaderWins - trailerWins
  const tier = leaderWins >= 65 && winGap >= 35 ? "overwhelming" : leaderWins >= 55 && winGap >= 20 ? "strong" : "competitive"
  const leaderScorers = simulation ? (leaderIsHome ? simulation.topScorers.home : simulation.topScorers.away) : []
  const leaderAssists = simulation ? (leaderIsHome ? simulation.topAssists.home : simulation.topAssists.away) : []
  const topAttackers = pick(leader, ATTACK_POS, 3).map((player) => player.name)
  const primaryThreats = [
    ...new Set([
      ...topAttackers.slice(0, 2),
      ...leaderScorers.slice(0, 3).map((row) => row.player),
      ...leaderAssists.slice(0, 2).map((row) => row.player),
    ]),
  ]
  const featuredOutcome =
    !featuredMatch
      ? undefined
      : featuredMatch.score.home === featuredMatch.score.away
        ? "draw"
        : featuredMatch.score.home > featuredMatch.score.away
          ? "home"
          : "away"
  return {
    disclaimer: "Pre-match analysis of two historical squads. Not a simulated result.",
    matchupGeometry: matchupGeometry(home, away),
    representativeNight: featuredMatch
      ? {
          score: featuredMatch.score,
          outcome: featuredOutcome,
          scorers: featuredMatch.scorers.map((goal) => ({
            minute: goal.minute,
            player: goal.player,
            team: goal.team,
            assist: goal.assist,
          })),
        }
      : undefined,
    engineRead: simulation
      ? {
          runs: simulation.runs,
          homeWins: simulation.homeWins,
          draws: simulation.draws,
          awayWins: simulation.awayWins,
          mostCommonScore: simulation.mostCommonScore,
          avgGoals: [simulation.avgHomeGoals, simulation.avgAwayGoals],
          avgXg: [simulation.avgHomeXg, simulation.avgAwayXg],
          avgPossession: [simulation.avgHomePoss, simulation.avgAwayPoss],
          topScorers: {
            home: simulation.topScorers.home,
            away: simulation.topScorers.away,
          },
          topAssists: {
            home: simulation.topAssists.home,
            away: simulation.topAssists.away,
          },
        }
      : undefined,
    narrativeGuide: {
      tier,
      favourite: leader.clubName,
      underdog: trailer.clubName,
      winGap,
      primaryThreats,
      instruction: tier === "overwhelming"
        ? `${leader.clubName} are a heavy favourite in the model. Make ${primaryThreats.slice(0, 3).join(", ")} the attacking centre of the forecast and describe the likely territorial or scoring pressure with conviction.`
        : tier === "strong"
          ? `${leader.clubName} have the clearer repeatable route. State it directly and centre the supplied primary threats.`
          : "The matchup remains competitive. Choose a specific tactical lean rather than hiding behind generic balance.",
    },
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

function shortFallback(home: HistoricalTeam, away: HistoricalTeam, simulation: MonteCarloResult): AnalysisCopy {
  const homeCore = starters(home).sort(byOverall).slice(0, 3)
  const awayCore = starters(away).sort(byOverall).slice(0, 3)
  const homeNames = homeCore.map((player) => player.name)
  const awayNames = awayCore.map((player) => player.name)
  const close = Math.abs(simulation.homeWins - simulation.awayWins) <= 5
  const leader = simulation.homeWins >= simulation.awayWins ? home : away
  const leaderNames = simulation.homeWins >= simulation.awayWins ? homeNames : awayNames
  const leaderWins = Math.max(simulation.homeWins, simulation.awayWins)
  const trailerWins = Math.min(simulation.homeWins, simulation.awayWins)
  const overwhelming = leaderWins >= 65 && leaderWins - trailerWins >= 35
  const strong = leaderWins >= 55 && leaderWins - trailerWins >= 20

  return {
    headline: "Two great eras, one match they never got to play",
    matchupStory: `${home.manager}'s ${home.clubName} ${home.displaySeason} bring ${home.styleTags[0] ?? "their defining style"}; ${away.manager}'s ${away.clubName} ${away.displaySeason} answer with ${away.styleTags[0] ?? "a different rhythm"}.`,
    callTitle: close ? "The first broken line decides it" : overwhelming ? `${leader.clubName} turn this into a siege` : strong ? `${leader.clubName} own the clearer route` : `${leader.clubName}'s transition tilts the night`,
    callBody: close
      ? `${homeNames[0]} and ${awayNames[0]} headline it, but the decisive detail is which midfield plays through the first press and releases its front line facing goal.`
      : overwhelming
        ? `${leaderNames.slice(0, 3).join(", ")} give ${leader.clubName} too many elite routes through the final third; the likeliest pattern is sustained pressure rather than a narrow territorial edge.`
        : `${leaderNames[1] ?? leaderNames[0]} finding ${leaderNames[0]} before the opposing block resets is the repeatable pattern that gives ${leader.clubName} the sharper route to goal.`,
    decidingSequence: `${homeNames[1] ?? homeNames[0]} looks for ${homeNames[0]}, while ${awayNames[1] ?? awayNames[0]}'s first forward pass releases ${awayNames[0]} into the space left behind.`,
    pressurePoint: `The space around the two midfields is where ${home.formation} and ${away.formation} stop being shapes and become a direct duel.`,
    openingPhase: `${home.manager}'s first test is whether ${homeNames[1] ?? homeNames[0]} can establish possession before ${awayNames[1] ?? awayNames[0]} turns the opening exchanges into a transition game.`,
    keyDuel: `${homeNames[0]} attacking the space around ${awayNames[2] ?? awayNames[0]} is the sharpest individual contest; the response depends on cover arriving before the final action, not on either name alone.`,
    coachingMove: `${leader.manager} can protect the model's preferred route by keeping the ${leader.formation} compact and giving ${leaderNames[0]} earlier support rather than adding more bodies to the last line.`,
    chaosFactor: `A set piece or an exceptional goalkeeper night could pull this away from the repeatable open-play pattern seen across the simulations.`,
    finalWord: overwhelming
      ? `${leader.clubName} should make their attacking depth count through ${leaderNames.slice(0, 3).join(", ")}; the underdog's escape requires an exceptional goalkeeper night and a clinical first transition.`
      : `${leader.clubName} own the cleaner repeatable route through ${leaderNames[0]}, but the margin survives only while they control the space around the first broken midfield line.`,
  }
}

function cleanCopy(value: string, maxLength: number): string {
  const text = value
    .replace(/^[\s#>*_`-]+/, "")
    .replace(/[*_`#]/g, "")
    .replace(/\bwill punish\b/gi, "could test")
    .replace(/\bcannot cope\b/gi, "may find it difficult")
    .replace(/\b(?:can't|cannot) handle\b/gi, "may struggle to contain")
    .replace(/\b(?:nobody|no one) can stop\b/gi, "few defenders would enjoy facing")
    .replace(/\bcannot\b/gi, "may not")
    .replace(/\bcan't\b/gi, "may not")
    .replace(/\bnobody\b/gi, "few players")
    .replace(/\bno one\b/gi, "few players")
    .replace(/\bcarve apart\b/gi, "stretch")
    .replace(/\boutclass(?:es|ed)?\b/gi, "hold an edge over")
    .replace(/\bunstoppable\b/gi, "a major threat")
    .replace(/\bsuperior\b/gi, "stronger in this matchup")
    .replace(/\bdefinitely\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
  if (text.length <= maxLength) return text
  const sliced = text.slice(0, maxLength)
  const sentence = sliced.lastIndexOf(".")
  if (sentence >= maxLength * 0.5) return sliced.slice(0, sentence + 1).trim()
  const space = sliced.lastIndexOf(" ")
  return (space > 0 ? sliced.slice(0, space) : sliced).trim()
}

function parseAnalysisCopy(raw: string): AnalysisCopy | null {
  try {
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "")
    const value = JSON.parse(cleaned) as Partial<AnalysisCopy>
    const fields: Array<keyof AnalysisCopy> = ["headline", "matchupStory", "callTitle", "callBody", "decidingSequence", "pressurePoint", "openingPhase", "keyDuel", "coachingMove", "chaosFactor", "finalWord"]
    if (!fields.every((field) => typeof value[field] === "string" && value[field]!.trim())) return null
    const copy = {
      headline: cleanCopy(value.headline!, 120),
      matchupStory: cleanCopy(value.matchupStory!, 360),
      callTitle: cleanCopy(value.callTitle!, 100),
      callBody: cleanCopy(value.callBody!, 300),
      decidingSequence: cleanCopy(value.decidingSequence!, 320),
      pressurePoint: cleanCopy(value.pressurePoint!, 240),
      openingPhase: cleanCopy(value.openingPhase!, 360),
      keyDuel: cleanCopy(value.keyDuel!, 360),
      coachingMove: cleanCopy(value.coachingMove!, 360),
      chaosFactor: cleanCopy(value.chaosFactor!, 300),
      finalWord: cleanCopy(value.finalWord!, 300),
    }
    const banned = /\b(?:unstoppable|cannot|can't|nobody|no one|destroy|outclass|superior|definitely)\b/i
    if (Object.values(copy).some((text) => banned.test(text))) return null
    return copy
  } catch {
    return null
  }
}

function respectsNarrativeHierarchy(
  copy: AnalysisCopy,
  home: HistoricalTeam,
  away: HistoricalTeam,
  simulation: MonteCarloResult,
): boolean {
  const leaderIsHome = simulation.homeWins >= simulation.awayWins
  const scorers = leaderIsHome ? simulation.topScorers.home : simulation.topScorers.away
  const assists = leaderIsHome ? simulation.topAssists.home : simulation.topAssists.away
  const leader = leaderIsHome ? home : away
  const topAttackers = pick(leader, ATTACK_POS, 3).map((player) => player.name.toLocaleLowerCase())
  const primary = new Set(
    [
      ...topAttackers.slice(0, 2),
      ...scorers.slice(0, 3).map((row) => row.player),
      ...assists.slice(0, 2).map((row) => row.player),
    ].map((name) => name.toLocaleLowerCase()),
  )
  const focusFields = [copy.callBody, copy.decidingSequence, copy.openingPhase, copy.keyDuel]
    .map((text) => text.toLocaleLowerCase())
  const focused = focusFields.filter((text) => [...primary].some((name) => text.includes(name))).length
  if (focused < 2) return false

  const supportingPlayers = [...starters(home), ...starters(away)]
    .filter((player) => !primary.has(player.name.toLocaleLowerCase()))
  return supportingPlayers.every((player) => {
    const name = player.name.toLocaleLowerCase()
    return focusFields.filter((text) => text.includes(name)).length <= 1
  })
}

function namedStarters(
  text: string,
  home: HistoricalTeam,
  away: HistoricalTeam,
): Array<{ team: "home" | "away"; player: Player }> {
  const found: Array<{ team: "home" | "away"; player: Player }> = []
  const lower = text.toLocaleLowerCase()
  for (const player of starters(home)) {
    if (lower.includes(player.name.toLocaleLowerCase())) found.push({ team: "home", player })
  }
  for (const player of starters(away)) {
    if (lower.includes(player.name.toLocaleLowerCase())) found.push({ team: "away", player })
  }
  return found
}

function respectsGeometry(copy: AnalysisCopy, home: HistoricalTeam, away: HistoricalTeam): boolean {
  const fields = [copy.keyDuel, copy.decidingSequence, copy.coachingMove, copy.pressurePoint]
  for (const field of fields) {
    const named = namedStarters(field, home, away)
    const homeWide = named.filter((item) => item.team === "home" && flankSide(item.player.position) !== "central")
    const awayWide = named.filter((item) => item.team === "away" && flankSide(item.player.position) !== "central")
    for (const homePlayer of homeWide) {
      for (const awayPlayer of awayWide) {
        if (flankSide(homePlayer.player.position) === flankSide(awayPlayer.player.position)) return false
      }
    }
  }
  return true
}

function contradictsRepresentativeScore(copy: AnalysisCopy, match: SimulatedMatch): boolean {
  if (match.score.home !== match.score.away) return false
  const claim =
    /\b(?:win the day|wins the night|prove[sd]? decisive|turn this into (?:an attacking )?siege|own the (?:clearer|night))\b/i
  return claim.test(copy.callTitle) || claim.test(copy.callBody)
}

function strengthenDominantCall(
  copy: AnalysisCopy,
  home: HistoricalTeam,
  away: HistoricalTeam,
  simulation: MonteCarloResult,
): AnalysisCopy {
  const leaderIsHome = simulation.homeWins >= simulation.awayWins
  const leaderWins = leaderIsHome ? simulation.homeWins : simulation.awayWins
  const trailerWins = leaderIsHome ? simulation.awayWins : simulation.homeWins
  if (leaderWins < 65 || leaderWins - trailerWins < 35) return copy

  const weakTitle = /\b(?:edge|control|impose|rhythm|favourite|favou?red|tilt|narrow|slight|could|may|might)\b/i
  if (!weakTitle.test(copy.callTitle)) return copy
  const leader = leaderIsHome ? home : away
  return { ...copy, callTitle: `${leader.clubName} turn this into an attacking siege` }
}

export async function generatePreMatchAnalysis(
  home: HistoricalTeam,
  away: HistoricalTeam,
): Promise<{ analysis: PreMatchAnalysis; source: "ai" | "template" }> {
  const requestSeed = `ai-analysis:${home.id}:${away.id}:${crypto.randomUUID()}`
  const { matches, ...simulation } = simulateMany(home, away, 100, `${requestSeed}:alternates`, {
    retainMatches: true,
  })
  const featuredMatch = representativeNight(matches, simulation)
  const fallback = shortFallback(home, away, simulation)
  const provider = createCommentaryProvider()
  if (!provider) return { analysis: { copy: fallback, featuredMatch, simulation }, source: "template" }

  const payload = analysisPayload(home, away, simulation, featuredMatch)
  let lastError: unknown
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const raw = await provider.generate(ANALYSIS_SYSTEM_PROMPT, payload, {
        maxTokens: 760,
        temperature: 0.5,
      })
      const parsedCopy = parseAnalysisCopy(raw)
      if (!parsedCopy) throw new Error("AI provider returned invalid analysis JSON")
      if (!respectsNarrativeHierarchy(parsedCopy, home, away, simulation)) {
        throw new Error("AI provider returned unfocused analysis JSON")
      }
      if (!respectsGeometry(parsedCopy, home, away)) {
        throw new Error("AI provider returned geometrically inconsistent analysis JSON")
      }
      if (contradictsRepresentativeScore(parsedCopy, featuredMatch)) {
        throw new Error("AI provider contradicted the representative scoreline")
      }
      const copy = strengthenDominantCall(parsedCopy, home, away, simulation)
      return { analysis: { copy, featuredMatch, simulation }, source: "ai" }
    } catch (error) {
      lastError = error
    }
  }

  console.error(
    "[ai-provider]",
    JSON.stringify({
      error: lastError instanceof Error ? lastError.message : "Unknown provider error",
      feature: "analysis",
    }),
  )
  return { analysis: { copy: fallback, featuredMatch, simulation }, source: "template" }
}
