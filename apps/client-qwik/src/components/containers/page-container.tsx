import { component$, Slot, useContext } from '@builder.io/qwik'
import type { ThemeLabel } from '~/context/appContext'
import { DarkModeContext, ThemeContext } from '~/context/appContext'

const getThemeClasses = (theme: ThemeLabel, mode: boolean | undefined) => {
  let classes = ''

  switch (theme) {
    case 'vue': {
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
    case 'react': {
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
    case 'qwik': {
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

const PageContainer = component$(() => {
  const darkMode = useContext(DarkModeContext)
  const theme = useContext(ThemeContext)

  const themeClasses = getThemeClasses(theme.value.label, darkMode.value)

  return (
    <div
      class={`${themeClasses} text-text-900 font-mulish w-full min-h-[100vh] h-full relative bg-background-50 flex flex-col justify-start items-start`}
    >
      <div class="flex flex-row justify-between h-full w-full px-5 py-5 gap-5 overflow-auto">
        <Slot />
      </div>
    </div>
  )
})

export default PageContainer
