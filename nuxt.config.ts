// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,
  },
  future: { 
    compatibilityVersion: 4
  },
  experimental: {
    typedPages: true
  },
  modules: [
    '@nuxt/ui',
    // '@nuxtjs/color-mode',
    '@vueuse/nuxt'
  ],
  // colorMode: {
  //   classSuffix: '',
  //   storage: 'localStorage',
  // }
})
