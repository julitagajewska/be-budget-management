import { component$, $, useContext } from '@builder.io/qwik'
import { SidebarContainer } from './sidebar-container'
import { Link } from '@builder.io/qwik-city'
import { Button } from '../buttons/Button'
import { DarkModeContext, ThemeContext, themes } from '~/context/appContext'

const NavigationSidebar = component$(() => {
  const darkMode = useContext(DarkModeContext)

  const handleToggleDarkMode = $(() => {
    darkMode.value = !darkMode.value
  })

  const theme = useContext(ThemeContext)

  const handleToggleTheme = $(() => {
    theme.value = themes[(theme.value.id + 1) % themes.length]
  })

  return (
    <SidebarContainer>
      {/* ... */}
      <div>
        <div>Logo + nowa transakcja</div>

        <div>
          <Button onClick={handleToggleDarkMode}>Tryb {darkMode.value ? 'jasny' : 'ciemny'}</Button>
          <Button onClick={handleToggleTheme}>
            Zmień kolory na: schemat {themes[(theme.value.id + 1) % themes.length].label}
          </Button>
        </div>

        <div>
          <Link href="/" class="sidebar-link">
            Strona główna
          </Link>
          <Link href="/transactions" class="sidebar-link">
            Transakcje
          </Link>
          <Link href="/transactions/expenses" class="sidebar-link">
            Wydatki
          </Link>
          <Link href="/transactions/incomes" class="sidebar-link">
            Wpływy
          </Link>
          <Link href="/goals" class="sidebar-link">
            Cele
          </Link>
          <Link href="/budgets" class="sidebar-link">
            Budżety
          </Link>
          <Link href="/reports" class="sidebar-link">
            Raporty
          </Link>
          <Link href="/accounts" class="sidebar-link">
            Konta
          </Link>
          <Link href="/profile" class="sidebar-link">
            Użytkownik
          </Link>
          <Link href="/settings" class="sidebar-link">
            Ustawienia
          </Link>
          <Link href="/help" class="sidebar-link">
            Pomoc
          </Link>
        </div>
      </div>

      <div>
        <Link href="/logged-out" class="sidebar-link">
          Wyloguj się
        </Link>
      </div>
    </SidebarContainer>
  )
})

export default NavigationSidebar
