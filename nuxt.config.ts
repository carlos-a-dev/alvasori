// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    public: {
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    },
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    'nuxt-build-cache',
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
      components: ['VBtn', 'VCard', 'VContainer', 'VTextField'],
      defaults: {
        VBtn: { variant: 'flat', rounded: true },
        VTextField: { variant: 'outlined', rounded: true, density: 'comfortable' },
        VTextarea: { variant: 'outlined', rounded: true, density: 'comfortable' },
        VCard: { variant: 'elevated', rounded: 'xl' },
      },
      icons: {
        defaultSet: 'mdi',
        sets: ['mdi'],
      },
    },
  },
  routeRules: {
    '/admin': { ssr: false },
    '/admin/**': { ssr: false },
  },
})
