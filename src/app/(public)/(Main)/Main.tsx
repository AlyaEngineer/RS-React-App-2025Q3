'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import ErrorButton from '@/features/components/errorHandling/ErrorButton';
import Pagination from '@/features/components/pagination/Pagination';
import Results from '@/features/components/result/Results';
import Search from '@/features/components/search/Search';
import { Character } from '@/features/types/apiTypes';
import { cn } from '@/libs/utils';

export default function Main() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = typeof params?.page === 'string' ? params.page : '1';
  const detailsId = typeof params?.detailsId === 'string' ? params.detailsId : undefined;

  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [query, setQuery] = useState(searchParams.get('name') ?? '');

  const currentPage = Number(page) || 1;

  useEffect(() => {
    const name = searchParams.get('name') ?? '';
    setQuery(name);
  }, [searchParams]);

  const handleSearch = (newQuery: string) => {
    localStorage.setItem('searchQuery', newQuery);

    if (detailsId) {
      router.push(`/${1}/${detailsId}?name=${newQuery}`);
    } else {
      router.push(`/${1}?name=${newQuery}`);
    }
  };

  const handlePageChange = (page: number) => {
    if (detailsId) {
      router.push(`/${page}/${detailsId}?name=${query}`);
    } else {
      router.push(`/${page}?name=${query}`);
    }
  };

  const handleCloseDetails = () => {
    router.push(`/${currentPage}?name=${query}`);
  };

  const handleCharacters = useCallback((list: Character[]) => {
    setCharacters(list);
  }, []);

  const handleSelect = (character: Character) => {
    router.push(`/${currentPage}/${character.id}?name=${query}`);
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
            onInfoAction={(info) => setTotalPages(info?.pages || 0)}
            onCharactersAction={handleCharacters}
            detailsId={detailsId}
            onCloseDetails={handleCloseDetails}
            onSelectCharacterAction={handleSelect}
            hasOutlet={!!detailsId}
          />
        </div>
        <ErrorButton />
      </div>
    </div>
  );
}
