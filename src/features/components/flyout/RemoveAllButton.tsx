import { useTranslations } from 'next-intl';

import { useCharactersStore } from '@/store/useCharactersStore';

export const RemoveAllButton = () => {
  const removeAllCharacters = useCharactersStore((state) => state.removeAllCharacters);
  const t = useTranslations('Flyout');

  return (
    <button
      onClick={removeAllCharacters}
      className="bg-button-background/80 hover:bg-button-background-hover cursor-pointer rounded px-4 py-2 text-white transition-colors duration-300 max-sm:text-sm"
    >
      {t('unselected')}
    </button>
  );
};
