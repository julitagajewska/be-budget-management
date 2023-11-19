import { defineStore } from 'pinia'

export enum Theme {
  REACT = 'react',
  VUE = 'vue',
  QWIK = 'qwik'
}

export enum Language {
  PL = 'pl',
  EN = 'en'
}

export interface AppSettingsState {
  darkMode: boolean
  theme: Theme
  language: Language
}

export const useAppSettingsStore = defineStore('appSettingsStore', {
  state: () => ({
    darkMode: false,
    theme: Theme.REACT,
    language: Language.PL
  }),
  getters: {
    getDarkMode(state) {
      return state.darkMode
    },
    getTheme(state) {
      return state.theme
    }
  },
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    setTheme(theme: Theme) {
      this.theme = theme
    }
  }
})
