import { User } from '@/types/User'
import { defineStore } from 'pinia'

interface UserState {
  user: User | null
  token: string | null
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    user: null,
    token: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
    getToken: (state) => state.token
  },
  actions: {
    login({ user, token }: { user: User; token: string }) {
      this.user = user
      this.token = token
    },
    logout() {
      this.user = null
      this.token = null
    }
  }
})
