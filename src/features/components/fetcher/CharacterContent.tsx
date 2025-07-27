import { useEffect } from 'react';

import { ApiError, Character, Info } from '@/features/types/apiTypes';

import CharacterList from '../characters/CharacterList';
import CharacterListSkeleton from '../characters/CharacterListSkeleton';

export default function CharacterContent({
  data,
  onInfo,
}: {
  data: {
    loading: boolean;
    error: ApiError | null;
    characters: Character[];
    info: Info | null;
  };
  onInfo: (info: Info | null) => void;
}) {
  useEffect(() => {
    onInfo(data.info);
  }, [data.info, onInfo]);

  if (data.loading) return <CharacterListSkeleton />;
  if (data.error)
    return (
      <p className="mb-4 text-center text-3xl font-bold text-red-400">
        Error {data.error.status}: {data.error.message ?? 'Something went wrong'}
      </p>
    );
  if (data.characters.length === 0)
    return <p className="mb-4 text-center text-3xl font-bold text-white">Nothing found</p>;

  return <CharacterList characters={data.characters} />;
}
