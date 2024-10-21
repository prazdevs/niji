<script setup lang="ts">
definePageMeta({ name: 'profile' })

const agent = useAgent()
const route = useRoute('profile')

const { data } = await useAsyncData(async () => {
  const profile = await agent.app.bsky.actor.getProfile({ actor: route.params.handle })

  return profile.data
})
</script>

<template>
  <main>
    <pre>{{ data }}</pre>
  </main>
</template>
