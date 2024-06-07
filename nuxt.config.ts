// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
  ],
  content: {
    highlight: {
      theme: 'light-plus',
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'php', 'sql'],
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
