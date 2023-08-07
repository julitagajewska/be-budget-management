import { PropsWithChildren, createContext, useMemo, useState } from 'react';

// TODO - change it so it uses database
export type AuthenticationContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null);

export const AuthenticationContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const value = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};
