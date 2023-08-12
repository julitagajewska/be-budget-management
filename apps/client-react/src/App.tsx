import './translations/i18next.ts';
import { AuthenticationContextProvider } from './context/AuthenticationContext.tsx';
import Routing from './routing/Routing.tsx';

const App = () => {
  return (
    <AuthenticationContextProvider>
      <Routing />
    </AuthenticationContextProvider>
  );
};

export default App;
