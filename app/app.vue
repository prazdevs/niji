<script setup lang="ts">

</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  --font-family-sans: Lexend, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --ui-radius: var(--radius-md);
}

button {
  cursor: pointer;
}
</style>
