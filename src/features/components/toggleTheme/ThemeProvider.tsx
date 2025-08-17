'use client';

import { useState, useEffect } from 'react';

import { ThemeContext } from './ThemeContext';
import { ThemeProviderProps, Theme } from './themeTypes';
import { applyTheme } from './themeUtils';

export const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'Current theme',
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const storedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    setThemeState(storedTheme);
    applyTheme(storedTheme);
  }, [defaultTheme, storageKey]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
