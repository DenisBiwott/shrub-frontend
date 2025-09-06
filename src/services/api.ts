const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
console.log('API_BASE_URL:', API_BASE_URL);

export interface ApiPlayer {
  _id: string
  name: string
  totalPoints: number
  totalShrubs: number
  createdAt: string
  updatedAt: string
}

export interface ApiShrub {
  _id: string
  playerId: string | { _id: string; name: string }
  originalWord: string
  mispronunciation: string
  description?: string
  votes: number
  voters: string[]
  createdAt: string
  updatedAt: string
}

class ApiService {
  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API Error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  // Players
  async getPlayers(): Promise<ApiPlayer[]> {
    return this.fetch('/players')
  }

  async getLeaderboard(): Promise<ApiPlayer[]> {
    return this.fetch('/players/leaderboard')
  }

  async createPlayer(name: string, email?: string): Promise<ApiPlayer> {
    return this.fetch('/players', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
    })
  }

  async getPlayer(id: string): Promise<ApiPlayer> {
    return this.fetch(`/players/${id}`)
  }

  async getPlayerByName(name: string): Promise<ApiPlayer> {
    return this.fetch(`/players/name/${encodeURIComponent(name)}`)
  }

  // Shrubs
  async getShrubs(): Promise<ApiShrub[]> {
    return this.fetch('/shrubs')
  }

  async getTopShrubs(limit: number = 10): Promise<ApiShrub[]> {
    return this.fetch(`/shrubs/top?limit=${limit}`)
  }

  async createShrub(shrub: {
    playerId: string
    originalWord: string
    mispronunciation: string
    description?: string
  }): Promise<ApiShrub> {
    return this.fetch('/shrubs', {
      method: 'POST',
      body: JSON.stringify(shrub),
    })
  }

  async getShrubsByPlayer(playerId: string): Promise<ApiShrub[]> {
    return this.fetch(`/shrubs/player/${playerId}`)
  }

  // Voting
  async voteShrub(shrubId: string, voterId: string): Promise<{ success: boolean; votes: number }> {
    return this.fetch('/shrubs/vote', {
      method: 'POST',
      body: JSON.stringify({ shrubId, voterId }),
    })
  }

  async removeVote(shrubId: string, voterId: string): Promise<{ success: boolean; votes: number }> {
    return this.fetch('/shrubs/vote', {
      method: 'DELETE',
      body: JSON.stringify({ shrubId, voterId }),
    })
  }
}

export const apiService = new ApiService()