import { Component } from 'react';
import { Character } from '../types';

interface CharacterItemProps {
  character: Character;
}

class CharacterItem extends Component<CharacterItemProps> {
  render() {
    const { name, species, gender, location, image } = this.props.character;

    return (
      <div className="flex h-full items-center rounded-md bg-slate-700/80 p-4 max-md:p-2.5">
        <img src={image} alt={name} className="h-24 w-24 rounded-md object-cover" />
        <div className="ml-4 flex flex-col">
          <h4 className="text-lg font-semibold text-white max-md:text-base">{name}</h4>
          <p className="text-left text-sm font-medium text-gray-400">race: {species}</p>
          <p className="text-left text-sm font-medium text-gray-400">gender: {gender}</p>
          <p className="text-left text-sm font-medium text-gray-400">location: {location.name}</p>
        </div>
      </div>
    );
  }
}

export default CharacterItem;
