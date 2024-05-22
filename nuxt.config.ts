// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  content: {
    highlight: {
      theme: 'material-theme-palenight',
    },
  },
  vuetify: {
    vuetifyOptions: {
      components: ['VBtn', 'VCard', 'VContainer'],
    },
  },
  modules: ['@nuxt/content', '@nuxt/eslint', 'vuetify-nuxt-module'],
})
