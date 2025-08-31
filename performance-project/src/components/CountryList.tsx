import { Suspense, useState } from 'react';
import TableHeader from './Table/TableHeader';
import TableBody from './Table/TableBody';
import TableSkeleton from './ui/TableSkeleton';
import { CountryListProps } from '@/types/countryListTypes';
import { useData } from '@/hooks/useData';

export default function CountryList({ selectedYear, searchQuery }: CountryListProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const data = useData();
  const countries = Object.keys(data).filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col overflow-x-auto p-4">
      <h1 className="mb-4 text-2xl font-bold max-sm:text-xl">
        CO₂ emissions data by countries and regions
      </h1>
      <table className="w-full table-fixed border-collapse max-lg:text-sm lg:table">
        <TableHeader selectedColumns={selectedColumns} />
        <Suspense fallback={<TableSkeleton rows={6} />}>
          <TableBody
            countries={countries}
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
            selectedYear={selectedYear}
          />
        </Suspense>
      </table>
    </div>
  );
}
