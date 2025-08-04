import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Character } from '@/features/types/apiTypes';

interface ICharactersState {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
  removeAllCharacters: () => void;
  isSelected: (id: number) => boolean;
}

export const useCharactersStore = create<ICharactersState>()(
  persist(
    (set, get) => ({
      selectedCharacters: [],
      addCharacter: (character) => {
        const isAlreadySelected = get().selectedCharacters.find(
          (characterItem) => characterItem.id === character.id
        );
        if (!isAlreadySelected) {
          set((state) => ({
            selectedCharacters: [...state.selectedCharacters, character],
          }));
        }
      },
      removeCharacter: (id) =>
        set((state) => ({
          selectedCharacters: state.selectedCharacters.filter(
            (characterItem) => characterItem.id !== id
          ),
        })),
      removeAllCharacters: () => set({ selectedCharacters: [] }),
      isSelected: (id) =>
        Boolean(get().selectedCharacters.find((characterItem) => characterItem.id === id)),
    }),
    {
      name: 'Characters storage',
    }
  )
);
