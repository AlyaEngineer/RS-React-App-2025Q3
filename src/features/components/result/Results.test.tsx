import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_BASE_URL } from '@/config/api';
import { server } from '@/tests/mocks/server';

import Results from './Results';

describe('Results', () => {
  let queryClient: QueryClient;
  const mockOnInfo = vi.fn();
  const mockOnSelectCharacter = vi.fn();

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  const renderResults = (searchQuery: string) => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Results
            searchQuery={searchQuery}
            currentPage={1}
            onInfo={mockOnInfo}
            onSelectCharacter={mockOnSelectCharacter}
            hasOutlet={false}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('renders correct number of character items when data is provided', async () => {
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

    renderResults('rick');
    await waitForElementToBeRemoved(() => screen.queryAllByLabelText('character-skeleton'));
    const characters = await screen.findAllByLabelText('character-item');
    expect(characters.length).toBe(2);
  });

  it('correctly displays item names and descriptions (renders Rick Sanchez data from default handler)', async () => {
    renderResults('rick');
    const skeletons = await screen.findAllByLabelText('character-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
    await waitFor(() => {
      expect(screen.queryByLabelText('character-skeleton')).not.toBeInTheDocument();
    });

    const characterItem = screen.getByText('Rick Sanchez').closest('li');
    expect(characterItem).toBeInTheDocument();
    expect(within(characterItem!).getByTestId('character-race')).toHaveTextContent('Human');
    expect(within(characterItem!).getByTestId('character-gender')).toHaveTextContent('Male');

    const img = within(characterItem!).getByRole('img', { name: /rick sanchez/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://rickandmortyapi.com/api/character/avatar/1.jpeg');
  });

  it('displays "Nothing found" message when data array is empty', async () => {
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

    renderResults('unknown');
    await waitForElementToBeRemoved(() => screen.queryAllByLabelText('character-skeleton'));
    const message = await screen.findByText(/nothing found/i);
    expect(message).toBeInTheDocument();
  });
});
