import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';

import Search from './Search';

describe('Search', () => {
  it('renders input and button', () => {
    render(
      <MemoryRouter>
        <Search onSearch={() => {}} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search the rick and morty multiverse/i);
    const button = screen.getByRole('button', { name: /let's search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows empty input if nothing saved in localStorage', () => {
    localStorage.removeItem('searchQuery');

    render(
      <MemoryRouter>
        <Search onSearch={() => {}} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search the rick and morty multiverse/i);

    expect(input).toHaveValue('');
  });

  it('shows saved searchQuery from localStorage if it exists', () => {
    localStorage.setItem('searchQuery', 'rick');

    render(
      <MemoryRouter>
        <Search onSearch={() => {}} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search the rick and morty multiverse/i);

    expect(input).toHaveValue('rick');
  });

  it('saves trimmed searchQuery to localStorage on click', async () => {
    const user = userEvent.setup();
    const mockSearch = vi.fn();
    render(
      <MemoryRouter>
        <Search onSearch={mockSearch} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search the rick and morty multiverse/i);
    const button = screen.getByRole('button', { name: /let's search/i });

    await user.clear(input);
    await user.type(input, ' morty ');
    await user.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('morty');
    expect(mockSearch).toHaveBeenCalledWith('morty');
  });

  it('displays saved searchQuery from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'rick');

    render(
      <MemoryRouter>
        <Search onSearch={vi.fn()} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search the rick and morty multiverse/i);
    expect(input).toHaveValue('rick');
  });
});
