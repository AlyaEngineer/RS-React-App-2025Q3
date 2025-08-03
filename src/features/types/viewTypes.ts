import { Character } from './apiTypes';

export interface CharacterItemProps {
  character: Character;
  currentPage: number;
  query: string;
  onSelect: (character: Character) => void;
}

export interface CharacterListProps {
  characters: Character[];
  onSelect: (character: Character, currentPage: number, query: string) => void;
  currentPage: number;
  query: string;
  hasOutlet: boolean;
}

export interface CharacterDetailsProps {
  character: Character;
  onClose?: () => void;
}
