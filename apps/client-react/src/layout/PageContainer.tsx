import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../context/AuthenticationContext.tsx';
import {
  ArrowLeft,
  ArrowRight,
  Bag,
  ChartPie,
  Exchange,
  Home,
  InfoCircle,
  Logout,
  SettingsAlt,
  Star,
  User,
  Wallet,
} from '../components/icons/basil/index.ts';
import Sidebar from './Sidebar.tsx';
import IconButton from '../components/buttons/IconButton.tsx';
import Typography from '../components/typography/Typography.tsx';

const PageContainer = ({ children }: PropsWithChildren) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext) as AuthenticationContextType;

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="w-screen h-full bg-slate-400 flex flex-row justify-between px-[15rem] py-4">
      {isLoggedIn ? (
        <Sidebar side="left">
          <div>
            <div> LOGO + IKONKA </div>
            <div />
            <div>
              <Typography variant="paragraph2">Menu</Typography>

              <IconButton handleClick={() => navigate('home')} variant="transparent">
                <Home size="small" />
                <Typography variant="paragraph2">Home</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('transactions')} variant="transparent">
                <Exchange size="small" />
                <Typography variant="paragraph2">Transactions</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('incomes')} variant="transparent">
                <ArrowLeft size="small" />
                <Typography variant="paragraph2">Incomes</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('expenses')} variant="transparent">
                <ArrowRight size="small" />
                <Typography variant="paragraph2">Expenses</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('goals')} variant="transparent">
                <Star size="small" />
                <Typography variant="paragraph2">Goals</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('budgets')} variant="transparent">
                <Wallet size="small" />
                <Typography variant="paragraph2">Budgets</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('reports')} variant="transparent">
                <ChartPie size="small" />
                <Typography variant="paragraph2">Reports</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('accounts')} variant="transparent">
                <Bag size="small" />
                <Typography variant="paragraph2">Accounts</Typography>
              </IconButton>
              <div className="py-2" />
              <Typography variant="paragraph2">Profile</Typography>

              <IconButton handleClick={() => navigate('profile')} variant="transparent">
                <User size="small" />
                <Typography variant="paragraph2">User</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('settings')} variant="transparent">
                <SettingsAlt size="small" />
                <Typography variant="paragraph2">Settings</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('help')} variant="transparent">
                <InfoCircle size="small" />
                <Typography variant="paragraph2">Help</Typography>
              </IconButton>
            </div>
          </div>
          <IconButton handleClick={handleLogout}>
            <Logout size="small" />
            <Typography variant="paragraph2">Log out</Typography>
          </IconButton>
        </Sidebar>
      ) : (
        <div />
      )}

      {children}

      {isLoggedIn ? (
        <Sidebar side="right">
          <a href="/home">Dashboard</a>
        </Sidebar>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PageContainer;
