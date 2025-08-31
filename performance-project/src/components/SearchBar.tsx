import { Search } from 'lucide-react';
import { useState, FormEvent } from 'react';
import Button from './ui/Button';
import { CountrySearchProps } from '@/types/searchTypes';

export default function CountrySearch({ onSearch }: CountrySearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className="mx-auto" onSubmit={handleSubmit}>
      <label htmlFor="country-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="search"
          id="country-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="focus:ring-0.5 block w-96 rounded-lg border border-gray-300 bg-gray-50 p-3 ps-10 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          placeholder="Search countries..."
        />
        <Button variant="search" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
}
