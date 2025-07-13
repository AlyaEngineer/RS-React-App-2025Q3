import { Component } from 'react';
import CharacterItem from './CharacterItem';
import { Character } from '../types/apiTypes';
import { CharacterItemsProps } from '../types/viewTypes';

class CharacterItems extends Component<CharacterItemsProps> {
  render() {
    const { characters } = this.props;
    return (
      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {characters.map((char: Character) => (
          <li key={char.id}>
            <CharacterItem character={char} />
          </li>
        ))}
      </ul>
    );
  }
}

export default CharacterItems;
