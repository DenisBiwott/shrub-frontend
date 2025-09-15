<template>
  <Modal
    :open="open"
    @update:open="$emit('update:open', $event)"
    @close="$emit('close')"
    class="max-w-md"
  >
    <!-- Header -->
    <div class="text-center mb-6">
      <div
        class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3"
      >
        <Trophy class="w-6 h-6 text-primary" />
      </div>
      <h2 class="text-xl font-bold text-primary mb-2">Add New Shrub</h2>
      <!-- <p class="text-sm text-gray-600">Capture another hilarious mispronunciation! 🔥</p> -->
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Shrubber Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Shrubber 👤 </label>
        <Select
          v-model="formData.playerId"
          :options="playerOptions"
          placeholder="Select the shrubber..."
          :error="!formData.playerId && showErrors"
        />
      </div>

      <!-- Original Word -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Original Word 📝 </label>
        <input
          v-model="formData.originalWord"
          type="text"
          placeholder="e.g., Paragliding"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          :class="{ 'border-red-500': !formData.originalWord && showErrors }"
        />
      </div>

      <!-- The Shrub -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> The Shrub 🌱 </label>
        <input
          v-model="formData.mispronunciation"
          type="text"
          placeholder="e.g., Paragriding"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          :class="{ 'border-red-500': !formData.mispronunciation && showErrors }"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional) 💭
        </label>
        <textarea
          v-model="formData.description"
          placeholder="Tell us more about this epic shrub..."
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>

      <!-- Shrub Rating -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3"> Shrub Rating ⭐ </label>
        <div class="flex gap-2 justify-between">
          <button
            v-for="rating in ratings"
            :key="rating.value"
            type="button"
            @click="formData.rating = rating.value"
            :class="
              cn(
                'flex-1 flex flex-col items-center py-3 px-2 rounded-lg border-2 transition-all text-xs font-medium',
                formData.rating === rating.value
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600',
              )
            "
          >
            <span class="text-lg mb-1">{{ rating.emoji }}</span>
            <span>{{ rating.label }}</span>
          </button>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          class="flex-1"
          @click="handleCancel"
          :disabled="loading"
        >
          Cancel
        </Button>
        <Button type="submit" class="flex-1" :disabled="loading || !isFormValid">
          <span v-if="loading">Adding...</span>
          <span v-else>Add Shrub ⚡</span>
        </Button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trophy } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import Modal from './ui/Modal.vue'
import Button from './ui/Button.vue'
import Select, { type SelectOption } from './ui/Select.vue'
import type { PlayerLeaderBoard } from '@/types'

interface Props {
  open?: boolean
  players?: PlayerLeaderBoard[]
  loading?: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
  (e: 'submit', data: ShrubFormData): void
}

export interface ShrubFormData {
  playerId: string
  originalWord: string
  mispronunciation: string
  description: string
  rating: number
}

const { open = false, players = [], loading = false } = defineProps<Props>()
const emit = defineEmits<Emits>()

const showErrors = ref(false)

const playerOptions = computed<SelectOption[]>(() => {
  return players.map((player) => ({
    value: player._id,
    label: player.name,
    avatar: player.name,
    description: `${player.totalPoints} points • ${player.shrubCount} shrubs`,
  }))
})

const formData = ref<ShrubFormData>({
  playerId: '',
  originalWord: '',
  mispronunciation: '',
  description: '',
  rating: 4, // Default to "Great"
})

const ratings = [
  { value: 1, emoji: '😭', label: 'Meh' },
  { value: 2, emoji: '😐', label: 'Okay' },
  { value: 3, emoji: '😊', label: 'Good' },
  { value: 4, emoji: '😃', label: 'Great' },
  { value: 5, emoji: '🤩', label: 'Epic!' },
]

const isFormValid = computed(() => {
  return (
    formData.value.playerId &&
    formData.value.originalWord.trim() &&
    formData.value.mispronunciation.trim() &&
    formData.value.rating > 0
  )
})

const handleSubmit = () => {
  if (!isFormValid.value) {
    showErrors.value = true
    return
  }

  emit('submit', { ...formData.value })
}

const handleCancel = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  formData.value = {
    playerId: '',
    originalWord: '',
    mispronunciation: '',
    description: '',
    rating: 4,
  }
  showErrors.value = false
}

// Reset form when modal opens
const handleModalOpen = (isOpen: boolean) => {
  if (isOpen) {
    resetForm()
  }
  emit('update:open', isOpen)
}
</script>
