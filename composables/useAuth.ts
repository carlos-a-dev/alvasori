import type { User } from 'lucia'

export default () => {
  const useUser = () => useState<User | null>('user', () => null)

  const useAuthenticatedUser = () => {
    const user = useUser()
    return computed(() => {
      if (!user.value) {
        throw createError('useAuthenticatedUser() can only be used in protected pages')
      }
      return user.value
    })
  }

  return {
    useUser,
    useAuthenticatedUser,
  }
}
