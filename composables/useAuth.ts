import type { User } from 'lucia'

export default () => {
  const useUser = () => {
    const user = useState<User | null>('user', () => null)
    return user
  }

  const useAuthenticatedUser = () => {
    const user = useUser()
    return computed(() => {
      const userValue = unref(user)
      if (!userValue) {
        throw createError('useAuthenticatedUser() can only be used in protected pages')
      }
      return userValue
    })
  }

  return {
    useUser,
    useAuthenticatedUser,
  }
}
