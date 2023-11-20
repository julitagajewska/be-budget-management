import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../../context/AuthenticationContext.tsx';
import Typography from '../../components/typography/Typography.tsx';
import circleLarge from '../../assets/react-backgrounds/circle-large-light.svg'
import ContainerSVG from '../../components/ContainerSVG.tsx';
import BackgroundContainer from '../../components/background/BackgroundContainer.tsx';

const LoginView = () => {
  const { setIsLoggedIn } = useContext(AuthenticationContext) as AuthenticationContextType;

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/home');
  };

  return (
    <div className="h-[100vh] w-full rounded-xl flex flex-col justify-center">
      <div className="absolute top-10 left-16">
        <Typography variant="caption">Budżet</Typography>
        <Typography variant="h5" bold className="text-sky-500 absolute top-4">Osobisty</Typography>
      </div>
      
      <div className="w-full bg-white shadow-lg flex flex-col gap-10 py-16 px-20 text-primary-700 relative z-30">
        <Typography variant="h4" bold className="text-sky-600">
          Witaj
          <br />
          ponownie!
        </Typography>

        <form className="flex flex-col gap-6">
          <label htmlFor="username-input" className="flex flex-col gap-2">
            <Typography variant="caption" bold>Nazwa użytkownika</Typography>
            <input type="text" id="username-input" className="border-[1px] border-neutral-400 rounded-md py-2 px-3" placeholder="Nazwa użytkownika" />
          </label>

          <div className="flex flex-col gap-2">
            <label htmlFor="Password-input" className="flex flex-col gap-2">
              <Typography variant="caption" bold>Hasło</Typography>
              <input type="password" id="Password-input" className="border-[1px] border-neutral-400 rounded-md py-2 px-3" placeholder="******************" />
            </label>

            <div className="flex flex-row justify-between">
              <label htmlFor="remember-me-checkbox" className="flex flex-row gap-2 items-center">
                <input type="checkbox" id="remember-me-checkbox" />
                <Typography variant="caption" bold>Zapamiętaj</Typography>
              </label>
              <a href="/"><Typography variant="caption" bold className="text-sky-500">Nie pamiętasz hasła?</Typography></a>
            </div>
          </div>
        </form>

        <div className="flex flex-col w-full items-center gap-3">
          <button type="submit" className="w-full rounded-xl bg-sky-500 text-white py-[10px] shadow-blue-light"><Typography variant="caption" bold className="font-semibold">ZALOGUJ SIĘ</Typography></button>
          <div className="flex flex-row gap-2 items-center">
            <Typography variant="caption" bold>Nie masz konta?</Typography>
            <a href="/"><Typography variant="caption" bold className="text-sky-500">Zarejestruj się</Typography></a>
          </div>
        </div>
      </div>

      <BackgroundContainer />
    </div>
  );
};

export default LoginView;
