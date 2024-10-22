<script setup lang="ts">
import type { AppBskyFeedPost } from '@atproto/api'

defineProps<{ record: AppBskyFeedPost.Record }>()
</script>

<template>
  <div>
    <RichText :text="record.text" :facets="record.facets" />
  </div>
</template>
