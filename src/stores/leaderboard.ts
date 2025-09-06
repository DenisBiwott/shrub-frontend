import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Player, LeaderboardState } from '@/types'
import { apiService } from '@/services/api'

export const useLeaderboardStore = defineStore('leaderboard', () => {
  const players = ref<Player[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const activeUsers = ref(247)

  // Mock data for development
  const mockPlayers: Player[] = [
    {
      id: '1',
      name: 'ShrubMaster3000',
      points: 15420,
      latestShrub: 'Absolutely instead of Obviously',
      createdAt: new Date('2024-01-15'),
      trend: 'up',
      totalShrubs: 154,
    },
    {
      id: '2',
      name: 'WordWrangler',
      points: 14230,
      latestShrub: 'Refrigerator instead of Elevator',
      createdAt: new Date('2024-01-10'),
      trend: 'same',
      totalShrubs: 142,
    },
    {
      id: '3',
      name: 'PronunciationPro',
      points: 13890,
      latestShrub: 'Chocolate instead of Hospital',
      createdAt: new Date('2024-01-12'),
      trend: 'up',
      totalShrubs: 139,
    },
    {
      id: '4',
      name: 'You',
      points: 12150,
      latestShrub: 'Spaghetti instead of Especially',
      createdAt: new Date('2024-01-18'),
      trend: 'up',
      totalShrubs: 122,
    },
    {
      id: '5',
      name: 'VowelVoyager',
      points: 11780,
      latestShrub: 'Butterfly instead of Beautiful',
      createdAt: new Date('2024-01-14'),
      trend: 'down',
      totalShrubs: 118,
    },
  ]

  const sortedPlayers = computed(() => {
    return [...players.value].sort((a, b) => b.points - a.points)
  })

  const currentUserRank = computed(() => {
    const currentUser = sortedPlayers.value.find((p) => p.name === 'You')
    return currentUser ? sortedPlayers.value.indexOf(currentUser) + 1 : null
  })

  function initializeMockData() {
    players.value = mockPlayers
  }

  async function fetchPlayers() {
    loading.value = true
    error.value = null

    try {
      // For now, use mock data
      await new Promise((resolve) => setTimeout(resolve, 500))
      players.value = mockPlayers
    } catch (err) {
      error.value = 'Failed to fetch players'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function addPlayer(name: string) {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      points: 0,
      latestShrub: '',
      createdAt: new Date(),
      trend: 'same',
      totalShrubs: 0,
    }
    players.value.push(newPlayer)
  }

  function recordShrub(playerId: string, word: string, points: number = 1) {
    const player = players.value.find((p) => p.id === playerId)
    if (player) {
      player.points += points
      player.latestShrub = word
      player.totalShrubs += 1
      player.trend = 'up'
    }
  }

  function updatePlayer(id: string, data: Partial<Player>) {
    const index = players.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      players.value[index] = { ...players.value[index], ...data }
    }
  }

  function deletePlayer(id: string) {
    const index = players.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      players.value.splice(index, 1)
    }
  }

  return {
    players,
    loading,
    error,
    activeUsers,
    sortedPlayers,
    currentUserRank,
    initializeMockData,
    fetchPlayers,
    addPlayer,
    recordShrub,
    updatePlayer,
    deletePlayer,
  }
})
