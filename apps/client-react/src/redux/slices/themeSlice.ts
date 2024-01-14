import { createSlice } from '@reduxjs/toolkit'

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
    }
  }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
