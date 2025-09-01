import { Suspense, useCallback, useState } from 'react';
import CountryList from './components/CountryList';
import Spinner from './components/ui/Spinner';
import YearSelector from './components/YearSelector';
import { useYears } from './hooks/useData';
import CountrySearch from './components/SearchBar';

export default function App() {
  const years = useYears();
  const [selectedYear, setSelectedYear] = useState(
    years.length > 0 ? years[years.length - 1] : new Date().getFullYear()
  );

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-col items-start justify-end gap-5 p-4">
        <div className="flex items-center justify-center gap-6 p-4">
          <CountrySearch onSearch={handleSearch} />
          <YearSelector selectedYear={selectedYear} onYearChange={handleYearChange} />
        </div>
        <CountryList selectedYear={selectedYear} searchQuery={searchQuery} />
      </div>
    </Suspense>
  );
}
