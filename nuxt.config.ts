// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
  ],
  content: {
    highlight: {
      theme: 'material-theme-palenight',
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  vuetify: {
    vuetifyOptions: {
      components: ['VBtn', 'VCard', 'VContainer'],
      defaults: {
        VBtn: { variant: 'flat', rounded: true },
        VTextField: { variant: 'outlined', rounded: true, density: 'comfortable' },
        VTextarea: { variant: 'outlined', rounded: true, density: 'comfortable' },
        VCard: { variant: 'elevated', rounded: 'xl' },
      },
    },
  },
  routeRules: {
    '/admin': { ssr: false },
    '/admin/**': { ssr: false },
  },
})
