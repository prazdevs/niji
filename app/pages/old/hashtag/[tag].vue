<script setup lang="ts">
definePageMeta({ name: 'hashtag' })

const route = useRoute('hashtag')
</script>

<template>
  <main>
    <div>Route to find {{ route.params.tag }} related posts.</div>
    <div v-if="route.query.author">Filtered to display posts from {{ route.query.author }}</div>
  </main>
</template>
