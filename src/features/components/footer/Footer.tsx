import { useTranslations } from 'next-intl';

import { PAGES } from '@/config/pages.config';
import { Link } from '@/i18n/navigation';
import { cn } from '@/libs/utils';

import LanguageToggle from '../toggleLanguage/LanguageToggle';
import { ThemeToggle } from '../toggleTheme/ThemeToggle';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer
      className={cn(
        'bg-dark/4',
        'shadow-3xl/20',
        'mt-4 flex h-auto items-center justify-between gap-8 text-white text-shadow-lg/20 max-md:flex-col max-md:items-start max-md:gap-10',
        'rounded-xl',
        '@9xl:m-auto @9xl:mt-4 px-10 py-6 max-md:px-5',
        'backdrop-invert backdrop-opacity-5',
        'max-w-(--my-max-width)'
      )}
    >
      <div className="flex flex-col gap-2">
        <div>
          <Link
            href={PAGES.MAIN}
            className="hover:text-button-reload transition-colors duration-300 hover:text-shadow-lg/30"
          >
            <span className="p-2">{t('home')}</span>
          </Link>
        </div>
        <div>
          <Link
            href={PAGES.ABOUT_US}
            className="hover:text-button-reload transition-colors duration-300 hover:text-shadow-lg/30"
          >
            <span className="p-2">{t('about')}</span>
          </Link>
        </div>
        <div>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-button-reload transition-colors duration-300 hover:text-shadow-lg/30"
          >
            <span className="p-2">Rolling Scopes School / React Course</span>
          </a>
        </div>
        <div>
          <ThemeToggle />
        </div>
        <div>
          <LanguageToggle />
        </div>
      </div>

      <div className="max-md:px-2">
        <p>&copy; 2025 Rick & Morty API Search</p>
        <p>{t('rights')}</p>
      </div>
    </footer>
  );
}
