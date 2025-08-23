'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchCharactersByName } from '@/features/api/characterApi';
import { CharacterResponse } from '@/features/types/apiTypes';

export function useCharacters(query: string, page = 1, initialData?: CharacterResponse) {
  const trimmedQuery = query.trim();

  return useQuery({
    queryKey: ['characters', trimmedQuery, page],
    queryFn: () => fetchCharactersByName(trimmedQuery, page),
    staleTime: 2 * 60 * 1000,
    gcTime: 4 * 60 * 1000,
    initialData: page === 1 && trimmedQuery === '' ? initialData : undefined,
  });
}
