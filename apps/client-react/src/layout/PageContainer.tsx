import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../context/AuthenticationContext.tsx';
import { Home } from '../components/icons/basil/index.ts';
import Sidebar from './Sidebar.tsx';
import IconButton from '../components/buttons/IconButton.tsx';

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
            <div>
              <IconButton icon={<Home size="small" />} handleClick={() => navigate('/')} />
            </div>
            <div> Nawigacja</div>
          </div>
          <IconButton icon={<Home size="small" />} text="Log out" handleClick={handleLogout} />
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
