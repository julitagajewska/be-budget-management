import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import IconButton from '../../components/buttons/IconButton.tsx';
import Typography from '../../components/typography/Typography.tsx';
import { AuthenticationContext, AuthenticationContextType } from '../../context/AuthenticationContext.tsx';

const WelcomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[200vh] w-full bg-slate-200 rounded-xl">
      <IconButton handleClick={() => navigate('login')} variant="filled">
        <Typography variant="paragraph2">Login</Typography>
      </IconButton>
      <IconButton handleClick={() => navigate('register')} variant="filled">
        <Typography variant="paragraph2">Register</Typography>
      </IconButton>
    </div>
  );
};

export default WelcomeView;
