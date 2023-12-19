import LandingPage from '../views/general/LandingPage.vue'
import LoginPage from '../views/general/LoginPage.vue'
import RegisterPage from '../views/general/RegisterPage.vue'
import NotFoundPage from '../views/general/NotFoundPage.vue'
import TransactionsListPage from '../views/transactions/TransactionsListPage.vue'
import TransactionPage from '../views/transactions/TransactionPage.vue'
import AccessDeniedPage from '../views/general/AccessDenied.vue'
import AccountsListPage from '../views/accounts/AccountsListPage.vue'
import AccountPage from '../views/accounts/AccountPage.vue'
import IncomesPage from '../views/transactions/IncomesPage.vue'
import ExpensesPage from '../views/transactions/ExpensesPage.vue'
import GoalsListPage from '../views/goals/GoalsListPage.vue'
import GoalPage from '../views/goals/GoalPage.vue'
import BudgetsListPage from '../views/budgets/BudgetsListPage.vue'
import BudgetPage from '../views/budgets/BudgetPage.vue'
import ReportsPage from '../views/reports/ReportsPage.vue'
import SettingsPage from '../views/general/SettingsPage.vue'
// import HelpPage from '../views/general/HelpPage.vue'
import LoggedOutPage from '../views/general/LoggedOutPage.vue'
import UsersProfilePage from '../views/general/UsersProfilePage.vue'

export const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/access-denied', name: 'AccessDenied', component: AccessDeniedPage },
  { path: '/accounts', name: 'Accounts', component: AccountsListPage },
  { path: '/accounts/:id', name: 'ConcreteAccount', component: AccountPage },
  { path: '/transactions', name: 'Transactions', component: TransactionsListPage },
  { path: '/transactions/incomes', name: 'Incomes', component: IncomesPage },
  { path: '/transactions/expenses', name: 'Expenses', component: ExpensesPage },
  { path: '/transactions/:id', name: 'ConcreteIncome', component: TransactionPage },
  { path: '/goals', name: 'Goals', component: GoalsListPage },
  { path: '/goals/:id', name: 'ConcreteGoal', component: GoalPage },
  { path: '/budgets', name: 'Budgets', component: BudgetsListPage },
  { path: '/budgets/:id', name: 'ConcreteBudget', component: BudgetPage },
  { path: '/reports', name: 'Reports', component: ReportsPage },
  { path: '/profile', name: 'Profile', component: UsersProfilePage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
  // { path: '/help', name: 'Help', component: HelpPage },
  { path: '/logged-out', name: 'LoggedOut', component: LoggedOutPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
]
