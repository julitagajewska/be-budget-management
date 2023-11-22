import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../views/general/HomePage'
import AccountsListPage from '../views/accounts/AccountsListPage'
import AccountPage from '../views/accounts/AccountPage'
import BudgetPage from '../views/budgets/BudgetPage'
import BudgetsListPage from '../views/budgets/BudgetsListPage'
import GoalPage from '../views/goals/GoalPage'
import GoalsListPage from '../views/goals/GoalsListPage'
import HelpPage from '../views/general/HelpPage'
import LoggedOutPage from '../views/general/LoggedOutPage'
import LoginPage from '../views/general/LoginPage'
import NotFoundPage from '../views/general/NotFoundPage'
import RegisterPage from '../views/general/RegisterPage'
import SettingsPage from '../views/general/SettingsPage'
import UserProfilePage from '../views/general/UserProfilePage'
import ReportsPage from '../views/reports/ReportsPage'
import ExpensesPage from '../views/transactions/ExpensesPage'
import IncomesPage from '../views/transactions/IncomesPage'
import TransactionPage from '../views/transactions/TransactionPage'
import AccessDeniedPage from '../views/general/AccessDeniedPage'
import TransactionsListPage from '../views/transactions/TransactionsListPage'
import { routes } from './routes'

const Routing = () => {
  return (
    <Routes>
      {routes.map((r) => (
        <Route path={r.to} element={r.component} />
      ))}
      {/* <Route path="" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="/accounts" element={<AccountsListPage />} />
      <Route path="/accounts/:id" element={<AccountPage />} />
      <Route path="/transactions" element={<TransactionsListPage />} />
      <Route path="/transactions/incomes" element={<IncomesPage />} />
      <Route path="/transactions/expenses" element={<ExpensesPage />} />
      <Route path="/transactions/:id" element={<TransactionPage />} />
      <Route path="/goals" element={<GoalsListPage />} />
      <Route path="/goals/:id" element={<GoalPage />} />
      <Route path="/budgets" element={<BudgetsListPage />} />
      <Route path="/budgets/:id" element={<BudgetPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/logged-out" element={<LoggedOutPage />} />
      <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default Routing
