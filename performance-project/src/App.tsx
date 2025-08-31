import { Suspense, useState } from 'react';
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

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-col items-start justify-end gap-5 p-4">
        <div className="flex items-center justify-center gap-6 p-4">
          <CountrySearch onSearch={(query) => setSearchQuery(query)} />
          <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
        </div>
        <CountryList selectedYear={selectedYear} searchQuery={searchQuery} />
      </div>
    </Suspense>
  );
}
