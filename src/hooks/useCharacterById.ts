import { useQuery } from '@tanstack/react-query';

import { fetchCharacterById } from '@/features/api/characterApi';
import { Character } from '@/features/types/apiTypes';

export function useCharacterById(id: string) {
  return useQuery<Character>({
    queryKey: ['characterId', id],
    queryFn: () => fetchCharacterById(id),
    staleTime: 2 * 60 * 1000,
    gcTime: 4 * 60 * 1000,
  });
}
