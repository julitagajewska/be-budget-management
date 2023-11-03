import Logo from '../logo/Logo.tsx';
import NavigationLink from '../links/NavigationLink.tsx';
import NavigationContainer from '../containers/NavigationContainer.tsx';
import IconButton from '../buttons/IconButton.tsx';
import { Globe, Moon } from '../icons/basil/index.ts';
import Button from '../buttons/Button.tsx';

const Header = () => {
  return (
    // TODO: Separate to tailwind class
    <div className="w-full h-10 flex flex-row justify-between items-center px-48 mt-11">
      <div className="flex flex-row justify-start items-center gap-8 w-64">
        <Logo />
      </div>
      <NavigationContainer>
        <NavigationLink text="O projekcie" to="/" />
        <NavigationLink text="Strona główna" to="/" />
        <NavigationLink text="Funkcje" to="/" />
      </NavigationContainer>
      <div className="flex flex-row justify-end items-center gap-8 w-64">
        <IconButton icon={<Globe />} />
        <IconButton icon={<Moon />} />
        <Button text="Zaloguj się" />
      </div>
    </div>
  );
};

export default Header;
