export interface Player {
  id: string
  name: string
  points: number
  latestShrub: string
  createdAt: Date
  trend: 'up' | 'down' | 'same'
  totalShrubs: number
}

export interface PlayerLeaderBoard {
  _id: string
  name: string
  shrubCount: number
  totalPoints: number
  voterCount: number
  rank: number
  latestShrub: string
}

export interface Shrub {
  id: string
  playerId: string
  originalWord: string
  mispronunciation: string
  description?: string
  votes: number
  voters: string[]
  timestamp: Date
}

export interface Vote {
  id: string
  shrubId: string
  voterId: string
  createdAt: Date
}

export interface LeaderboardState {
  players: Player[]
  loading: boolean
  error: string | null
  activeUsers: number
}
