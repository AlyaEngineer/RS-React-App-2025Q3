import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { API_BASE_URL } from '@/config/api';
import { ApiErrorClass } from '@/features/api/apiError';
import { Character } from '@/features/types/apiTypes';
import { server } from '@/tests/mocks/server';

import CharacterContent from './CharacterContent';

const mockOnInfo = vi.fn();
const mockOnSelectCharacter = vi.fn();

describe('CharacterContent', () => {
  it('renders CharacterList when data is present', () => {
    const mockCharacter: Character = {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: '',
    };

    const mockData = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [mockCharacter],
    };

    render(
      <MemoryRouter>
        <CharacterContent
          data={mockData}
          isFetching={false}
          isLoading={false}
          isError={false}
          error={null}
          onInfo={mockOnInfo}
          onSelect={mockOnSelectCharacter}
          currentPage={1}
          query="rick"
          hasOutlet={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rick/)).toBeInTheDocument();
  });

  const errorCases = [
    { status: 400, message: 'Bad Request' },
    { status: 401, message: 'Unauthorized' },
    { status: 404, message: 'Not Found' },
    { status: 500, message: 'Internal Server Error' },
  ];

  errorCases.forEach(({ status, message }) => {
    it(`displays error message for status ${status}: ${message}`, async () => {
      server.use(http.get(API_BASE_URL, () => HttpResponse.json({ error: message }, { status })));
      const errorObj = new ApiErrorClass(status, message);
      render(
        <MemoryRouter>
          <CharacterContent
            data={undefined}
            isFetching={false}
            isLoading={false}
            isError={true}
            error={errorObj}
            onInfo={mockOnInfo}
            onSelect={mockOnSelectCharacter}
            currentPage={1}
            query="rick"
            hasOutlet={false}
          />
        </MemoryRouter>
      );

      const error = await screen.findByText(
        (content) => content.includes(`Error ${status}:`) && content.includes(message)
      );
      expect(error).toBeInTheDocument();
    });
  });
});
