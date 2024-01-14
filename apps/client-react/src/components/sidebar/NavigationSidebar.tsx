import SidebarContainer from './SidebarContainer'
import SidebarLink from '../links/SidebarLink'
import { SidebarLinkType, SidebarSectionType } from 'shared-types'
import Button from '../buttons/Button'
import { DarkModeContext, DarkModeContextProvider } from '../../context/DarkModeContext'
import { useContext, useReducer } from 'react'
import themeSlice, { themes, toggleTheme } from '../../redux/slices/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const SIDEBAR_LNKS: SidebarSectionType[] = [
  {
    label: 'Menu',
    links: [
      { to: '/home', label: 'Strona główna' },
      {
        to: '/transactions',
        label: 'Transakcje',
        links: [
          { to: '/transactions', label: 'Wszystkie' },
          { to: '/transactions/incomes', label: 'Wpływy' },
          { to: '/transactions/expenses', label: 'Wydatki' }
        ]
      },
      { to: '/goals', label: 'Cele' },
      { to: '/budgets', label: 'Budżety' },
      { to: '/reports', label: 'Raporty' },
      { to: '/accounts', label: 'Konta' }
    ]
  },
  {
    label: 'Profil',
    links: [
      { to: '/profile', label: 'Użytkownik' },
      { to: '/settings', label: 'Ustawienia' },
      { to: '/help', label: 'Pomoc' }
    ]
  }
]

const NavigationSidebar = () => {
  const darkModeContext = useContext(DarkModeContext)

  const handleToggleDarkMode = () => {
    console.log(darkModeContext?.darkMode)
    darkModeContext?.setDarkMode(!darkModeContext.darkMode)
  }

  const theme = useSelector((state: RootState) => state.theme.selectedTheme)
  const dispatch = useDispatch()

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <SidebarContainer side="left">
      <div className="flex flex-col gap-2">
        <div>Logo</div>
        <div>Nowa transakcja</div>
        <div>
          {/* ... */}
          <Button
            size="small"
            text={`${darkModeContext?.darkMode ? 'Tryb jasny' : 'Tryb ciemny'}`}
            onClick={handleToggleDarkMode}
          />
        </div>
        <div>
          <Button
            size="small"
            text={`Zmień kolory na: schemat ${themes[(theme.id + 1) % 3].label}`}
            onClick={handleThemeToggle}
          />
        </div>
        <ul className="flex flex-col gap-2 list-none">
          {SIDEBAR_LNKS.map((s: SidebarSectionType) => {
            return (
              <div>
                <span>{s.label}</span>
                {s.links.map((l: SidebarLinkType) => (
                  <SidebarLink link={l} tabIndex={0} />
                ))}
              </div>
            )
          })}
        </ul>
      </div>
      <div>
        <button className="sidebar-button">Wyloguj się</button>
      </div>
    </SidebarContainer>
  )
}

export default NavigationSidebar
