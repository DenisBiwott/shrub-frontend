<template>
  <Card
    :class="
      cn('p-6 transition-all duration-200', {
        'ring-2 ring-primary/50 border-primary/50 bg-primary/5': isCurrentUser,
      })
    "
  >
    <div class="flex items-center justify-between">
      <!-- Left: Rank + Avatar + Trend -->
      <div class="flex items-center space-x-3">
        <div class="flex flex-col items-center">
          <div
            :class="
              cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                rankBadgeClass,
              )
            "
          >
            <component :is="rankIcon" v-if="rankIcon" class="w-4 h-4" />
            <span v-else>#{{ rank }}</span>
          </div>
          <!-- <TrendingUp v-if="player.trend === 'up'" class="w-3 h-3 text-green-500 mt-1" />
          <TrendingDown v-if="player.trend === 'down'" class="w-3 h-3 text-red-500 mt-1" />
          <Minus v-if="player.trend === 'same'" class="w-3 h-3 text-gray-400 mt-1" /> -->
          <TrendingUp class="w-3 h-3 text-green-500 mt-1" />
        </div>

        <PlayerAvatar :name="player.name" size="md" />

        <div class="flex flex-col">
          <div class="flex items-center space-x-2">
            <h3 class="font-semibold text-gray-900">{{ displayName }}</h3>
            <Star v-if="rank <= 3" class="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <Badge v-if="isCurrentUser" variant="secondary" class="text-xs">You</Badge>
          </div>
          <p v-if="player?.latestShrub" class="text-sm text-gray-600">
            Latest: "{{ player.latestShrub }}"
          </p>
        </div>
      </div>

      <!-- Right: Points -->
      <div class="text-right">
        <div class="text-2xl font-bold text-gray-900">{{ formattedPoints }}</div>
        <div class="text-sm text-gray-500">points</div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// , TrendingUp, TrendingDown, Minus
import { Crown, Trophy, Medal, Star, TrendingUp } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import Card from './ui/Card.vue'
import Badge from './ui/Badge.vue'
import PlayerAvatar from './PlayerAvatar.vue'
import type { PlayerLeaderBoard } from '@/types'

interface Props {
  player: PlayerLeaderBoard
  rank: number
  isCurrentUser?: boolean
}

const { player, rank, isCurrentUser = false } = defineProps<Props>()

const displayName = computed(() => {
  return isCurrentUser ? 'You' : player.name
})

const formattedPoints = computed(() => {
  return new Intl.NumberFormat().format(player.totalPoints)
})

const rankIcon = computed(() => {
  switch (rank) {
    case 1:
      return Crown
    case 2:
      return Trophy
    case 3:
      return Medal
    default:
      return null
  }
})

const rankBadgeClass = computed(() => {
  switch (rank) {
    case 1:
      return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
    case 2:
      return 'bg-gray-100 text-gray-800 border border-gray-300'
    case 3:
      return 'bg-orange-100 text-orange-800 border border-orange-300'
    default:
      return 'bg-purple-100 text-purple-800 border border-purple-300'
  }
})
</script>
