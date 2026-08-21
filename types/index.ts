export interface Player {
  id: string
  name: string
  shortName: string
  position: string
  overall: number
  attack?: number
  passing?: number
  creativity?: number
  defending?: number
  physical?: number
  goalkeeping?: number
  finishing?: number
  chanceCreation?: number
}

export interface HistoricalTeam {
  id: string
  clubId: string
  clubName: string
  clubCode: string
  season: string
  displaySeason: string
  eraYear: number
  formation: string
  manager: string
  attackRating: number
  midfieldRating: number
  defenseRating: number
  goalkeeperRating: number
  chemistryRating: number
  overallRating: number
  tempo: number
  pressing: number
  possession: number
  counterAttack: number
  width: number
  aerialThreat: number
  players: Player[]
  startingXI: string[]
  achievements: string[]
  styleTags: string[]
  summary: string
  seoTitle: string
  seoDescription: string
}

export interface Club {
  id: string
  name: string
  code: string
  city: string
  country: string
}

export interface PrimeCandidate {
  teamId: string
  argument: string
}

export interface PrimeEntity {
  slug: string
  name: string
  kind: "club" | "player"
  title: string
  description: string
  seoTitle: string
  seoDescription: string
  candidates: PrimeCandidate[]
}

export type MatchEventType =
  | "goal"
  | "yellow"
  | "red"
  | "sub"
  | "save"
  | "chance"

export interface MatchEvent {
  minute: number
  displayMinute: string
  type: MatchEventType
  team: "home" | "away"
  player: string
  assist?: string
  playerIn?: string
  playerOut?: string
  detail?: string
}

export interface MatchStats {
  possession: [number, number]
  shots: [number, number]
  shotsOnTarget: [number, number]
  xg: [number, number]
  corners: [number, number]
  fouls: [number, number]
  yellowCards: [number, number]
  redCards: [number, number]
  passes: [number, number]
}

export interface SimulatedMatch {
  id: string
  seed: string
  homeTeamId: string
  awayTeamId: string
  homeTeam: string
  awayTeam: string
  score: { home: number; away: number }
  events: MatchEvent[]
  stats: MatchStats
  scorers: Array<{
    minute: number
    displayMinute: string
    player: string
    assist?: string
    team: "home" | "away"
  }>
  tacticalNotes: string[]
}

export interface MonteCarloResult {
  runs: number
  homeTeam: string
  awayTeam: string
  homeWins: number
  draws: number
  awayWins: number
  homeWinPct: number
  drawPct: number
  awayWinPct: number
  avgHomeGoals: number
  avgAwayGoals: number
  mostCommonScore: string
}

export interface CommentaryPayload {
  homeTeam: string
  awayTeam: string
  score: { home: number; away: number }
  events: Array<{
    minute: number
    type: string
    player: string
    team: string
    assist?: string
  }>
  stats: {
    possession: [number, number]
    shots: [number, number]
    xg: [number, number]
  }
  squads: {
    home: string[]
    away: string[]
  }
}
