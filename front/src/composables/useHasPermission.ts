import { useUserStore } from '@/stores/useUserStore.js'

export const useHasPermission = (permissionName: string) => {
  const userStore = useUserStore()
  if (userStore.isAdmin) return true
  return userStore.can(permissionName)
}
