import React from 'react'
import SidebarContainer from './SidebarContainer'
import { Link } from 'react-router-dom'
import { routes } from '../../routing/routes'

// TODO: If transactions added, change label to key
type SidebarLinkType = {
  to: string
  label: string
  links?: SidebarLinkType[]
}

type SidebarSectionType = {
  label: string
  links: SidebarLinkType[]
}

const SIDEBAR_LNKS: SidebarSectionType[] = [
  {
    label: 'Menu',
    links: [
      { to: '/', label: 'Strona główna' },
      {
        to: '/transactions',
        label: 'Transakcje',
        links: [
          { to: '/incomes', label: 'Wpływy' },
          { to: '/expenses', label: 'Wpływy' }
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
        <div className="flex flex-col gap-2">
          {SIDEBAR_LNKS.map((s: SidebarSectionType) => {
            return (
              <div>
                <span>{s.label}</span>
                {s.links.map((l: SidebarLinkType) => (
                  <Link to={l.to} className="sidebar-link">
                    {l.label}
                  </Link>
                ))}
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <button>Wyloguj się</button>
      </div>
    </SidebarContainer>
  )
}

export default NavigationSidebar
