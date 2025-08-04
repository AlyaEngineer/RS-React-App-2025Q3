import { ChangeEvent } from 'react';

import { Character, Info } from './apiTypes';

export interface ResultsProps {
  searchQuery: string;
  currentPage: number;
  onInfo: (info: Info | null) => void;
  onCharacters?: (list: Character[]) => void;
  detailsId?: string;
  onCloseDetails?: () => void;
  onSelectCharacter: (character: Character) => void;
  hasOutlet: boolean;
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
