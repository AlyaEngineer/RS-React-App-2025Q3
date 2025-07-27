import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { cn } from '@/libs/utils';

import ErrorButton from '../components/errorHandling/ErrorButton';
import Results from '../components/fetcher/Results';
import Pagination from '../components/pagination/Pagination';
import Search from '../components/search/Search';
import { Character } from '../types/apiTypes';

export default function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [, setCharacters] = useState<Character[]>([]);

  const navigate = useNavigate();

  const query = searchParams.get('name') ?? '';
  const currentPage = Number(searchParams.get('page') || 1);
  const detailsId = searchParams.get('details') ?? undefined;

  const handleSearch = (newQuery: string) => {
    setSearchParams({ name: newQuery, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ name: query, page: page.toString() });
  };

  const handleCloseDetails = () => {
    searchParams.delete('details');
    void navigate(`/?${searchParams.toString()}`);
  };

  const handleCharacters = useCallback((list: Character[]) => {
    setCharacters(list);
  }, []);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery && !searchParams.get('name')) {
      setSearchParams({ name: savedQuery, page: '1' });
    }
  }, [setSearchParams, searchParams]);

  return (
    <div className="flex gap-5">
      <div
        className={cn(
          'bg-dark/4',
          'shadow-3xl/20',
          'flex h-auto flex-1 flex-col items-center justify-start gap-8',
          'rounded-xl',
          '@9xl:m-auto p-6',
          'backdrop-invert backdrop-opacity-5',
          'max-w-(--my-max-width)'
        )}
      >
        <Search onSearch={handleSearch} />
        <Results
          searchQuery={query}
          currentPage={currentPage}
          onInfo={(info) => setTotalPages(info?.pages ?? 1)}
          onCharacters={handleCharacters}
          detailsId={detailsId}
          onCloseDetails={handleCloseDetails}
        />
        <ErrorButton />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
