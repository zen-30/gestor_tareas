// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: [
    '@/assets/css/global.css',
  ],
  devServer: {
    port: 3001
  },
  modules: ['@nuxt/fonts', '@nuxt/eslint', '@pinia/nuxt'],
  devtools: { enabled: false },
});