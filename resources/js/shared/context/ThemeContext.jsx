import { createContext, useState } from 'react';
import { useLocalStorage } from 'shared/hooks/useStorage';


const initialValue = {
  darkMode: 'Default',
  toggleTheme: () => {},
};

export const MyThemeContext = createContext(initialValue);

export const MyThemeContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useLocalStorage('theme', 'Default');
  const [darkMode, setDarkMode] = useState<string>(darkTheme);

  const toggleTheme = () => {
    setDarkTheme(darkMode === 'Default' ? 'Dark' : 'Default');
    setDarkMode(darkMode === 'Default' ? 'Dark' : 'Default');
  };

  return (
    <MyThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </MyThemeContext.Provider>
  );
};

export default MyThemeContextProvider;
