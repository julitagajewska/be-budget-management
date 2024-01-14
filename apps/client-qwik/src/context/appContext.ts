import { type Signal } from '@builder.io/qwik'
import { createContextId } from '@builder.io/qwik'

export type ThemeLabel = 'react' | 'vue' | 'qwik'

export type Theme = {
  id: number
  label: ThemeLabel
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

export const DarkModeContext = createContextId<Signal<boolean>>('dark-mode-context')
export const ThemeContext = createContextId<Signal<Theme>>('theme-context')
