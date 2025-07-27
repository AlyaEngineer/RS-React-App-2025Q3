import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { API_BASE_URL } from '@/config/api';
import { server } from '@/tests/mocks/server';

import Results from './Results';

describe('Results', () => {
  it('renders correct number of character items when data is provided', async () => {
    const mockOnInfo = vi.fn();
    server.use(
      http.get(API_BASE_URL, ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('name');
        if (query !== 'rick') {
          return HttpResponse.json({ results: [] });
        }
        return HttpResponse.json({
          results: [
            {
              id: 1,
              name: 'Rick Sanchez',
              species: 'Human',
              gender: 'Male',
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              location: { name: 'Citadel of Ricks' },
            },
            {
              id: 2,
              name: 'Adjudicator Rick',
              species: 'Human',
              gender: 'Male',
              image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
              location: { name: 'Citadel of Ricks' },
            },
          ],
        });
      })
    );

    render(
      <MemoryRouter>
        <Results searchQuery="rick" currentPage={1} onInfo={mockOnInfo} />
      </MemoryRouter>
    );
    await waitForElementToBeRemoved(() => screen.queryAllByLabelText('character-skeleton'));
    const characters = await screen.findAllByLabelText('character-item');
    expect(characters.length).toBe(2);
  });

  it('correctly displays item names and descriptions (renders Rick Sanchez data from default handler)', async () => {
    const mockOnInfo = vi.fn();
    render(
      <MemoryRouter>
        <Results searchQuery="rick" currentPage={1} onInfo={mockOnInfo} />
      </MemoryRouter>
    );
    await waitForElementToBeRemoved(() => screen.queryAllByLabelText('character-skeleton'));

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes('Human'))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes('Male'))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes('Citadel of Ricks'))).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /rick sanchez/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://rickandmortyapi.com/api/character/avatar/1.jpeg');
  });

  it('displays "Nothing found" message when data array is empty', async () => {
    const mockOnInfo = vi.fn();
    server.use(
      http.get(API_BASE_URL, ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('name');
        if (query === 'unknown') {
          return HttpResponse.json({ results: [] });
        }
        return HttpResponse.json({ results: [] });
      })
    );

    render(<Results searchQuery="unknown" currentPage={1} onInfo={mockOnInfo} />);
    await waitForElementToBeRemoved(() => screen.queryAllByLabelText('character-skeleton'));
    const message = await screen.findByText(/nothing found/i);
    expect(message).toBeInTheDocument();
  });

  type ErrorCase = { status: number; message: string };

  const errorCases: ErrorCase[] = [
    { status: 400, message: 'Bad Request' },
    { status: 401, message: 'Unauthorized' },
    { status: 404, message: 'Not Found' },
    { status: 500, message: 'Internal Server Error' },
  ];

  errorCases.forEach(({ status, message }) => {
    const mockOnInfo = vi.fn();
    it(`displays error message for status ${status}: ${message}`, async () => {
      server.use(http.get(API_BASE_URL, () => HttpResponse.json({ error: message }, { status })));

      render(<Results searchQuery="rick" currentPage={1} onInfo={mockOnInfo} />);

      const error = await screen.findByText(new RegExp(`Error ${status}: ${message}`, 'i'));
      expect(error).toBeInTheDocument();
    });
  });
});
