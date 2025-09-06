<template>
  <div
    :class="
      cn(
        'rounded-xl border bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow',
        $attrs.class as string,
      )
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>
