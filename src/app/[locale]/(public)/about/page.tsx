import { Github } from 'lucide-react';
import type { Metadata } from 'next';
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = { title: 'About us' };
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import authorData from './authorData';

export default function AboutUsPage() {
  const author = authorData[0];
  const t = useTranslations('AboutPage');

  return (
    <div className="m-auto flex items-start gap-5">
      <div>
        <Image
          width={86}
          height={86}
          src={author.url.image}
          alt={author.name}
          loading="lazy"
          decoding="async"
          className="h-7xl flex w-7xl object-contain max-md:hidden"
        />
      </div>
      <div className="flex">
        <div className="flex w-full flex-col items-center justify-center text-justify">
          <h3 className="text-2xl font-semibold uppercase">
            {t('author-name', { name: author.name })}
          </h3>
          <p className="text-xl">{t('position', { name: author.title })}</p>
          <p className="mt-3 uppercase">{t('bio')}</p>
          <p className="mb-3 text-justify">{t('bio-text', { name: author.bio })}</p>
          <p className="mt-3 uppercase">{t('education')}</p>
          <ul className="mb-3 list-inside list-disc text-left">
            {author.education?.map(({ instituteName, certificate }, index) => (
              <li key={index}>
                {instituteName.includes('RS School, React Course 2025Q3') ? (
                  <a
                    href="https://rs.school/courses/reactjs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-button-reload"
                  >
                    {instituteName}
                  </a>
                ) : (
                  instituteName
                )}

                {certificate && (
                  <>
                    {' — '}
                    <a
                      href={certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-button-reload"
                    >
                      {t('diploma')}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 uppercase">{t('skills')}</p>
          <p className="text-center">{author.skills}</p>
          <ul className="mt-3 flex items-center gap-2.5">
            <li>
              <Link
                href={author.url.gitHub}
                target="_blank"
                className="hover:text-button-reload p-3 transition-colors duration-300 lg:p-2"
              >
                <Github strokeWidth={1.25} size={28} className="max-sm:size-6" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
