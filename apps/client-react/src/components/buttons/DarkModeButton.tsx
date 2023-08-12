import React, { useContext } from 'react';
import { Moon, Sun } from '../icons/basil/index.ts';
import { DarkModeContext, DarkModeContextType } from '../../context/DarkModeContext.tsx';

const DarkModeButton = () => {
  const { mode, setMode } = useContext(DarkModeContext) as DarkModeContextType;
  return (
    <button
      type="button"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      className={`rounded-full p-1 ${
        mode === 'light' ? 'bg-black' : 'bg-white'
      } bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 ease-in-out`}
    >
      <div
        className={`absolute ${
          mode === 'light' ? 'rotate-0 opacity-100' : 'rotate-[-90deg] opacity-0'
        } transition-all duration-500 ease-in-out`}
      >
        <Sun size="small" />
      </div>
      <div
        className={`${
          mode === 'light' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
        } transition-all duration-500 ease-in-out`}
      >
        <Moon size="small" color="white" />
      </div>
    </button>
  );
};

export default DarkModeButton;
