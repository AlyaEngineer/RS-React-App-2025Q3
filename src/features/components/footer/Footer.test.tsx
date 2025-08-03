import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { ThemeProvider } from '../toggleTheme/ThemeProvider';

import Footer from './Footer';

describe('Footer', () => {
  const renderWithProviders = () =>
    render(
      <ThemeProvider defaultTheme="light">
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </ThemeProvider>
    );

  it('renders footer component', () => {
    renderWithProviders();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About us')).toBeInTheDocument();
    expect(screen.getByText('Rolling Scopes School / React Course')).toBeInTheDocument();
  });

  it('has correct internal links', () => {
    renderWithProviders();

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('About us').closest('a')).toHaveAttribute('href', '/about');
  });
});
