<script setup lang="ts">
definePageMeta({ name: 'profile' })

const route = useRoute('profile')
const agent = useAgent()

const { data } = useAsyncData(async () => {
  const d = await agent.app.bsky.actor.getProfile({ actor: route.params.handle })

  return d.data
})
</script>

<template>
  <main v-if="data">
    <div>{{ data?.displayName }}</div>
    <ProfileFeed :actor="route.params.handle" />
  </main>
</template>
