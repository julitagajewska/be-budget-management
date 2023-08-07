import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  AccountDetailsView,
  AccountsView,
  BudgetDetailsView,
  BudgetsView,
  ExpensesView,
  GoalDetailsView,
  GoalsView,
  HomeView,
  IncomesView,
  LoginView,
  RegisterView,
  SettingsView,
  TransactionDetailsView,
  TransactionsView,
  UsersProfileView,
  WelcomeView,
} from '../views/index.ts';
import PrivateRoutes from '../utils/PrivateRoutes.tsx';
import HelpView from '../views/general/HelpView.tsx';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes isPublic />}>
          <Route path="" element={<WelcomeView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
        </Route>
        <Route element={<PrivateRoutes isPublic={false} />}>
          <Route path="home" element={<HomeView />} />
          <Route path="transactions" element={<TransactionsView />}>
            <Route path=":id" element={<TransactionDetailsView />} />
          </Route>
          <Route path="incomes" element={<IncomesView />} />
          <Route path="expenses" element={<ExpensesView />} />
          <Route path="budgets" element={<BudgetsView />}>
            <Route path=":id" element={<BudgetDetailsView />} />
          </Route>
          <Route path="goals" element={<GoalsView />}>
            <Route path=":id" element={<GoalDetailsView />} />
          </Route>
          <Route path="accounts" element={<AccountsView />}>
            <Route path=":id" element={<AccountDetailsView />} />
          </Route>
          <Route path="reports" element={<RegisterView />} />
          <Route path="profile" element={<UsersProfileView />} />
          <Route path="settings" element={<SettingsView />} />
          <Route path="help" element={<HelpView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
