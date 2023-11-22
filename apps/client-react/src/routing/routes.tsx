import AccountsListPage from '../views/accounts/AccountsListPage'
import BudgetsListPage from '../views/budgets/BudgetsListPage'
import HelpPage from '../views/general/HelpPage'
import HomePage from '../views/general/HomePage'
import SettingsPage from '../views/general/SettingsPage'
import UserProfilePage from '../views/general/UserProfilePage'
import GoalsListPage from '../views/goals/GoalsListPage'
import ReportsPage from '../views/reports/ReportsPage'
import ExpensesPage from '../views/transactions/ExpensesPage'
import IncomesPage from '../views/transactions/IncomesPage'
import TransactionsListPage from '../views/transactions/TransactionsListPage'
export type RouteType = {
  to: string
  label: string
  component: React.ReactNode
}

export const routes: RouteType[] = [
  {
    to: '/',
    label: 'Strona główna',
    component: <HomePage />
  },
  {
    to: '/transactions',
    label: 'Transakcje',
    component: <TransactionsListPage />
  },
  {
    to: '/expenses',
    label: 'Wydatki',
    component: <ExpensesPage />
  },
  {
    to: '/incomes',
    label: 'Wpływy',
    component: <IncomesPage />
  },
  {
    to: '/goals',
    label: 'Cele',
    component: <GoalsListPage />
  },
  {
    to: '/budgets',
    label: 'Budżety',
    component: <BudgetsListPage />
  },
  {
    to: '/reports',
    label: 'Raporty',
    component: <ReportsPage />
  },
  {
    to: '/accounts',
    label: 'Konta',
    component: <AccountsListPage />
  },
  {
    to: '/profile',
    label: 'Użytkownik',
    component: <UserProfilePage />
  },
  {
    to: '/settings',
    label: 'Ustawienia',
    component: <SettingsPage />
  },
  {
    to: '/help',
    label: 'Pomoc',
    component: <HelpPage />
  }
]
