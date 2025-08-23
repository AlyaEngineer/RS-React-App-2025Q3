'use server';

import { fetchCharactersByName } from '@/features/api/characterApi';
import { CharacterResponse } from '@/features/types/apiTypes';

export async function fetchInitialCharacters(): Promise<CharacterResponse> {
  return fetchCharactersByName('', 1);
}
