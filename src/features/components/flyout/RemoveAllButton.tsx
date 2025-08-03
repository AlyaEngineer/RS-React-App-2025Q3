import { useCharactersStore } from "@/store/useCharactersStore";

export const RemoveAllButton = () => {
  const removeAllCharacters = useCharactersStore((state) => state.removeAllCharacters);

  return (
    <button
      onClick={removeAllCharacters}
      className="bg-button-background/80 hover:bg-button-background-hover max-sm:text-sm text-white px-4 py-2 rounded cursor-pointer transition-colors duration-300"
    >
      Unselect all
    </button>
  );
};
