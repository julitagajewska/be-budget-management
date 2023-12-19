import { User } from '@/types/User'
import { defineStore } from 'pinia'

interface UserState {
  user: User | null
  token: string | null
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    user: {
      id: '',
      name: '',
      surname: '',
      email: ''
    },
    token: 'example token'
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token
  },
  actions: {
    login(token: string) {
      console.log(token)
      this.token = token
    },
    logout() {
      this.token = null
    }
  }
})
