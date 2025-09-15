<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50"></div>

        <!-- Modal Content -->
        <Transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="open"
            :class="
              cn(
                'relative z-50 mx-4 w-full max-w-lg transform rounded-lg bg-white p-6 shadow-xl transition-all',
                $attrs.class as string,
              )
            "
          >
            <!-- Close Button -->
            <button
              v-if="showCloseButton"
              @click="handleClose"
              class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X class="h-4 w-4" />
              <span class="sr-only">Close</span>
            </button>

            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { cn } from '../../lib/utils'

interface Props {
  open?: boolean
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}

const {
  open = false,
  showCloseButton = true,
  closeOnBackdropClick = true,
} = defineProps<Props>()

const emit = defineEmits<Emits>()

const handleClose = () => {
  emit('update:open', false)
  emit('close')
}

const handleBackdropClick = (event: MouseEvent) => {
  if (closeOnBackdropClick && event.target === event.currentTarget) {
    handleClose()
  }
}
</script>