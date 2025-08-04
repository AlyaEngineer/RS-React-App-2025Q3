import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';

import { useCharactersStore } from '@/store/useCharactersStore';

import { Flyout } from './Flyout';

afterEach(() => {
  useCharactersStore.getState().removeAllCharacters();
});

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: '',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

const mockClick = vi.fn();
const mockLink = document.createElement('a');
mockLink.href = 'blob:http://localhost/fake';
mockLink.download = 'filename.csv';
mockLink.click = mockClick;

describe('Flyout', () => {
  it('does not show when no characters are selected', () => {
    render(<Flyout />);
    const flyout = screen.getByText(/item/i).parentElement;
    expect(flyout).toHaveClass('translate-y-full');
  });

  it('shows when a character is selected', async () => {
    await waitFor(() => {
      return useCharactersStore.getState().addCharacter(mockCharacter);
    });

    render(<Flyout />);
    expect(screen.getByText(/1 item is selected/i)).toBeInTheDocument();
    const flyout = screen.getByText(/item/i).parentElement;
    expect(flyout).toHaveClass('translate-y-0');
  });

  it('removes all characters on "Unselect all" click', async () => {
    await waitFor(() => {
      useCharactersStore.getState().addCharacter(mockCharacter);
    });

    render(<Flyout />);
    fireEvent.click(screen.getByText(/unselect all/i));
    expect(useCharactersStore.getState().selectedCharacters).toHaveLength(0);
  });
});
