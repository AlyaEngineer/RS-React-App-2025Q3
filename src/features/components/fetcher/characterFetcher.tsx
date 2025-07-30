import { useState, useEffect } from 'react';

import { fetchCharactersByName } from '@/features/api/characterApi';
import { ApiError, Character, Info } from '@/features/types/apiTypes';
import { CharacterFetcherProps } from '@/features/types/fetcherTypes';

export default function CharacterFetcher({
  query,
  page,
  children,
  onCharacters,
}: CharacterFetcherProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const characters = await fetchCharactersByName(query, page);
        setCharacters(characters.results);
        setInfo(characters.info);
        onCharacters?.(characters.results);
      } catch (error) {
        onCharacters?.([]);
        setCharacters([]);
        setInfo(null);

        if (
          typeof error === 'object' &&
          error !== null &&
          'status' in error &&
          'message' in error
        ) {
          setError(error as ApiError);
        } else {
          setError({ status: 0, message: 'Unexpected error' });
        }
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [query, page, onCharacters]);

  return children({ loading, error, characters, info });
}
