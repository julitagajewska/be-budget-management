import { Theme } from '@/stores/AppSettingsStore'

export const getThemeClasses = (theme: string, mode: boolean) => {
  let classes = ''

  switch (theme) {
    case Theme.VUE: {
      switch (mode) {
        case true: {
          classes += 'vue-dark'
          break
        }
        case false: {
          classes += 'vue-light'
          break
        }
      }
      break
    }
    case Theme.REACT: {
      switch (mode) {
        case true: {
          classes += 'react-dark'
          break
        }
        case false: {
          classes += 'react-light'
          break
        }
      }
      break
    }
    case Theme.QWIK: {
      switch (mode) {
        case true: {
          classes += 'qwik-dark'
          break
        }
        case false: {
          classes += 'qwik-light'
          break
        }
      }
      break
    }
  }

  return classes
}
