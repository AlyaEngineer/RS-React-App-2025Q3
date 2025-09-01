import { memo, Suspense, useState, useCallback, useMemo } from 'react';
import TableHeader from './Table/TableHeader';
import TableBody from './Table/TableBody';
import TableSkeleton from './ui/TableSkeleton';
import { CountryListProps } from '@/types/countryListTypes';
import { useData } from '@/hooks/useData';
import { sortCountriesByPopulation } from '@/utils/sortCountries';

function CountryList({ selectedYear, searchQuery }: CountryListProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending' | null>(null);

  const data = useData();

  const filteredCountries = useMemo(() => {
  return Object.keys(data).filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [data, searchQuery]);

  const countries = useMemo(() => {
    if (!sortOrder) return filteredCountries;
    return sortCountriesByPopulation(data, filteredCountries, selectedYear, sortOrder);
  }, [data, filteredCountries, selectedYear, sortOrder]);

  const handleColumnsChange = useCallback((columns: string[]) => {
    setSelectedColumns(columns);
  }, []);

  const handleSortPopulation = useCallback(() => {
    setSortOrder((prev) => {
      if (prev === 'ascending') return 'descending';
      if (prev === 'descending') return null;
      return 'ascending';
    });
  }, []);

  return (
    <div className="flex flex-col overflow-x-auto p-4">
      <h1 className="mb-4 text-2xl font-bold max-sm:text-xl">
        CO₂ emissions data by countries and regions
      </h1>
      <table className="w-full table-fixed border-collapse max-lg:text-sm lg:table">
        <TableHeader
          selectedColumns={selectedColumns}
          onSortPopulation={handleSortPopulation}
          sortOrder={sortOrder}
        />
        <Suspense fallback={<TableSkeleton rows={6} />}>
          <TableBody
            countries={countries}
            selectedColumns={selectedColumns}
            setSelectedColumns={handleColumnsChange}
            selectedYear={selectedYear}
          />
        </Suspense>
      </table>
    </div>
  );
}

export default memo(CountryList);
