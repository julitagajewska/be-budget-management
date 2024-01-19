import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ThemeLabel = 'react' | 'vue' | 'qwik'

type Theme = {
  id: number
  label: ThemeLabel
}

export interface ThemeState {
  selectedTheme: Theme
}

export const themes: Theme[] = [
  {
    id: 0,
    label: 'react'
  },
  {
    id: 1,
    label: 'vue'
  },
  {
    id: 2,
    label: 'qwik'
  }
]

const initialState: ThemeState = {
  selectedTheme: themes[0]
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.selectedTheme = themes[(state.selectedTheme.id + 1) % 3]
    },
    setTheme: (state, action: PayloadAction<ThemeLabel>) => {
      switch (action.payload) {
        case 'react':
          state.selectedTheme = themes[0]
          break
        case 'vue':
          state.selectedTheme = themes[1]
          break
        case 'qwik':
          state.selectedTheme = themes[2]
          break
      }
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions

export default themeSlice.reducer
