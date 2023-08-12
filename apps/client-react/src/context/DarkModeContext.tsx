import { Dispatch, PropsWithChildren, SetStateAction, createContext, useMemo, useState } from 'react';

// TODO - change it so it uses database
export type DarkModeContextType = {
  mode: 'light' | 'dark';
  setMode: Dispatch<SetStateAction<string>>;
};

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeContextProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState('light');

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return <DarkModeContext.Provider value={value as DarkModeContextType}>{children}</DarkModeContext.Provider>;
};
