import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import ErrorButton from '@/features/components/errorHandling/ErrorButton';
import Pagination from '@/features/components/pagination/Pagination';
import Results from '@/features/components/result/Results';
import Search from '@/features/components/search/Search';
import { Character } from '@/features/types/apiTypes';
import { cn } from '@/libs/utils';

export default function Main() {
  const { page = '1', detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);

  const navigate = useNavigate();

  const [query, setQuery] = useState(searchParams.get('name') ?? '');
  const currentPage = Number(page) || 1;

  useEffect(() => {
    const name = searchParams.get('name') ?? '';
    setQuery(name);
  }, [searchParams]);

  const handleSearch = (newQuery: string) => {
    localStorage.setItem('searchQuery', newQuery);

    if (detailsId) {
      void navigate(`/${1}/${detailsId}?name=${newQuery}`);
    } else {
      void navigate(`/${1}?name=${newQuery}`);
    }
  };

  const handlePageChange = (page: number) => {
    if (detailsId) {
      void navigate(`/${page}/${detailsId}?name=${query}`);
    } else {
      void navigate(`/${page}?name=${query}`);
    }
  };

  const handleCloseDetails = () => {
    void navigate(`/${currentPage}?name=${query}`);
  };

  const handleCharacters = useCallback((list: Character[]) => {
    setCharacters(list);
  }, []);

  const handleSelect = (character: Character) => {
    void navigate(`/${currentPage}/${character.id}?name=${query}`);
  };

  return (
    <div className="flex justify-between">
      <div
        className={cn(
          'bg-dark/4',
          'shadow-3xl/20',
          'flex h-auto flex-1 flex-col items-center justify-start gap-8',
          'rounded-xl',
          '@9xl:m-auto p-6 max-sm:px-2',
          'backdrop-invert backdrop-opacity-5',
          'max-w-(--my-max-width)'
        )}
      >
        <Search onSearch={handleSearch} />

        {characters.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div className="flex w-full gap-5">
          <Results
            searchQuery={query}
            currentPage={currentPage}
            onInfo={(info) => setTotalPages(info?.pages || 0)}
            onCharacters={handleCharacters}
            detailsId={detailsId}
            onCloseDetails={handleCloseDetails}
            onSelectCharacter={handleSelect}
            hasOutlet={!!detailsId}
          />
          {detailsId && (
            <div
              className={cn(
                'bg-dark/4',
                'shadow-3xl/20',
                'flex min-w-56 flex-col items-center justify-start gap-8',
                'rounded-xl',
                'p-6 max-sm:px-2',
                'backdrop-invert backdrop-opacity-5'
              )}
            >
              <Outlet context={{ onCloseDetails: handleCloseDetails }} />
            </div>
          )}
        </div>
        <ErrorButton />
      </div>
    </div>
  );
}
