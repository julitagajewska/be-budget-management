import { PropsWithChildren, useContext } from 'react';
import { AuthenticationContext, AuthenticationContextType } from '../context/AuthenticationContext.tsx';
import { DarkModeContext, DarkModeContextType } from '../context/DarkModeContext.tsx';
import SidebarContainer from './SidebarContainer.tsx';

const PageContainer = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useContext(AuthenticationContext) as AuthenticationContextType;
  const { mode } = useContext(DarkModeContext) as DarkModeContextType;

  return (
    <div
      className={`react-${mode} w-full h-full text-font-dark flex flex-row justify-between px-[15rem] py-4 bg-primary-dark`}
    >
      {isLoggedIn ? <SidebarContainer side="left" /> : <div />}

      {children}

      {isLoggedIn ? <SidebarContainer side="right" /> : <div />}
    </div>
  );
};

export default PageContainer;
