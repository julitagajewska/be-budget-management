import { component$ } from '@builder.io/qwik'
import { SidebarContainer } from './sidebar-container'
import { Link } from '@builder.io/qwik-city'

const NavigationSidebar = component$(() => {
  return (
    <SidebarContainer>
      <div>
        <div>Logo + nowa transakcja</div>

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
