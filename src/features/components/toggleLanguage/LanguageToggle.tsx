'use client';

import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/libs/utils';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.startsWith('/en') ? 'en' : 'ru';
  const switchTo = currentLocale === 'ru' ? 'en' : 'ru';

  const toggleLocale = () => {
    const segments = pathname.split('/');
    segments[1] = switchTo;
    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'bg-button-background flex items-center justify-center gap-2.5 border-2 border-dotted p-2',
        'cursor-pointer',
        'rounded-xl shadow-xl inset-shadow-sm',
        'transition delay-150 duration-300 ease-in-out',
        'text-white text-shadow-2xs dark:text-gray-600',
        'hover:bg-button-background-hover hover:shadow-xl/20',
        'focus:border-none'
      )}
    >
      {switchTo.toUpperCase()}
    </button>
  );
}
