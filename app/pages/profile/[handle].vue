<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

definePageMeta({ name: 'profile' })

const route = useRoute('profile')
const agent = useAgent()

const { data } = useAsyncData(async () => {
  const d = await agent.app.bsky.actor.getProfile({ actor: route.params.handle })

  return d.data
})

const baseItems = [
  { label: 'Posts', value: 'posts' },
  { label: 'Media', value: 'media' },
] as const

const items = computed(() => {
  const tis: TabsItem[] = [...baseItems]

  if (data.value?.associated?.feedgens)
    tis.push({ label: 'Feeds', value: 'feeds' })

  if (data.value?.associated?.starterPacks)
    tis.push({ label: 'Starter Packs', value: 'starter-packs' })

  return tis
})

const item = ref<TabsItem['value']>(baseItems[0].value)
</script>

<template>
  <main v-if="data">
    <div>{{ data?.displayName }}</div>

    <UTabs v-model="item" :ui="{ list: 'bg-[var(--ui-bg)] sticky top-0' }" size="xl" variant="link" :items />
    <ProfileFeed v-show="item === 'posts'" :actor="route.params.handle" filter="posts_and_author_threads" />
    <ProfileFeed v-show="item === 'media'" :actor="route.params.handle" filter="posts_with_media" />
  </main>
</template>
