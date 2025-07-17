import { API_BASE_URL } from '@/config/api';
import { ApiError, Character } from '@/features/types/apiTypes';

export async function fetchCharactersByName(query: string): Promise<Character[]> {
  const trimmedQuery = query.trim();
  const url = trimmedQuery ? `${API_BASE_URL}?name=${trimmedQuery}` : API_BASE_URL;

  const response = await fetch(url);
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      status: response.status,
      message: body.error || response.statusText || 'Unknown error',
    } satisfies ApiError;
  }

  if (body && body.results) {
    return body.results;
  } else {
    return [];
  }
}
