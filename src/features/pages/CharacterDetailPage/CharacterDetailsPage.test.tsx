import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams, useOutletContext } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { fetchCharacterById } from '@/features/api/characterApi';

import CharacterDetailsPage from './CharacterDetailsPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useOutletContext: vi.fn(),
  };
});

vi.mock('@/features/api/characterApi', () => ({
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
  let queryClient: QueryClient;

  function renderWithClient(ui: React.ReactElement) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
  }

  it('display loading icon when data are fetching', () => {
    vi.mocked(useParams).mockReturnValue({ detailsId: '1' });
    vi.mocked(useOutletContext).mockReturnValue({ onCloseDetails: vi.fn() });
    vi.mocked(fetchCharacterById).mockReturnValue(new Promise(() => {}));

    renderWithClient(<CharacterDetailsPage />);

    const loadingIcon = screen.getByRole('generic', { name: /loader/i });
    expect(loadingIcon).toBeEnabled();
    expect(loadingIcon.querySelector('svg')).toHaveClass('animate-spin');
  });

  it('display character after fetching', async () => {
    vi.mocked(useParams).mockReturnValue({ detailsId: '1' });
    vi.mocked(useOutletContext).mockReturnValue({ onCloseDetails: vi.fn() });
    vi.mocked(fetchCharacterById).mockResolvedValue(mockCharacter);

    renderWithClient(<CharacterDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('calls onCloseDetails on error', async () => {
    const onCloseMock = vi.fn();

    vi.mocked(useParams).mockReturnValue({ detailsId: '1' });
    vi.mocked(useOutletContext).mockReturnValue({ onCloseDetails: onCloseMock });
    vi.mocked(fetchCharacterById).mockRejectedValue(new Error('Error'));

    renderWithClient(<CharacterDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(/error loading character/i)).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button');
    closeButton.click();

    expect(onCloseMock).toHaveBeenCalled();
  });
});
