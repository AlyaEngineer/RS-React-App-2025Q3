import { ChangeEvent } from 'react';

export interface ResultsProps {
  searchQuery: string;
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
