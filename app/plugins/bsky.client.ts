import { AtpAgent } from '@atproto/api'

export default defineNuxtPlugin((nuxt) => {
  const agent = new AtpAgent({ service: 'https://public.api.bsky.app' })

  nuxt.vueApp.provide($bsky_agent, agent)
})
