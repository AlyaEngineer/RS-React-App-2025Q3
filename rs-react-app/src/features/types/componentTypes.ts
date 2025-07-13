import { ReactNode } from 'react';
import { Character } from './types';

export interface CharacterItemProps {
  character: Character;
}

export interface CharacterItemsProps {
  characters: Character[];
}

export interface CharacterListSkeletonState {
  skeletonCount: number;
}

export interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ErrorButtonState {
  shouldThrow: boolean;
}

export interface ResultsProps {
  searchQuery: string;
}

export interface SearchProps {
  onSearch: (query: string) => void;
}

export interface SearchState {
  query: string;
}

export interface SearchButtonProps {
  onClick: () => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type CharacterFetcherProps = {
  query: string;
  children: (data: {
    loading: boolean;
    error: ApiError | null;
    characters: Character[];
  }) => React.ReactNode;
};

export type CharacterFetcherState = {
  loading: boolean;
  error: ApiError | null;
  characters: Character[];
};

export interface ApiError {
  status: number;
  message: string;
}
