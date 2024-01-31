import SidebarContainer from './SidebarContainer'
import SidebarLink from '../links/SidebarLink'
import { SidebarLinkType, SidebarSectionType } from 'shared-types'
import Button from '../buttons/Button'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useContext } from 'react'
import { themes, toggleTheme } from '../../redux/slices/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Logo from '../logo/Logo'
import Divider from '../other/Divider'
import {
  Bag,
  Chart,
  Exchange,
  Home,
  Info,
  Logout,
  Plus,
  Settings,
  Star,
  User,
  Wallet
} from '../icons'

const SIDEBAR_LNKS: SidebarSectionType[] = [
  {
    label: 'Menu',
    links: [
      { to: '/home', label: 'Strona główna', icon: Home },
      // {
      //   to: '/transactions',
      //   label: 'Transakcje',
      //   links: [
      //     { to: '/transactions', label: 'Wszystkie' },
      //     { to: '/transactions/incomes', label: 'Wpływy' },
      //     { to: '/transactions/expenses', label: 'Wydatki' }
      //   ]
      // },
      {
        to: '/transactions',
        label: 'Transakcje',
        icon: Exchange
      },
      { to: '/goals', label: 'Cele', icon: Star },
      { to: '/budgets', label: 'Budżety', icon: Wallet },
      { to: '/reports', label: 'Raporty', icon: Chart },
      { to: '/accounts', label: 'Konta', icon: Bag }
    ]
  },
  {
    label: 'Profil',
    links: [
      { to: '/profile', label: 'Użytkownik', icon: User },
      { to: '/settings', label: 'Ustawienia', icon: Settings },
      { to: '/help', label: 'Pomoc', icon: Info }
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
        <Logo />
        <Divider />
        <Button size="small" IconLeft={Plus} text={`Nowa transakcja`} onClick={() => {}} />
        <Divider />
        <ul className="flex flex-col gap-2 list-none">
          {SIDEBAR_LNKS.map((s: SidebarSectionType) => {
            return (
              <div>
                <span>{s.label}</span>
                {s.links.map((l: SidebarLinkType) => (
                  <SidebarLink link={l} tabIndex={0} Icon={l.icon} />
                ))}
              </div>
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <Divider />
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
            text={`${themes[theme.id % 3].displayedName}`}
            onClick={handleThemeToggle}
          />
        </div>
        <Divider />
        <div>
          <button className="flex flex-row justify-start items-center w-full gap-2 px-2 bg-background-100 py-[6px] rounded-md text-sm">
            <Logout className="text-base" /> Wyloguj się
          </button>
        </div>
      </div>
    </SidebarContainer>
  )
}

export default NavigationSidebar
