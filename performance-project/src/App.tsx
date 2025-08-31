import { Suspense, useState } from 'react';
import CountryList from './components/CountryList';
import Spinner from './components/ui/Spinner';
import YearSelector from './components/YearSelector';
import { useYears } from './hooks/useData';

export default function App() {
  const years = useYears();
  const [selectedYear, setSelectedYear] = useState(
    years.length > 0 ? years[years.length - 1] : new Date().getFullYear()
  );
  return (
    <Suspense fallback={<Spinner />}>
      <div className=" flex flex-col items-center justify-center gap-5 p-4">
        <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
        <CountryList selectedYear={selectedYear} />
      </div>
    </Suspense>
  );
}
