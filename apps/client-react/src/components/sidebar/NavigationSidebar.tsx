import SidebarContainer from './SidebarContainer'
import SidebarLink from '../links/SidebarLink'
import { SidebarLinkType, SidebarSectionType } from 'shared-types'

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
  return (
    <SidebarContainer side="left">
      <div>
        <div>Logo</div>
        <div>Nowa transakcja</div>
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
