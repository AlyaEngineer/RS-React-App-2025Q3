import { API_BASE_URL } from '@/config/api';
import { Character, CharacterResponse } from '@/features/types/apiTypes';

import { throwApiError } from './apiError';

export async function fetchCharactersByName(query: string): Promise<Character[]> {
  const trimmedQuery = query.trim();
  const url = trimmedQuery ? `${API_BASE_URL}?name=${trimmedQuery}` : API_BASE_URL;

  const response = await fetch(url);
  const body = (await response.json().catch(() => null)) as CharacterResponse | null;

  if (!response.ok) {
    throwApiError(response.status, body?.error || response.statusText || 'Unknown error');
  }

  if (body && body.results) {
    return body.results;
  } else {
    return [];
  }
}
