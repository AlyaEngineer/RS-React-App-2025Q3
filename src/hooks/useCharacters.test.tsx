import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect } from 'vitest';

import { API_BASE_URL } from '@/config/api';
import { server } from '@/tests/mocks/server';

import { useCharacters } from './useCharacters';

describe('useCharacters hook', () => {
  const createQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

  function wrapper({ children }: { children: React.ReactNode }) {
    const queryClient = createQueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  it('fetch character successfully', async () => {
    const { result } = renderHook(() => useCharacters('rick', 1), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.results[0].name).toBe('Rick Sanchez');
  });

  it('returns all results for empty query', async () => {
    const { result } = renderHook(() => useCharacters('', 1), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.results).toHaveLength(20);
  });

  it('handles error from API', async () => {
    server.use(
      http.get(`${API_BASE_URL}`, ({ request }) => {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');

        if (name === 'error') {
          return HttpResponse.json({ error: 'Something went wrong' }, { status: 500 });
        }

        return HttpResponse.json({ results: [] });
      })
    );

    const { result } = renderHook(() => useCharacters('error', 1), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
