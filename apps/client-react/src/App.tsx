import './translations/i18next.ts';
import { AuthenticationContextProvider } from './context/AuthenticationContext.tsx';
import Routing from './routing/Routing.tsx';
import { DarkModeContextProvider } from './context/DarkModeContext.tsx';

const App = () => {
  return (
    <AuthenticationContextProvider>
      <DarkModeContextProvider>
        <Routing />
      </DarkModeContextProvider>
    </AuthenticationContextProvider>
  );
};

export default App;
