import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { getMe } from '@/api/axios'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  async function fetchUser() {
    try {
      isLoading.value = true;
      const response = await getMe()
      user.value = response
    } catch {
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, fetchUser }
})
