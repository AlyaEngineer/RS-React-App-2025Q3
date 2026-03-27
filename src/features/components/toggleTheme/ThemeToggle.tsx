'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from './useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="toggle-button"
      className="hover:text-button-reload cursor-pointer p-2 transition-colors duration-300"
    >
      {theme === 'dark' ? <Sun strokeWidth={1.5} /> : <Moon strokeWidth={1.5} />}
    </button>
  );
}
