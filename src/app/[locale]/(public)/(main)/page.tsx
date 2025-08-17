import type { Metadata } from 'next';
import { Suspense } from 'react';

import Main from './Main';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Search App',
  description:
    'My App is an app for searching characters from the Rick and Morty cartoon series, based on the Rick and Morty API as part of the React2025Q3 course of the RSSchool',
};

export default function MainPage() {
  return (
    <Suspense>
      <Main />
    </Suspense>
  );
}
