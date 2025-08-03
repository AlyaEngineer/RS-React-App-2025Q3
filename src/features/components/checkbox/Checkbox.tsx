import { useCharactersStore } from '@/store/useCharactersStore';

import { CheckboxProps } from './checkboxTypes';

export const Checkbox = ({ character }: CheckboxProps) => {
  const { addCharacter, removeCharacter, isSelected } = useCharactersStore();

  const selected = isSelected(character.id);

  const handleCheckboxClick = (e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();
    if (selected) {
      removeCharacter(character.id);
    } else {
      addCharacter(character);
    }
  };

  return (
    <input
      type="checkbox"
      className="h-5 w-5 accent-button-background"
      checked={selected}
      onChange={handleCheckboxClick}
      onClick={handleCheckboxClick}
    />
  );
};
