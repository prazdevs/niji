<script setup lang="ts">
import type { AppBskyFeedDefs } from '@atproto/api'
import { AppBskyFeedPost } from '@atproto/api'

defineProps<{ post: AppBskyFeedDefs.FeedViewPost }>()
</script>

<template>
  <div>
    <div class="text-lg font-bold">
      {{ post.post.author.displayName }}
    </div>
    <FeedPostRecord
      v-if="AppBskyFeedPost.isRecord(post.post.record)"
      :record="post.post.record"
    />
  </div>
</template>
