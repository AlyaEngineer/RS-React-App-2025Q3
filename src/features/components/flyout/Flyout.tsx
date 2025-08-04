import { useEffect, useState } from 'react';

import { cn } from '@/libs/utils';
import { useCharactersStore } from '@/store/useCharactersStore';

import { DownloadButton } from './DownloadButton';
import { RemoveAllButton } from './RemoveAllButton';

export const Flyout = () => {
  const selectedCharacters = useCharactersStore((state) => state.selectedCharacters);
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedCharacters.length > 0) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [selectedCharacters.length]);

  return (
    <div
      className={cn(
        'bg-flyout-background/95 shadow-3xl/20 fixed right-0 bottom-0 left-0 z-50 flex items-center justify-center gap-4 p-4 text-white shadow-lg max-sm:gap-2 max-sm:px-3 max-sm:text-sm',
        'transition-transform duration-300',
        selectedCharacters.length > 0 ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <span>
        {selectedCharacters.length} item{selectedCharacters.length > 1 ? 's are' : ' is'} selected
      </span>
      <RemoveAllButton />
      <DownloadButton items={selectedCharacters} />
    </div>
  );
};
