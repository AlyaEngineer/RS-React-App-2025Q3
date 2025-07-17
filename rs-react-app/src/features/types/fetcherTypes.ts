import { ReactNode } from 'react';

import { ApiError, Character } from './apiTypes';

export type CharacterFetcherProps = {
  query: string;
  children: (data: {
    loading: boolean;
    error: ApiError | null;
    characters: Character[];
  }) => ReactNode;
};

export type CharacterFetcherState = {
  loading: boolean;
  error: ApiError | null;
  characters: Character[];
};
