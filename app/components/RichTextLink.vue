<script setup lang="ts">
import type { FacetLink } from '@atproto/api'

defineProps<{
  link: FacetLink
  text: string
}>()
</script>

<template>
  <NuxtLink
    :href="link.uri"
    target="_blank"
    class="text-[var(--ui-primary)] hover:underline"
  >
    {{ text }}
  </NuxtLink>
</template>
