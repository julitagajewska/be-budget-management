import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react'

type DarkModeContextType = {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null)

export const DarkModeContextProvider = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(true)

  const value = useMemo(() => ({ darkMode, setDarkMode }), [darkMode])

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
}
