import { defineStore, skipHydrate } from 'pinia'
import { FetchError } from 'ofetch'
import { useLocalStorage } from '@vueuse/core'

interface UserPayloadInterface {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const authenticated = useLocalStorage('authenticated', false)

  const authenticateUser = async ({ username, password }: UserPayloadInterface) => {
    try {
      const data = await $fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
      })

      console.log('auth response:', data)

      if (data) {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = data?.token // set token to cookie
        authenticated.value = true // set authenticated  state value to true
      }
    }
    catch (error: FetchError | Error | unknown) {
      if (error instanceof FetchError) {
        if (error.statusCode === 403) {
          console.debug('Wrong Password')
        }
      }
      console.error('Auth error:', error, JSON.stringify(error))

      authenticated.value = false
    }
  }

  const logUserOut = () => {
    const token = useCookie('token') // useCookie new hook in nuxt 3
    authenticated.value = false // set authenticated  state value to false
    token.value = null // clear the token cookie
  }

  return {
    // state
    authenticated: skipHydrate(authenticated),
    // actions
    authenticateUser,
    logUserOut,
  }
})
