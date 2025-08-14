import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import { fetchCharacterById } from '@/features/api/characterApi';
import type { Character } from '@/features/types/apiTypes';

import { useCharacterById } from './useCharacterById';

vi.mock('@/features/api/characterApi', () => ({
  fetchCharacterById: vi.fn(),
}));

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: '',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: '',
  episode: [],
  url: '',
  created: '',
};

let queryClient: QueryClient;

function wrapper({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe('useCharacterById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('calls fetchCharacterById with the correct id', async () => {
    vi.mocked(fetchCharacterById).mockResolvedValue(mockCharacter);

    renderHook(() => useCharacterById('476'), { wrapper });

    await waitFor(() => {
      expect(fetchCharacterById).toHaveBeenCalledWith('476');
    });
  });

  it('does not request again with the same id', async () => {
    vi.mocked(fetchCharacterById).mockResolvedValue(mockCharacter);

    renderHook(() => useCharacterById('1'), { wrapper });
    renderHook(() => useCharacterById('1'), { wrapper });

    await waitFor(() => {
      expect(fetchCharacterById).toHaveBeenCalledTimes(1);
    });
  });

  it('makes new requests for different ids', async () => {
    vi.mocked(fetchCharacterById).mockResolvedValue(mockCharacter);

    renderHook(() => useCharacterById('38'), { wrapper });
    renderHook(() => useCharacterById('5'), { wrapper });

    await waitFor(() => {
      expect(fetchCharacterById).toHaveBeenCalledTimes(2);
      expect(fetchCharacterById).toHaveBeenCalledWith('38');
      expect(fetchCharacterById).toHaveBeenCalledWith('5');
    });
  });
});
