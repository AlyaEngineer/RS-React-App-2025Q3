import { Rocket } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchButtonProps } from '@/features/types/searchTypes';
import { cn } from '@/libs/utils';

export default function SearchButton({ onClick }: SearchButtonProps) {
  const t = useTranslations('Search');
  return (
    <button
      type="submit"
      onClick={onClick}
      className={cn(
        'bg-button-background flex w-1/4 items-center justify-center gap-2.5 p-2 max-md:w-full',
        'cursor-pointer',
        'rounded-xl shadow-xl inset-shadow-sm',
        'transition delay-150 duration-300 ease-in-out',
        'text-white text-shadow-2xs dark:text-gray-600',
        'hover:bg-button-background-hover hover:shadow-xl/20',
        'focus:border-none'
      )}
    >
      <Rocket strokeWidth={1.25} />
      {t('button-name')}
    </button>
  );
}
