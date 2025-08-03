import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach } from 'vitest';

import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const renderWithProvider = () => {
  render(
    <ThemeProvider defaultTheme="dark" storageKey="Current theme">
      <ThemeToggle />
    </ThemeProvider>,
  );
};

describe('ThemeToggle', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('saves switching theme value in localStorage and updates <html> class, saves the theme after page reload', async () => {
    const user = userEvent.setup();

    renderWithProvider();

    expect(localStorage.getItem('Current theme')).toBeNull();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(screen.getByRole('button', { name: /toggle-button/i }));

    expect(localStorage.getItem('Current theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);

    await user.click(screen.getByRole('button', { name: /toggle-button/i }));

    expect(localStorage.getItem('Current theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    renderWithProvider();

    expect(localStorage.getItem('Current theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
