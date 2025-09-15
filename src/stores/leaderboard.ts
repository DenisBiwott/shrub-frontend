import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Player, PlayerLeaderBoard } from '@/types'
import { apiService } from '@/services/api'

export const useLeaderboardStore = defineStore('leaderboard', () => {
  const players = ref<Player[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const activeUsers = ref(247)
  const playerLeaderBoard = ref<PlayerLeaderBoard[]>([])

  const sortedPlayers = computed(() => {
    return [...players.value].sort((a, b) => b.points - a.points)
  })

  const currentUserRank = computed(() => {
    const currentUser = sortedPlayers.value.find((p) => p.name === 'You')
    return currentUser ? sortedPlayers.value.indexOf(currentUser) + 1 : null
  })

  async function fetchPlayers() {
    loading.value = true
    error.value = null

    try {
      // Eventually wire APIs
      players.value = []
    } catch (err) {
      error.value = 'Failed to fetch players'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Fetch player leaderboard
  async function fetchPlayerLeaderBoard() {
    loading.value = true
    error.value = null
    try {
      playerLeaderBoard.value = await apiService.getPlayerLeaderBoard()
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch player leaderboard'
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
    playerLeaderBoard,
    fetchPlayers,
    addPlayer,
    recordShrub,
    updatePlayer,
    deletePlayer,
    fetchPlayerLeaderBoard,
  }
})
