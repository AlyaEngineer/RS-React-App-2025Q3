'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { cn } from '@/libs/utils';

export default function ErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const t = useTranslations('MainPage');

  const handleClick = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('ErrorBoundary caught an error');
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'bg-button-error flex w-1/4 items-center justify-center gap-2.5 p-2 max-md:w-full',
        'cursor-pointer',
        'rounded-2xl shadow-xl inset-shadow-sm',
        'text-gray-600 text-shadow-2xs',
        'transition delay-150 duration-300 ease-in-out',
        'hover:bg-button-error-hover hover:shadow-xl/20'
      )}
    >
      {t('click-me-button')}
    </button>
  );
}
