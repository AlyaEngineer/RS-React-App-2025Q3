import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, afterEach, vi } from 'vitest';

import { useCharactersStore } from '@/store/useCharactersStore';

import { DownloadButton } from './DownloadButton';
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

describe('DownloadButton', () => {
  it('click triggers creation of a download link and click on it', async () => {
    const createObjectURLMock = vi.fn(() => 'blob:url');
    const revokeObjectURLMock = vi.fn();
    const clickMock = vi.fn();

    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        const element = originalCreateElement.call(document, 'a');
        element.click = clickMock;
        return element;
      }
      return originalCreateElement.call(document, tagName);
    });

    await waitFor(() => {
      useCharactersStore.getState().addCharacter(mockCharacter);
    });

    await waitFor(() => {
      render(<Flyout />);
      fireEvent.click(screen.getByText(/download/i));
    });

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
  });

  it('download filename contains correct count of characters', async () => {
    const createObjectURLMock = vi.fn(() => 'blob:url');
    global.URL.createObjectURL = createObjectURLMock;

    let downloadedFilename = '';
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        const element = originalCreateElement.call(document, 'a');
        Object.defineProperty(element, 'download', {
          set(value) {
            downloadedFilename = value as string;
          },
          get() {
            return downloadedFilename;
          },
          configurable: true,
        });
        element.click = vi.fn();
        return element;
      }
      return originalCreateElement.call(document, tagName);
    });

    await waitFor(() => {
      useCharactersStore.getState().addCharacter(mockCharacter);
    });

    await waitFor(() => {
      render(<Flyout />);
      fireEvent.click(screen.getByText(/download/i));
    });

    expect(downloadedFilename).toBe('1_items.csv');
  });

  it('triggers CSV download with correct filename and content', () => {
    let blobContent = '';

    global.Blob = class {
      constructor(parts: BlobPart[]) {
        blobContent = parts[0] as string;
      }
    } as unknown as typeof Blob;

    const createObjectURLMock = vi.fn(() => 'blob:http://mock-url');
    const revokeObjectURLMock = vi.fn();

    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    const clickMock = vi.fn();
    const mockLink = {
      href: '',
      download: '',
      click: clickMock,
    };

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'a') {
        return mockLink as unknown as HTMLAnchorElement;
      }
      return originalCreateElement(tagName);
    });

    const mockItems = [
      {
        id: 1,
        name: 'Rick Sanchez',
        gender: 'Male',
        species: 'Human',
        status: 'Alive',
        created: '2017-11-04T18:48:46.250Z',
      },
      {
        id: 2,
        name: 'Morty Smith',
        gender: 'Male',
        species: 'Human',
        status: 'Alive',
        created: '2017-11-05T18:48:46.250Z',
      },
    ];

    render(<DownloadButton items={mockItems} />);

    fireEvent.click(screen.getByText(/download/i));

    expect(blobContent).toContain('id,name,gender,species,status,created');
    expect(blobContent).toContain('Rick Sanchez');
    expect(blobContent).toContain('Morty Smith');

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(mockLink.download).toBe('2_items.csv');
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLMock).toHaveBeenCalledTimes(1);
  });
});
