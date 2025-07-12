export async function fetchCharactersByName(query: string) {
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  const trimmedQuery = query.trim();
  const url = trimmedQuery ? `${baseUrl}?name=${trimmedQuery}` : baseUrl;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const result = await response.json();
  return result.results;
}
