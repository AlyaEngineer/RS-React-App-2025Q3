'use client';

import { RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

import { ApiErrorClass } from '@/features/api/apiError';
import { Character, Info } from '@/features/types/apiTypes';

import CharacterList from '../characters/CharacterList';
import CharacterListSkeleton from '../characters/CharacterListSkeleton';

type CharacterContentProps = {
  data?: {
    info: Info;
    results: Character[];
  };
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onInfoAction: (info: Info | null) => void;
  onSelectAction: (character: Character, currentPage: number, query: string) => void;
  currentPage: number;
  query: string;
  hasOutlet: boolean;
  onCharactersAction?: (characters: Character[]) => void;
};

export default function CharacterContent({
  data,
  isFetching,
  isLoading,
  isError,
  error,
  onInfoAction,
  onSelectAction,
  currentPage,
  query,
  hasOutlet,
  onCharactersAction,
}: CharacterContentProps) {
  useEffect(() => {
    if (data?.info) {
      onInfoAction(data.info);
    } else {
      onInfoAction(null);
    }
    onCharactersAction?.(data?.results ?? []);
  }, [data?.info, onInfoAction, onCharactersAction, data?.results]);

  if (isLoading) return <CharacterListSkeleton />;
  if (isFetching)
    return <RefreshCw className="m-2.5 animate-spin text-white" size={28} strokeWidth={1.25} />;

  if (isError) {
    const apiError = error as ApiErrorClass | undefined;
    return (
      <p className="mb-4 text-center text-3xl font-bold text-red-400">
        Error {apiError?.status ?? ''}: {apiError?.message ?? 'Something went wrong'}
      </p>
    );
  }
  if (data?.results.length === 0)
    return <p className="mb-4 text-center text-3xl font-bold text-white">Nothing found</p>;

  return (
    <CharacterList
      characters={data?.results ?? []}
      onSelect={onSelectAction}
      currentPage={currentPage}
      query={query}
      hasOutlet={hasOutlet}
    />
  );
}
