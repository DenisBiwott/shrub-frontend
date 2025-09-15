<template>
  <div class="relative">
    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      type="button"
      @click="toggleOpen"
      @keydown="handleTriggerKeydown"
      :class="
        cn(
          'relative w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-left shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          {
            'border-red-500': error,
            'border-ring': isOpen,
          },
          $attrs.class as string,
        )
      "
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :disabled="disabled"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2 flex-1">
          <!-- Selected Option Display -->
          <template v-if="selectedOption">
            <PlayerAvatar v-if="selectedOption.avatar" :name="selectedOption.avatar" size="sm" />
            <span class="block truncate text-sm">{{ selectedOption.label }}</span>
          </template>
          <span v-else class="block truncate text-sm text-muted-foreground">
            {{ placeholder }}
          </span>
        </div>
        <!-- Chevron -->
        <ChevronDown
          :class="
            cn('h-4 w-4 text-muted-foreground transition-transform duration-200', {
              'rotate-180': isOpen,
            })
          "
        />
      </div>
    </button>

    <!-- Dropdown Content -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        ref="contentRef"
        class="absolute z-50 mt-1 w-full rounded-md border border-input bg-popover shadow-lg"
        :class="dropdownPosition === 'top' ? 'bottom-full mb-1 mt-0' : ''"
      >
        <div class="max-h-60 overflow-auto rounded-md py-1">
          <button
            v-for="(option, index) in options"
            :key="option.value"
            type="button"
            @click="selectOption(option)"
            @keydown="handleOptionKeydown($event, index)"
            :class="
              cn(
                'relative w-full cursor-pointer select-none py-2 px-3 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none',
                {
                  'bg-accent text-accent-foreground': highlightedIndex === index,
                  'bg-primary/10 text-primary': selectedOption?.value === option.value,
                },
              )
            "
            :ref="(el) => setOptionRef(el, index)"
          >
            <div class="flex items-center space-x-3">
              <PlayerAvatar v-if="option.avatar" :name="option.avatar" size="sm" />
              <div class="flex flex-col">
                <span class="block text-sm font-medium">{{ option.label }}</span>
                <span v-if="option.description" class="block text-xs text-muted-foreground">
                  {{ option.description }}
                </span>
              </div>
            </div>
          </button>

          <!-- Empty State -->
          <div
            v-if="options.length === 0"
            class="py-6 px-3 text-center text-sm text-muted-foreground"
          >
            {{ emptyText }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '../../lib/utils'
import PlayerAvatar from '../PlayerAvatar.vue'

export interface SelectOption {
  value: string
  label: string
  description?: string
  avatar?: string
  disabled?: boolean
}

interface Props {
  modelValue?: string
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  emptyText?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const {
  modelValue,
  options = [],
  placeholder = 'Select an option...',
  disabled = false,
  error = false,
  emptyText = 'No options available',
} = defineProps<Props>()

const emit = defineEmits<Emits>()

const isOpen = ref(false)
const highlightedIndex = ref(-1)
const dropdownPosition = ref<'bottom' | 'top'>('bottom')
const triggerRef = ref<HTMLButtonElement>()
const contentRef = ref<HTMLDivElement>()
const optionRefs = ref<(HTMLButtonElement | null)[]>([])

const selectedOption = computed(() => {
  return options.find((option) => option.value === modelValue)
})

const setOptionRef = (el: HTMLButtonElement | null, index: number) => {
  optionRefs.value[index] = el
}

const toggleOpen = () => {
  if (disabled) return
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    nextTick(() => {
      calculateDropdownPosition()
      // Set initial highlight to selected option or first option
      const selectedIndex = options.findIndex((option) => option.value === modelValue)
      highlightedIndex.value = selectedIndex >= 0 ? selectedIndex : 0
      scrollToHighlighted()
    })
  } else {
    highlightedIndex.value = -1
  }
}

const calculateDropdownPosition = () => {
  if (!triggerRef.value || !contentRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const dropdownHeight = contentRef.value.offsetHeight
  const spaceBelow = viewportHeight - triggerRect.bottom
  const spaceAbove = triggerRect.top

  // Show dropdown above if there's more space above and not enough below
  dropdownPosition.value = spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'top' : 'bottom'
}

const selectOption = (option: SelectOption) => {
  if (option.disabled) return

  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
  highlightedIndex.value = -1
}

const scrollToHighlighted = () => {
  if (highlightedIndex.value >= 0 && optionRefs.value[highlightedIndex.value]) {
    optionRefs.value[highlightedIndex.value]?.scrollIntoView({
      block: 'nearest',
    })
  }
}

const handleTriggerKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        toggleOpen()
      } else {
        const direction = event.key === 'ArrowDown' ? 1 : -1
        const newIndex = highlightedIndex.value + direction

        if (newIndex >= 0 && newIndex < options.length) {
          highlightedIndex.value = newIndex
          scrollToHighlighted()
        }
      }
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        toggleOpen()
      } else if (highlightedIndex.value >= 0) {
        selectOption(options[highlightedIndex.value])
      }
      break
    case 'Escape':
      if (isOpen.value) {
        isOpen.value = false
        highlightedIndex.value = -1
      }
      break
  }
}

const handleOptionKeydown = (event: KeyboardEvent, index: number) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectOption(options[index])
      break
    case 'ArrowDown':
      event.preventDefault()
      const nextIndex = index + 1 < options.length ? index + 1 : 0
      highlightedIndex.value = nextIndex
      optionRefs.value[nextIndex]?.focus()
      break
    case 'ArrowUp':
      event.preventDefault()
      const prevIndex = index > 0 ? index - 1 : options.length - 1
      highlightedIndex.value = prevIndex
      optionRefs.value[prevIndex]?.focus()
      break
    case 'Escape':
      isOpen.value = false
      highlightedIndex.value = -1
      triggerRef.value?.focus()
      break
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    !triggerRef.value?.contains(event.target as Node) &&
    !contentRef.value?.contains(event.target as Node)
  ) {
    isOpen.value = false
    highlightedIndex.value = -1
  }
}

// Watch for option highlight changes
watch(highlightedIndex, (newIndex) => {
  if (newIndex >= 0 && optionRefs.value[newIndex]) {
    optionRefs.value[newIndex]?.focus()
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
