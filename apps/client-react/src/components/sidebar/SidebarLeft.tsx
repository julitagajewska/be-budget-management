/* eslint-disable react/jsx-no-useless-fragment */
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Container from '../../layout/Container.tsx';
import CollapsibleButton from '../buttons/CollapsibleButton.tsx';
import DarkModeButton from '../buttons/DarkModeButton.tsx';
import IconButton from '../buttons/IconButton.tsx';
import {
  Plus,
  Home,
  Star,
  Wallet,
  ChartPie,
  Bag,
  User,
  SettingsAlt,
  InfoCircle,
  Logout,
} from '../icons/basil/index.ts';
import Logo from '../logo/Logo.tsx';
import Typography from '../typography/Typography.tsx';
import { DarkModeContext, DarkModeContextType } from '../../context/DarkModeContext.tsx';
import { AuthenticationContext, AuthenticationContextType } from '../../context/AuthenticationContext.tsx';
import SidebarDivider from './SidebarDivider.tsx';

type SidebarLeftProps = {
  open: boolean;
};

const SidebarLeft = ({ open }: SidebarLeftProps) => {
  const { setIsLoggedIn } = useContext(AuthenticationContext) as AuthenticationContextType;
  const { mode } = useContext(DarkModeContext) as DarkModeContextType;
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Container variant="col-between" styles="gap-3">
      <Container variant="col-start" styles="gap-3">
        <Container variant="row-center" styles="gap-2">
          <Logo theme={`react-${mode}`} styles="w-12" />
          <Container variant="col-center" styles="opacity-80 text-font-dark">
            <Typography variant="h5" styles="font-medium">
              Personal
            </Typography>
            <Typography variant="caption" styles="mt-[-0.4rem] pb-1">
              Budget
            </Typography>
          </Container>
          <DarkModeButton />
        </Container>

        <IconButton
          handleClick={() => {}}
          layout={open ? 'icon-text-center' : 'icon-only-large'}
          shape="square"
          color="accent-1"
          fill="filled"
          icon={<Plus size="small" />}
          text="New transaction"
        />
        <Container variant="col-start" styles={open ? '' : 'items-center'}>
          <SidebarDivider text="Menu" open={open} />

          <IconButton
            handleClick={() => navigate('home')}
            layout={open ? 'icon-text-left' : 'icon-only-large'}
            icon={<Home size="small" />}
            text="Home"
          />

          <CollapsibleButton />

          <IconButton
            handleClick={() => navigate('goals')}
            layout={open ? 'icon-text-left' : 'icon-only-large'}
            icon={<Star size="small" />}
            text="Goals"
          />

          <IconButton
            handleClick={() => navigate('budgets')}
            layout={open ? 'icon-text-left' : 'icon-only-large'}
            icon={<Wallet size="small" />}
            text="Wallets"
          />

          <IconButton
            handleClick={() => navigate('reports')}
            layout={open ? 'icon-text-left' : 'icon-only-large'}
            icon={<ChartPie size="small" />}
            text="Reports"
          />

          <IconButton
            handleClick={() => navigate('accounts')}
            layout={open ? 'icon-text-left' : 'icon-only-large'}
            icon={<Bag size="small" />}
            text="Accounts"
          />

          <div className="py-2" />
          <SidebarDivider text="Profile" open={open} />

          <IconButton
            handleClick={() => navigate('profile')}
            layout={open ? 'icon-text-left' : 'icon-only-large'}
            icon={<User size="small" />}
            text="Your profile"
          />

          <IconButton
            handleClick={() => navigate('settings')}
            layout={open ? 'icon-text-left' : 'icon-only-large'}
            icon={<SettingsAlt size="small" />}
            text="Settings"
          />

          <IconButton
            handleClick={() => navigate('help')}
            layout={open ? 'icon-text-left' : 'icon-only-large'}
            icon={<InfoCircle size="small" />}
            text="Help"
          />
        </Container>
      </Container>
      <IconButton
        handleClick={handleLogout}
        layout={open ? 'icon-text-left' : 'icon-only-large'}
        icon={<Logout size="small" />}
        text="Log out"
      />
    </Container>
  );
};

export default SidebarLeft;
