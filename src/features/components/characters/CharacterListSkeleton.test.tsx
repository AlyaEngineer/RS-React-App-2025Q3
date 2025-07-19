import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { http, HttpResponse, delay } from 'msw';
import { describe, expect, it } from 'vitest';

import { API_BASE_URL } from '@/config/api';
import { server } from '@/tests/mocks/server';

import Results from '../Results';
describe('CharacterListSkeleton', () => {
  it('renders skeletons during loading and shows characters after data is fetched', async () => {
    server.use(
      http.get(API_BASE_URL, async ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('name');
        if (query !== 'morty') {
          return HttpResponse.json({ results: [] });
        }
        await delay(300);
        return HttpResponse.json({
          results: [
            {
              name: 'Morty Smith',
              species: 'Human',
              gender: 'Male',
              image: 'https://example.com/morty.png',
              location: { name: 'Citadel of Ricks' },
            },
          ],
        });
      })
    );
    render(<Results searchQuery="morty" />);
    const skeletons = await screen.findAllByLabelText('character-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
    await waitForElementToBeRemoved(() => screen.queryAllByLabelText('character-skeleton'));
    expect(await screen.findByText(/morty smith/i)).toBeInTheDocument();
  });
});
