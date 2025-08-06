import { cn } from '@/libs/utils';
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
      className={cn(
        'accent-checkbox-color border-checkbox-border h-7 w-7 appearance-none rounded-md border-1 bg-amber-50',
        'hover:shadow-checkbox-shadow hover:shadow-3xl',
        'checked:bg-checkbox-color checked:bg-[url(/check.png)] checked:bg-cover checked:bg-no-repeat',
        'transition-shadow duration-300'
      )}
      checked={selected}
      onChange={handleCheckboxClick}
      onClick={handleCheckboxClick}
    />
  );
};
