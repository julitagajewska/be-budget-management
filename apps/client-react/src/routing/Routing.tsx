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
        <Route path="" element={<WelcomeView />} />
        <Route path="login" element={<LoginView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
