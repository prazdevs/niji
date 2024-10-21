<script setup lang="ts">
import { AppBskyRichtextFacet, RichText } from '@atproto/api'

const props = defineProps<{
  text: string
  facets?: AppBskyRichtextFacet.Main[]
  author?: string
}>()

const rt = computed(() => new RichText({
  text: props.text,
  facets: props.facets,
}))
</script>

<template>
  <div class="whitespace-pre-wrap break-words">
    <template v-for="segment, key of rt.segments()" :key>
      <RichTextMention
        v-if="AppBskyRichtextFacet.isMention(segment.mention)"
        :mention="segment.mention"
        :text="segment.text"
      />
      <RichTextLink
        v-else-if="AppBskyRichtextFacet.isLink(segment.link)"
        :link="segment.link"
        :text="segment.text"
      />
      <RichTextTag
        v-else-if="AppBskyRichtextFacet.isTag(segment.tag)"
        :tag="segment.tag"
        :text="segment.text"
        :author
      />
      <template v-else>
        {{ segment.text }}
      </template>
    </template>
  </div>
</template>
