<template>
  <div class="flex items-center space-x-1">
    <div :class="cn('w-2 h-2 rounded-full', dotColor)" />
    <span :class="cn('text-sm font-medium', textColor)">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

interface Props {
  status: 'online' | 'offline' | 'active'
  text: string
}

const { status, text } = defineProps<Props>()

const dotColor = computed(() => {
  switch (status) {
    case 'online':
      return 'bg-green-500'
    case 'active':
      return 'bg-purple-500'
    case 'offline':
      return 'bg-gray-400'
    default:
      return 'bg-gray-400'
  }
})

const textColor = computed(() => {
  switch (status) {
    case 'online':
      return 'text-green-700'
    case 'active':
      return 'text-purple-700'
    case 'offline':
      return 'text-gray-600'
    default:
      return 'text-gray-600'
  }
})
</script>
