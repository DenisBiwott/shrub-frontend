<template>
  <div 
    :class="cn('inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium', sizeClasses[size])"
    :style="{ backgroundColor: avatarColor }"
  >
    {{ initials }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const { name, size = 'md' } = defineProps<Props>()

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base'
}

const initials = computed(() => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const avatarColor = computed(() => {
  const colors = [
    '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#3B82F6', '#84CC16', '#F97316', '#EC4899'
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
})
</script>