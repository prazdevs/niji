<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { AppBskyRichtextFacet, RichText } from '@atproto/api'

definePageMeta({ name: 'profile' })

const agent = useAgent()
const route = useRoute('profile')
// const { parseRichText } = useRichText()

const { data } = await useAsyncData(async () => {
  const profile = await agent.app.bsky.actor.getProfile({ actor: route.params.handle })

  // const rt = await parseRichText(profile.data.description)

  return {
    ...profile.data,
    // description: rt,
  }
})

// const description = computedAsync(async () => {
//   if (!data.value?.description)
//     return null

const description = ref<null | RichText >(null)

// whenever(() => data.value, async (d) => {
if (data.value?.description) {
  const rt = new RichText({ text: data.value.description })
  await rt.detectFacets(agent)
  description.value = rt
}

const items = computed(() => {
  const tis: TabsItem[] = [
    { label: 'Posts' },
    { label: 'Replies' },
    { label: 'Media' },
  ]

  if (data.value?.associated?.feedgens)
    tis.push({ label: 'Feeds' })

  if (data.value?.associated?.starterPacks)
    tis.push({ label: 'Starter Packs' })

  if (data.value?.associated?.lists)
    tis.push({ label: 'Lists' })

  return tis
})
// })
</script>

<template>
  <main v-if="data">
    <div class="relative">
      <!-- banner -->
      <div class="h-[12rem] overflow-hidden">
        <img :src="data.banner" class="object-cover h-full w-full">
      </div>
      <!-- profile -->
      <div class="p-4 gap-1 flex flex-col">
        <!-- actions -->
        <div class="flex items-center justify-end gap-2">
          <UButton icon="mingcute-add-line">
            Follow
          </UButton>
          <UButton icon="mingcute-more-1-line" color="neutral" variant="soft" />
        </div>
        <!-- name & handle -->
        <div class="">
          <div class="text-3xl font-bold">
            {{ data.displayName }}
          </div>
          <div class="text-[var(--ui-text-muted)] -mt-1">
            {{ `@${data.handle}` }}
          </div>
        </div>
        <!-- stats -->
        <div class="inline-flex gap-2">
          <span class="inline-flex gap-1">
            <span class="font-semibold">{{ data.followersCount }}</span>
            <span class="text-[var(--ui-text-muted)]">followers</span>
          </span>
          <span class="inline-flex gap-1">
            <span class="font-semibold">{{ data.followsCount }}</span>
            <span class="text-[var(--ui-text-muted)]">following</span>
          </span>
          <span class="inline-flex gap-1">
            <span class="font-semibold">{{ data.postsCount }}</span>
            <span class="text-[var(--ui-text-muted)]">posts</span>
          </span>
        </div>
        <!-- description -->
        <div v-if="description" class="whitespace-pre-wrap break-words mt-1">
          <template v-for="segment, key in description.segments()" :key>
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
              :author="data.handle"
            />
            <template v-else>
              {{ segment.text }}
            </template>
          </template>
        </div>
      </div>
      <!-- avatar -->
      <div class="absolute top-[9rem] left-2.5 rounded-full border-[var(--ui-bg)] border-2">
        <UAvatar :src="data.avatar" class="w-[6rem] h-[6rem] border-[var(--ui-border-accented)] border-1" />
      </div>
    </div>
    <div class="sticky top-0">
      <UTabs :ui="{ list: 'bg-[var(--ui-bg)]' }" size="xl" variant="link" :items />
    </div>
    <div class="p-4">
      <pre class="break-words whitespace-break-spaces">{{ data }}</pre>
    </div>
  </main>
</template>
