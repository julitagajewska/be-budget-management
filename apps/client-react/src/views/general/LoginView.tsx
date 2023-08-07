import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../../context/AuthenticationContext.tsx';
import Typography from '../../components/typography/Typography.tsx';
import IconButton from '../../components/buttons/IconButton.tsx';

const LoginView = () => {
  const { setIsLoggedIn } = useContext(AuthenticationContext) as AuthenticationContextType;

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/home');
  };

  return (
    <div className="h-[200vh] w-full bg-slate-200 rounded-xl">
      <Typography variant="h1"> Login page</Typography>
      <IconButton handleClick={handleLogin} variant="filled">
        <Typography variant="paragraph2">Login</Typography>
      </IconButton>
    </div>
  );
};

export default LoginView;
