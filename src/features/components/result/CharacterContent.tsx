import { useEffect } from 'react';

import { ApiErrorClass } from '@/features/api/apiError';
import { Character, Info } from '@/features/types/apiTypes';
import { useCharacters } from '@/hooks/useCharacters';

import CharacterList from '../characters/CharacterList';
import CharacterListSkeleton from '../characters/CharacterListSkeleton';

export default function CharacterContent({
  onInfo,
  onSelect,
  currentPage,
  query,
  hasOutlet,
  onCharacters,
}: {
  onInfo: (info: Info | null) => void;
  onSelect: (character: Character, currentPage: number, query: string) => void;
  currentPage: number;
  query: string;
  hasOutlet: boolean;
  onCharacters?: (characters: Character[]) => void;
}) {
  const { data, isFetching, isError, error } = useCharacters(query, currentPage);

  useEffect(() => {
    if (data?.info) {
      onInfo(data.info);
    } else {
      onInfo(null);
    }
    onCharacters?.(data?.results ?? []);
  }, [data?.info, onInfo, onCharacters]);

  if (isFetching) return <CharacterListSkeleton />;
  if (isError && error instanceof ApiErrorClass)
    return (
      <p className="mb-4 text-center text-3xl font-bold text-red-400">
        Error {error.status}: {error.message ?? 'Something went wrong'}
      </p>
    );
  if (data?.results.length === 0)
    return <p className="mb-4 text-center text-3xl font-bold text-white">Nothing found</p>;

  return (
    <CharacterList
      characters={data?.results ?? []}
      onSelect={onSelect}
      currentPage={currentPage}
      query={query}
      hasOutlet={hasOutlet}
    />
  );
}
