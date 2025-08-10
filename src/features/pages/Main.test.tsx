import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import Main from './Main';

const mockData = {
  info: { pages: 10 },
  results: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  })),
};

vi.mock('@/hooks/useCharacters', () => ({
  useCharacters: () => ({
    data: mockData,
    isFetching: false,
    isError: false,
    error: null,
  }),
}));

describe('Main', () => {
  it('Main renders 20 characters on initial load', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    const items = await screen.findAllByLabelText('character-item');
    expect(items).toHaveLength(20);
  });
});
