import { createContext } from 'react';

import { Theme } from './themeTypes';

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);
