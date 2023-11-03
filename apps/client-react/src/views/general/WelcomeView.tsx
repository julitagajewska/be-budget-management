import { useNavigate } from 'react-router-dom';
import LandingPageImage from '../../assets/img/landing-page-1.svg';
import Header from '../../components/header/Header.tsx';
import Button from '../../components/buttons/Button.tsx';

const WelcomeView = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      {/* WELCOME PAGE SECTION */}
      <div className="w-full h-[450px] flex flex-row justify-between items-center bg-background-50 mt-32 px-48 shadow-soft-shadow">
        <div className="w-1/2 flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-slab leading-[64px]">
              Zapanuj nad
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary-800 to-accent-400 font-bold">
                {'finansami '}
              </span>
              osobistymi
            </h1>
            <p className="w-2/3 text-lg font-mulish leading-6">
              Witaj w innowacyjnej aplikacji do zarządzania finansami osobistymi. Śledź wydatki, twórz budżet i
              kontroluj oszczędności oraz inwestycje.
            </p>
          </div>
          <div className="flex flex-row gap-10">
            <Button text="Zaloguj się" size="large" />
            <Button text="Zarejestruj się" variant="outlined" size="large" />
          </div>
        </div>
        <div>
          <img src={LandingPageImage} alt="landing page" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
