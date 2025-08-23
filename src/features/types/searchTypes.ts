import { ChangeEvent } from 'react';

import { Character, CharacterResponse, Info } from './apiTypes';

export interface ResultsProps {
  searchQuery: string;
  currentPage: number;
  onInfoAction: (info: Info | null) => void;
  onCharactersAction: (list: Character[]) => void;
  detailsId?: string;
  onCloseDetails?: () => void;
  onSelectCharacterAction: (character: Character) => void;
  hasOutlet: boolean;
  initialData: CharacterResponse;
}

export interface SearchProps {
  onSearch: (query: string) => void;
}

export interface SearchButtonProps {
  onClick: () => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
