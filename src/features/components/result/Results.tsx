import { ResultsProps } from '@/features/types/searchTypes';
import { cn } from '@/libs/utils';

import CharacterContent from './CharacterContent';

export default function Results({
  searchQuery,
  currentPage,
  onInfo,
  onCharacters,
  onSelectCharacter,
  hasOutlet,
}: ResultsProps) {
  return (
    <div
      className={cn(
        'bg-dark/4',
        'shadow-3xl/20 rounded-xl',
        'flex h-auto w-full min-w-[345px] items-start justify-start gap-6',
        'p-6 max-sm:p-4',
        'backdrop-invert backdrop-opacity-5'
      )}
    >
      <div className="flex w-full flex-col items-center gap-6">
        <h2 className="text-text-content text-center text-2xl font-bold">
          Search results for the query &quot;{searchQuery}&quot;
        </h2>
        <CharacterContent
          onInfo={onInfo}
          onSelect={onSelectCharacter}
          currentPage={currentPage}
          query={searchQuery}
          hasOutlet={hasOutlet}
          onCharacters={onCharacters}
        />
      </div>
    </div>
  );
}
