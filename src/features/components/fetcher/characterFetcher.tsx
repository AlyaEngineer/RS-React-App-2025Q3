import { useState, useEffect } from 'react';

import { fetchCharactersByName } from '@/features/api/characterApi';
import { ApiError, Character } from '@/features/types/apiTypes';
import { CharacterFetcherProps } from '@/features/types/fetcherTypes';

export default function CharacterFetcher({ query, children }: CharacterFetcherProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const characters = await fetchCharactersByName(query);
        setCharacters(characters);
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'status' in error && 'message' in error) {
          setError(error as ApiError);
        } else {
          setError({ status: 0, message: 'Unexpected error' });
        }
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [query]);

  return children({ loading, error, characters });
}
