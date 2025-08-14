import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Character } from '@/features/types/apiTypes';

import CharacterItem from './CharacterItem';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams('name=rick&page=1')],
  };
});

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  created: '2017-11-04T18:48:46.250Z',
  url: 'https://rickandmortyapi.com/api/character/1',
  type: '',
};

describe('CharacterItem', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders character info correctly', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} currentPage={1} query="rick" onSelect={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/race:/i)).toHaveTextContent('race: Human');
    expect(screen.getByText(/gender:/i)).toHaveTextContent('gender: Male');

    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toContain(mockCharacter.image);
    expect(image.getAttribute('alt')).toBe('Rick Sanchez');
  });

  it('calls navigate on mouse click', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} currentPage={1} query="rick" onSelect={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockNavigate).toHaveBeenCalledWith('/1/1?name=rick');
  });

  it('calls navigate on Enter key press', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} currentPage={1} query="rick" onSelect={() => {}} />
      </MemoryRouter>
    );

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    console.log(mockNavigate.mock.calls);
    expect(mockNavigate).toHaveBeenCalledWith('/1/1?name=rick');
  });

  it('calls navigate on Space key press', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} currentPage={1} query="rick" onSelect={() => {}} />
      </MemoryRouter>
    );

    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(mockNavigate).toHaveBeenCalledWith('/1/1?name=rick');
  });

  it('does not navigate on other key press', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} currentPage={1} query="rick" onSelect={() => {}} />
      </MemoryRouter>
    );

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
