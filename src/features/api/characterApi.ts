import { API_BASE_URL } from '@/config/api';
import { CharacterResponse } from '@/features/types/apiTypes';

import { throwApiError } from './apiError';

export async function fetchCharactersByName(query: string, page = 1): Promise<CharacterResponse> {
  const trimmedQuery = query.trim();
  const url = trimmedQuery
    ? `${API_BASE_URL}?name=${trimmedQuery}&page=${page}`
    : `${API_BASE_URL}?page=${page}`;

  const response = await fetch(url);
  const body = (await response.json().catch(() => null)) as CharacterResponse | null;

  if (!response.ok) {
    throwApiError(response.status, body?.error || response.statusText || 'Unknown error');
  }

  if (body) {
    return body;
  } else {
    throwApiError(0, 'No response body');
  }
}
