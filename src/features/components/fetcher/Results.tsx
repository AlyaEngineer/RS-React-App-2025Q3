import { ResultsProps } from '@/features/types/searchTypes';
import { cn } from '@/libs/utils';

import CharacterContent from './CharacterContent';
import CharacterFetcher from './characterFetcher';

export default function Results({ searchQuery, currentPage, onInfo }: ResultsProps) {
  return (
    <div
      className={cn(
        'bg-dark/4',
        'shadow-3xl/20 rounded-xl',
        'flex h-auto w-full flex-col items-center justify-center gap-8',
        'p-6 max-sm:p-4',
        'backdrop-invert backdrop-opacity-5'
      )}
    >
      <h2 className="text-center text-2xl font-bold text-white">
        Search results for the query &quot;{searchQuery}&quot;
      </h2>

      <CharacterFetcher query={searchQuery} page={currentPage}>
        {(data) => <CharacterContent data={data} onInfo={onInfo} />}
      </CharacterFetcher>
    </div>
  );
}
