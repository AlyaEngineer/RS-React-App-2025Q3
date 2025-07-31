import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import CharacterDetails from './CharacterDetails';

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

describe('CharacterDetails', () => {
  it('renders character info', () => {
    render(<CharacterDetails character={mockCharacter} onClose={vi.fn()} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/race:/i)).toHaveTextContent('race: Human');
    expect(screen.getByText(/gender:/i)).toHaveTextContent('gender: Male');
    expect(screen.getByText(/status:/i)).toHaveTextContent('status: Alive');
    expect(screen.getByText(/origin:/i)).toHaveTextContent('origin: Earth (C-137)');
    expect(screen.getByText(/location:/i)).toHaveTextContent('location: Citadel of Ricks');
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  it('does not render type when not provided', () => {
    render(<CharacterDetails character={mockCharacter} onClose={vi.fn()} />);
    expect(screen.queryByText(/type:/i)).not.toBeInTheDocument();
  });

  it('renders type when provided', () => {
    const characterWithType = { ...mockCharacter, type: 'Scientist' };
    render(<CharacterDetails character={characterWithType} onClose={vi.fn()} />);
    expect(screen.getByText(/type:/i)).toHaveTextContent('type: Scientist');
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<CharacterDetails character={mockCharacter} onClose={onCloseMock} />);

    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);

    expect(onCloseMock).toHaveBeenCalledOnce();
  });
});
