import { ChangeEvent } from 'react';

import { Info } from './apiTypes';

export interface ResultsProps {
  searchQuery: string;
  currentPage: number;
  onInfo: (info: Info | null) => void;
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
