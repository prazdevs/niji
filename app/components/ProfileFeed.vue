<script setup lang="ts">
import type { AppBskyFeedDefs } from '@atproto/api'

const { actor } = defineProps<{ actor: string }>()

const agent = useAgent()
const cursor = ref<string | undefined>(undefined)
const posts = ref<AppBskyFeedDefs.FeedViewPost[]>([])

const { execute } = await useAsyncData(async () => {
  const d = await agent.app.bsky.feed.getAuthorFeed({ actor, limit: 30, cursor: cursor.value })

  cursor.value = d.data.cursor
  posts.value.push(...d.data.feed)
})
</script>

<template>
  <div class="">
    <div class="flex-1 overflow-y-scroll divide-y divide-[var(--ui-border-accented)]">
      <FeedPost v-for="post in posts" :key="post.post.cid" :post />
    </div>
    <UButton v-if="cursor" loading-auto @click="() => execute()">
      Load more
    </UButton>
  </div>
</template>
