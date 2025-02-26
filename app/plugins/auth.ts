import { useAuthStore } from '~/stores/authStore'

export default defineNuxtPlugin(() => {
  // Only run on client side
  if (import.meta.client) {
    const authStore = useAuthStore()
    // Initialize auth state from localStorage
    authStore.init()
  }
})
