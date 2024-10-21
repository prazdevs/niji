<script setup lang="ts">
import type { FacetMention } from '@atproto/api'

defineProps<{
  mention: FacetMention
  text: string
}>()
</script>

<template>
  <NuxtLink
    :to="{ name: 'profile', params: { handle: mention.did } }"
    class="text-[var(--ui-primary)] hover:underline"
  >
    {{ text }}
  </NuxtLink>
</template>
