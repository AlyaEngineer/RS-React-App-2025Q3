import { Character } from './apiTypes';

export interface CharacterItemProps {
  character: Character;
}

export interface CharacterListProps {
  characters: Character[];
}

export interface CharacterListSkeletonState {
  skeletonCount: number;
}
