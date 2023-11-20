import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../context/AuthenticationContext.tsx';
import PageContainer from '../layout/PageContainer.tsx';

type PrivateRoutesProps = {
  isPublic: boolean;
};

const PrivateRoutes = ({ isPublic }: PrivateRoutesProps) => {
  const { isLoggedIn } = useContext(AuthenticationContext) as AuthenticationContextType;

  if (isLoggedIn && isPublic) return <Navigate to="/home" />;
  if (!isLoggedIn && !isPublic) return <Navigate to="/" />;

  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
};

export default PrivateRoutes;
