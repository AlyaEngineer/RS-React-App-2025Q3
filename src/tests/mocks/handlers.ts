import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'empty') {
      return HttpResponse.json({ results: [] });
    }

    if (name === 'error') {
      return HttpResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    return HttpResponse.json({
      results: [
        {
          name: 'Rick Sanchez',
          species: 'Human',
          gender: 'Male',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          location: { name: 'Citadel of Ricks' },
        },
      ],
    });
  }),
];
