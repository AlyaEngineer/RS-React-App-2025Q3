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
        <CharacterItem character={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/race:/i)).toHaveTextContent('race: Human');
    expect(screen.getByText(/gender:/i)).toHaveTextContent('gender: Male');
    expect(screen.getByText(/location:/i)).toHaveTextContent('location: Citadel of Ricks');

    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toContain(mockCharacter.image);
    expect(image.getAttribute('alt')).toBe('Rick Sanchez');
  });

  it('calls navigate on mouse click', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockNavigate).toHaveBeenCalledWith('/?name=rick&page=1&details=1');
  });

  it('calls navigate on Enter key press', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} />
      </MemoryRouter>
    );

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith("/?name=rick&page=1&details=1");
  });

  it('calls navigate on Space key press', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} />
      </MemoryRouter>
    );

    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(mockNavigate).toHaveBeenCalledWith("/?name=rick&page=1&details=1");
  });

  it('does not navigate on other key press', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} />
      </MemoryRouter>
    );

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
