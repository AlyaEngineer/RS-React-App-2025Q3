import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const addCharacterMock = vi.fn();
const removeCharacterMock = vi.fn();
const isSelectedMock = vi.fn();

vi.mock('@/store/useCharactersStore', () => ({
  useCharactersStore: () => ({
    addCharacter: addCharacterMock,
    removeCharacter: removeCharacterMock,
    isSelected: isSelectedMock,
  }),
}));

import { Checkbox } from './Checkbox';

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

describe('Checkbox', () => {
  beforeEach(() => {
    addCharacterMock.mockClear();
    removeCharacterMock.mockClear();
    isSelectedMock.mockClear();
  });

  it('renders checkbox checked when character is selected', () => {
    isSelectedMock.mockReturnValue(true);

    render(<Checkbox character={mockCharacter} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  it('renders checkbox unchecked when character is not selected', () => {
    isSelectedMock.mockReturnValue(false);

    render(<Checkbox character={mockCharacter} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();
  });

  it('calls removeCharacter when checkbox clicked and character is selected', () => {
    isSelectedMock.mockReturnValue(true);

    render(<Checkbox character={mockCharacter} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(removeCharacterMock).toHaveBeenCalledWith(mockCharacter.id);
    expect(addCharacterMock).not.toHaveBeenCalled();
  });

  it('calls addCharacter when checkbox clicked and character is not selected', () => {
    isSelectedMock.mockReturnValue(false);

    render(<Checkbox character={mockCharacter} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(addCharacterMock).toHaveBeenCalledWith(mockCharacter);
    expect(removeCharacterMock).not.toHaveBeenCalled();
  });
});
