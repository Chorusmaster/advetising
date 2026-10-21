import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { getMe } from '@/api/axios'

export const useAuthStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isInitialized = ref(false)
  const isAuthentificated = computed(() => user.value !== null)

  async function fetchUser() {
    try {
      const response = await getMe()
      user.value = response
      isInitialized.value = true
    } catch {
      user.value = null
    } 
  }

  return { user, isInitialized, isAuthentificated, fetchUser }
})
