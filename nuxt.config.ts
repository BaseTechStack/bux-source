// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@pinia/nuxt'
  ],
 
  extends: [
  ],
  
  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  colorMode: {
    classSuffix: '',
    preference: 'light'
  },

  app: {
    head: {
      htmlAttrs: {
        class: 'h-full'
      },
      bodyAttrs: {
        class: 'h-full antialiased'
      }
    }
  }, 
  compatibilityDate:  '2025-01-27',
})