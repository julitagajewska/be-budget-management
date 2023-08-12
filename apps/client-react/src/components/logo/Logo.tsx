import ReactLight from '../../assets/logo/logo-react-light.svg';
import ReactDark from '../../assets/logo/logo-react-dark.svg';
import VueLight from '../../assets/logo/logo-vue-light.svg';
import VueDark from '../../assets/logo/logo-vue-dark.svg';
import QwikLight from '../../assets/logo/logo-qwik-light.svg';
import QwikDark from '../../assets/logo/logo-qwik-dark.svg';

type LogoThemeType = {
  'react-light': string;
  'react-dark': string;
  'vue-light': string;
  'vue-dark': string;
  'qwik-light': string;
  'qwik-dark': string;
};

const logoThemes: LogoThemeType = {
  'react-light': ReactLight,
  'react-dark': ReactDark,
  'vue-light': VueLight,
  'vue-dark': VueDark,
  'qwik-light': QwikLight,
  'qwik-dark': QwikDark,
};

type LogoProps = {
  theme: keyof LogoThemeType;
  styles?: string;
};

const Logo = ({ theme, styles }: LogoProps) => {
  const selectedLogo = logoThemes[theme];

  return <img src={selectedLogo} alt="Logo" className={`${styles}`} />;
};

Logo.defaultProps = {
  styles: '',
} as Pick<LogoProps, keyof LogoProps>;

export default Logo;
