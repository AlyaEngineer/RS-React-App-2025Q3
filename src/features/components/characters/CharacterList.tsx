import { Component } from 'react';

import { Character } from '@/features/types/apiTypes';
import { CharacterItemsProps } from '@/features/types/viewTypes';

import CharacterItem from './CharacterItem';

class CharacterItems extends Component<CharacterItemsProps> {
  render() {
    const { characters } = this.props;
    return (
      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {characters.map((char: Character) => (
          <li key={char.id} aria-label="character-item">
            <CharacterItem character={char} />
          </li>
        ))}
      </ul>
    );
  }
}

export default CharacterItems;
