import { ApiError, Character } from '../types/types';

export async function fetchCharactersByName(query: string): Promise<Character[]> {
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  const trimmedQuery = query.trim();
  const url = trimmedQuery ? `${baseUrl}?name=${trimmedQuery}` : baseUrl;

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
