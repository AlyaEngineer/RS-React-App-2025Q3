import { Character } from '@/features/types/apiTypes';
import { CharacterListProps } from '@/features/types/viewTypes';

import CharacterItem from './CharacterItem';

export default function CharacterList({
  characters,
  onSelect,
  currentPage,
  query,
}: CharacterListProps & { currentPage: number; query: string }) {
  const handleSelect = (character: Character) => {
    onSelect(character, currentPage, query);
  };

  return (
    <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {characters.map((char: Character) => (
        <li key={char.id} aria-label="character-item">
          <CharacterItem
            character={char}
            onSelect={handleSelect}
            currentPage={currentPage}
            query={query}
          />
        </li>
      ))}
    </ul>
  );
}
