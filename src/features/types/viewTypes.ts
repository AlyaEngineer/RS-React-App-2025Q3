import { Character } from './apiTypes';

export interface CharacterItemProps {
  character: Character;
}

export interface CharacterItemsProps {
  characters: Character[];
}

export interface CharacterListSkeletonState {
  skeletonCount: number;
}
