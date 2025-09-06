<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="text-center">
          <!-- Trophy Icon + Title -->
          <div class="flex items-center justify-center space-x-3 mb-4">
            <Trophy class="w-12 h-12 text-primary" />
            <h1 class="text-4xl font-bold text-primary">Shrubber</h1>
          </div>

          <!-- Subtitle -->
          <p class="text-lg text-gray-600 mb-6">
            The ultimate leaderboard for the most creative word manglers and pronunciation artists
          </p>

          <!-- Status Indicators -->
          <div class="flex items-center justify-center space-x-6">
            <StatusIndicator status="online" text="Live Updates" />
            <StatusIndicator status="active" :text="`${activeUsers} Active Shrubbers`" />
          </div>
        </div>
      </div>
    </div>

    <!-- Leaderboard Content -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <Card v-for="n in 5" :key="n" class="p-4">
          <div class="animate-pulse flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-24"></div>
                <div class="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-6 bg-gray-200 rounded w-16"></div>
              <div class="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <AlertCircle class="w-16 h-16 mx-auto mb-4" />
          <h3 class="text-lg font-semibold">Something went wrong</h3>
          <p class="text-sm text-gray-600">{{ error }}</p>
        </div>
        <button
          @click="fetchPlayers"
          class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Leaderboard -->
      <div v-else class="space-y-4">
        <LeaderboardCard
          v-for="(player, index) in sortedPlayers"
          :key="player.id"
          :player="player"
          :rank="index + 1"
          :is-current-user="player.name === 'You'"
          class="transition-all duration-200 hover:scale-[1.02]"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && sortedPlayers.length === 0" class="text-center py-12">
        <Trophy class="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No players yet</h3>
        <p class="text-gray-600">Be the first to join the shrubbing championship!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Trophy, AlertCircle } from 'lucide-vue-next'
import { useLeaderboardStore } from '@/stores/leaderboard'
import { storeToRefs } from 'pinia'
import LeaderboardCard from '@/components/LeaderboardCard.vue'
import StatusIndicator from '@/components/StatusIndicator.vue'
import Card from '@/components/ui/Card.vue'
import { apiService } from '@/services/api'

const store = useLeaderboardStore()
const { sortedPlayers, loading, error, activeUsers } = storeToRefs(store)
const { fetchPlayers } = store

onMounted(() => {
  store.initializeMockData()
})
</script>
