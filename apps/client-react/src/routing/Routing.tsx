import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
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
  WelcomeView,
} from '../views/index.ts';
import PrivateRoutes from '../utils/PrivateRoutes.tsx';

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
          <Route path="accounts" element={<LoginView />}>
            <Route path=":id" element={<LoginView />} />
          </Route>
          <Route path="reports" element={<LoginView />} />
          <Route path="profile" element={<LoginView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
