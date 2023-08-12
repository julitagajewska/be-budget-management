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
  Plus,
  SettingsAlt,
  Star,
  Sun,
  User,
  Wallet,
} from '../components/icons/basil/index.ts';
import Sidebar from './Sidebar.tsx';
import IconButton from '../components/buttons/IconButton.tsx';
import Typography from '../components/typography/Typography.tsx';
import CollapsibleButton from '../components/buttons/CollapsibleButton.tsx';
import Logo from '../components/logo/Logo.tsx';
import { DarkModeContext, DarkModeContextType } from '../context/DarkModeContext.tsx';
import DarkModeButton from '../components/buttons/DarkModeButton.tsx';

const PageContainer = ({ children }: PropsWithChildren) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext) as AuthenticationContextType;

  const navigate = useNavigate();
  const { mode, setMode } = useContext(DarkModeContext) as DarkModeContextType;
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div
      className={`react-${mode} w-screen h-full text-font-dark flex flex-row justify-between px-[15rem] py-4 bg-primary-medium`}
    >
      {isLoggedIn ? (
        <Sidebar side="left">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Logo theme={`react-${mode}`} styles="w-12" />
              <div className="flex flex-col opacity-80 text-font-dark">
                <Typography variant="h5" styles="font-medium">
                  Personal
                </Typography>
                <Typography variant="caption" styles="mt-[-0.4rem] pb-1">
                  Budget
                </Typography>
              </div>
              <DarkModeButton />
            </div>
            <div>
              <IconButton handleClick={() => {}} variant="filled" gap={1} justify="center" shape="square">
                <Plus size="small" />
                <Typography variant="helper">New transaction</Typography>
              </IconButton>
            </div>
            <div>
              <Typography variant="helper">Menu</Typography>

              <IconButton handleClick={() => navigate('home')} variant="transparent">
                <Home size="small" />
                <Typography variant="helper">Home</Typography>
              </IconButton>

              <CollapsibleButton />

              <IconButton handleClick={() => navigate('goals')} variant="transparent">
                <Star size="small" />
                <Typography variant="helper">Goals</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('budgets')} variant="transparent">
                <Wallet size="small" color="font-light" />
                <Typography variant="helper">Budgets</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('reports')} variant="transparent">
                <ChartPie size="small" />
                <Typography variant="helper">Reports</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('accounts')} variant="transparent">
                <Bag size="small" />
                <Typography variant="helper">Accounts</Typography>
              </IconButton>
              <div className="py-2" />
              <Typography variant="helper">Profile</Typography>

              <IconButton handleClick={() => navigate('profile')} variant="transparent">
                <User size="small" />
                <Typography variant="helper">User</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('settings')} variant="transparent">
                <SettingsAlt size="small" />
                <Typography variant="helper">Settings</Typography>
              </IconButton>

              <IconButton handleClick={() => navigate('help')} variant="transparent">
                <InfoCircle size="small" />
                <Typography variant="helper">Help</Typography>
              </IconButton>
            </div>
          </div>
          <IconButton handleClick={handleLogout} variant="transparent">
            <Logout size="small" />
            <Typography variant="helper">Log out</Typography>
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
