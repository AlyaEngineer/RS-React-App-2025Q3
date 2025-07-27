import { ResultsProps } from '@/features/types/searchTypes';
import { cn } from '@/libs/utils';

import CharacterDetails from '../characters/CharacterDetails';

import CharacterContent from './CharacterContent';
import CharacterFetcher from './characterFetcher';

export default function Results({
  searchQuery,
  currentPage,
  onInfo,
  onCharacters,
  detailsId,
  onCloseDetails,
}: ResultsProps) {
  return (
    <CharacterFetcher query={searchQuery} page={currentPage} onCharacters={onCharacters}>
      {({ loading, error, characters, info }) => {
        onInfo?.(info);

        const selectedCharacter = characters.find((char) => String(char.id) === detailsId);

        return (
          <div
            className={cn(
              'bg-dark/4',
              'shadow-3xl/20 rounded-xl',
              'flex h-auto w-full items-start justify-start gap-6',
              'p-6 max-sm:p-4',
              'backdrop-invert backdrop-opacity-5'
            )}
          >
            <div className="flex w-full flex-col items-center gap-6">
              <h2 className="text-center text-2xl font-bold text-white">
                Search results for the query &quot;{searchQuery}&quot;
              </h2>
              <CharacterContent data={{ loading, error, characters, info }} onInfo={onInfo} />
            </div>

            {selectedCharacter && (
              <div className="sticky top-1 h-auto w-80 rounded-md border border-none bg-slate-700/80 p-4">
                <CharacterDetails character={selectedCharacter} onClose={onCloseDetails} />
              </div>
            )}
          </div>
        );
      }}
    </CharacterFetcher>
  );
}
