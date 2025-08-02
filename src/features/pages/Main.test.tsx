import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

import { ApiError, Character } from '../types/apiTypes';

import Main from './Main';

interface Data {
  loading: boolean;
  error: ApiError | null;
  characters: Character[];
}

vi.mock('../components/fetcher/characterFetcher', () => ({
  default: ({ children }: { children: (data: Data) => ReactNode }) => {
    const characters = Array.from({ length: 20 }, (_, i) => ({
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
    }));

    const data = {
      loading: false,
      error: null,
      characters,
    };

    return children(data);
  },
}));

describe('Main', () => {
  test('Main renders 20 characters on initial load', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    const items = await screen.findAllByLabelText('character-item');
    expect(items).toHaveLength(20);
  });
});
