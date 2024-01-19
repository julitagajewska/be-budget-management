import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import VueLight from '../../assets/logo/vue-light.svg'
import VueDark from '../../assets/logo/vue-dark.svg'

import ReactLight from '../../assets/logo/react-light.svg'
import ReactDark from '../../assets/logo/react-dark.svg'

import QwikLight from '../../assets/logo/qwik-light.svg'
import QwikDark from '../../assets/logo/qwik-dark.svg'

const logos = {
  react: {
    light: ReactLight,
    dark: ReactDark
  },
  vue: {
    light: VueLight,
    dark: VueDark
  },
  qwik: {
    light: QwikLight,
    dark: QwikDark
  }
}

const Logo = () => {
  const darkModeContext = useContext(DarkModeContext)
  const theme = useSelector((state: RootState) => state.theme.selectedTheme)
  return (
    <div className="flex flex-row gap-2 items-center">
      <img src={logos[theme.label][darkModeContext?.darkMode ? 'dark' : 'light']} />
      <div className="flex flex-col leading-4">
        <span className="font-slab text-primary-600 dark:text-primary-400 text-md font-semibold">
          Budżet
        </span>
        <span className="text-xs text-background-500">Osobisty</span>
      </div>
    </div>
  )
}

export default Logo
