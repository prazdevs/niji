<script setup lang="ts">
import type { FacetTag } from '@atproto/api'
import type { DropdownMenuItem } from '@nuxt/ui'

const props = defineProps<{
  tag: FacetTag
  text: string
  author?: string
}>()

const items = computed(() => {
  const dmis: DropdownMenuItem[] = [{
    label: `See ${props.text} posts`,
    icon: 'mingcute-search-line',
    to: {
      name: 'hashtag',
      params: { tag: props.tag.tag },
    },
  }]

  if (props.author) {
    dmis.push({
      label: `See ${props.text} posts by user`,
      icon: 'mingcute-user-search-line',
      to: {
        name: 'hashtag',
        params: { tag: props.tag.tag },
        query: { author: props.author },
      },
    })
  }

  dmis.push({ type: 'separator' })
  dmis.push({ label: `Mute ${props.text}`, icon: 'mingcute-volume-mute-line',
  })

  return dmis
})
</script>

<template>
  <UDropdownMenu :items>
    <button class="text-[var(--ui-primary)] hover:underline">
      {{ text }}
    </button>
  </UDropdownMenu>
</template>
