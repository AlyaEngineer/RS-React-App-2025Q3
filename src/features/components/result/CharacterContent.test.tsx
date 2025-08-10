import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';

import { API_BASE_URL } from '@/config/api';
import { server } from '@/tests/mocks/server';

import CharacterContent from './CharacterContent';

const mockOnInfo = vi.fn();
const mockOnSelectCharacter = vi.fn();

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

const renderCharacterContent = (query: string) => {
  const queryClient = createQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CharacterContent
          query={query}
          currentPage={1}
          onInfo={mockOnInfo}
          onSelect={mockOnSelectCharacter}
          hasOutlet={false}
        />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('CharacterContent', () => {
  const errorCases = [
    { status: 400, message: 'Bad Request' },
    { status: 401, message: 'Unauthorized' },
    { status: 404, message: 'Not Found' },
    { status: 500, message: 'Internal Server Error' },
  ];

  errorCases.forEach(({ status, message }) => {
    it(`displays error message for status ${status}: ${message}`, async () => {
      server.use(http.get(API_BASE_URL, () => HttpResponse.json({ error: message }, { status })));

      renderCharacterContent('rick');

      const error = await screen.findByText(
        (content) => content.includes(`Error ${status}:`) && content.includes(message)
      );
      expect(error).toBeInTheDocument();
    });
  });
});
