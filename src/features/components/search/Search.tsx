'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { SearchProps } from '@/features/types/searchTypes';

import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') ?? '';
    setQuery(savedQuery);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    localStorage.setItem('searchQuery', trimmed);

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('name', trimmed);
    currentParams.set('page', '1');

    router.push(`/?${currentParams.toString()}`);
    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="flex w-full items-center justify-center gap-3 max-md:flex-col"
    >
      <SearchInput value={query} onChange={handleInputChange} />
      <SearchButton onClick={handleSearch} />
    </form>
  );
}
