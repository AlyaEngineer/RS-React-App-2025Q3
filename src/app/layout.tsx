import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './global.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { ThemeProvider } from '@/features/components/toggleTheme/ThemeProvider';
import { cn } from '@/libs/utils';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

const manropeFont = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Search App',
  description:
    'My App is an app for searching characters from the Rick and Morty cartoon series, based on the Rick and Morty API as part of the React2025Q3 course of the RSSchool',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <ReactQueryProvider>
              <div
                className={cn(
                  manropeFont.className,
                  'flex min-h-screen w-full flex-col justify-between overflow-x-hidden overflow-y-auto p-10 max-md:p-5 max-sm:px-2',
                  '@container'
                )}
              >
                {children}
              </div>
            </ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
