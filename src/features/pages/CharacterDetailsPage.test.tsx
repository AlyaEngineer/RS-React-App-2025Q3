import { render, screen, waitFor } from '@testing-library/react';
import { useParams, useOutletContext } from 'react-router-dom';
import { describe, it, beforeEach, expect, vi } from 'vitest';

import { fetchCharacterById } from '../api/characterApi';

import CharacterDetailsPage from './CharacterDetailsPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useOutletContext: vi.fn(),
  };
});

vi.mock('../api/characterApi', () => ({
  fetchCharacterById: vi.fn(),
}));

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
  episode: [],
  url: '',
  created: '',
};

describe('CharacterDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('display Loading... when data are fetching', () => {
    vi.mocked(useParams).mockReturnValue({ detailsId: '1' });
    vi.mocked(useOutletContext).mockReturnValue({ onCloseDetails: vi.fn() });
    vi.mocked(fetchCharacterById).mockReturnValue(new Promise(() => {}));

    render(<CharacterDetailsPage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('display character after fetching', async () => {
    vi.mocked(useParams).mockReturnValue({ detailsId: '1' });
    vi.mocked(useOutletContext).mockReturnValue({ onCloseDetails: vi.fn() });
    vi.mocked(fetchCharacterById).mockResolvedValue(mockCharacter);

    render(<CharacterDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('calls onCloseDetails on error', async () => {
    const onCloseMock = vi.fn();

    vi.mocked(useParams).mockReturnValue({ detailsId: '1' });
    vi.mocked(useOutletContext).mockReturnValue({ onCloseDetails: onCloseMock });
    vi.mocked(fetchCharacterById).mockRejectedValue(new Error('Error'));

    render(<CharacterDetailsPage />);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('does not call fetchCharacterById if detailsId is missing', () => {
    vi.mocked(useParams).mockReturnValue({ detailsId: undefined });
    vi.mocked(useOutletContext).mockReturnValue({ onCloseDetails: vi.fn() });

    render(<CharacterDetailsPage />);

    expect(fetchCharacterById).not.toHaveBeenCalled();
  });
});
