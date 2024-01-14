import { useContext } from 'react'
import NavigationSidebar from '../sidebar/NavigationSidebar'
import OverviewSidebar from '../sidebar/OverviewSidebar'
import ContentContainer from './ContentContainer'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ThemeLabel } from '../../redux/slices/themeSlice'

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

const PageContainer = () => {
  const locationsWithoutsidebars = ['/', '/login', '/register']

  const darkModeContext = useContext(DarkModeContext)
  const theme = useSelector((state: RootState) => state.theme.selectedTheme)

  const themeClasses = getThemeClasses(theme.label, darkModeContext?.darkMode)

  return (
    <div className={`${themeClasses} page-container`}>
      <div className="page-content-wrapper">
        {!locationsWithoutsidebars.includes(location.pathname) && <NavigationSidebar />}
        <ContentContainer />
        {!locationsWithoutsidebars.includes(location.pathname) && <OverviewSidebar />}
      </div>
    </div>
  )
}

export default PageContainer
