import { useCharactersStore } from '@/store/useCharactersStore';

export const RemoveAllButton = () => {
  const removeAllCharacters = useCharactersStore((state) => state.removeAllCharacters);

  return (
    <button
      onClick={removeAllCharacters}
      className="bg-button-background/80 hover:bg-button-background-hover cursor-pointer rounded px-4 py-2 text-white transition-colors duration-300 max-sm:text-sm"
    >
      Unselect all
    </button>
  );
};
