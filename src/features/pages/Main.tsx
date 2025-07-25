import { useState } from 'react';

import { cn } from '@/libs/utils';

import ErrorButton from '../components/errorHandling/ErrorButton';
import Results from '../components/fetcher/Results';
import Search from '../components/search/Search';

export default function Main() {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);
  };

  return (
    <div
      className={cn(
        'bg-dark/4',
        'shadow-3xl/20',
        'flex h-auto flex-col items-center justify-center gap-8',
        'rounded-xl',
        '@9xl:m-auto p-6',
        'backdrop-invert backdrop-opacity-5',
        'max-w-(--my-max-width)'
      )}
    >
      <Search onSearch={handleSearch} />
      <Results searchQuery={searchQuery} />
      <ErrorButton />
    </div>
  );
}
