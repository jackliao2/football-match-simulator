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
  nation?: string
}

export type TeamKind = "club" | "nation"

export type TrophyCode = "ucl" | "el" | "league" | "cup" | "world-cup" | "euros" | "copa"

export interface Trophy {
  code: TrophyCode
  label: string
}

export interface HistoricalTeam {
  id: string
  kind: TeamKind
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
  trophies: Trophy[]
  achievements: string[]
  styleTags: string[]
  summary: string
  seoTitle: string
  seoDescription: string
}

export type ClubLeague =
  | "premier-league"
  | "la-liga"
  | "serie-a"
  | "bundesliga"
  | "ligue-1"
  | "liga-portugal"
  | "eredivisie"
  | "scottish"
  | "other-europe"
  | "south-america"

export type NationRegion = "europe" | "south-america" | "africa" | "concacaf" | "asia"

export interface Club {
  id: string
  name: string
  code: string
  city: string
  country: string
  kind?: TeamKind
  league?: ClubLeague
  region?: NationRegion
}

export interface PrimeCandidate {
  teamId: string
  argument: string
}

export interface PrimeEntity {
  slug: string
  name: string
    kind: "club" | "nation" | "player"
  title: string
  description: string
  seoTitle: string
    seoDescription: string
    verdict: string
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
  scorelines: Array<{ score: string; count: number; pct: number }>
  homeClub: string
  awayClub: string
  topScorers: {
    home: Array<{ player: string; goals: number }>
    away: Array<{ player: string; goals: number }>
  }
  samples: Array<{ home: number; away: number }>
  avgHomeXg: number
  avgAwayXg: number
  avgHomeShots: number
  avgAwayShots: number
  avgHomePoss: number
  avgAwayPoss: number
  bttsPct: number
  over25Pct: number
  homeCleanPct: number
  awayCleanPct: number
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
