import { ReactNode } from 'react';

import { ApiError, Character, Info } from './apiTypes';

export type CharacterFetcherProps = {
  query: string;
  page: number;
  children: (data: {
    loading: boolean;
    error: ApiError | null;
    characters: Character[];
    info: Info | null;
  }) => ReactNode;
};
