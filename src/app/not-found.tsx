import { ArrowBigLeft } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { cn } from '@/libs/utils';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="flex flex-1 flex-col items-center justify-between">
      <Image
        width={350}
        height={350}
        src="/404.svg"
        alt="Sorry, page not found! We can not find page you are looking for"
      />

      <div>
        <p className="p-4 text-center text-2xl text-white">{t('non-found')}</p>
      </div>
      <div className="flex">
        <Link
          href="/"
          className={cn(
            'mb-5 flex w-full items-center px-4 py-2',
            'cursor-pointer',
            'rounded-xl shadow-xl inset-shadow-sm',
            'bg-button-error',
            'text-lg text-white text-shadow-2xs',
            'transition delay-150 duration-300 ease-in-out',
            'hover:bg-button-error-hover hover:shadow-xl/20'
          )}
        >
          <ArrowBigLeft strokeWidth={1.25} className="mr-4" />
          {t('back-button')}
        </Link>
      </div>
    </div>
  );
}
