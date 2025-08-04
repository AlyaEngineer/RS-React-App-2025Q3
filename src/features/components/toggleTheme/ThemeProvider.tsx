import { createContext, useContext, useState } from 'react';

import { Theme, ThemeProviderProps } from './themeTypes';
import { applyTheme } from './themeUtils';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

export const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'Current theme',
}: ThemeProviderProps) => {
  const initialTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  applyTheme(initialTheme);

  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
