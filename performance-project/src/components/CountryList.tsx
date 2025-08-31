import { Suspense, useState } from 'react';
import TableHeader from './Table/TableHeader';
import TableBody from './Table/TableBody';
import TableSkeleton from './ui/TableSkeleton';

export default function CountryList() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  return (
    <div className="flex flex-col overflow-x-auto p-4">
      <h1 className="mb-4 text-2xl font-bold max-sm:text-xl">
        CO₂ emissions data by countries and regions
      </h1>
      <table className="w-full border-collapse max-lg:text-sm lg:table">
        <TableHeader selectedColumns={selectedColumns} />
        <Suspense fallback={<TableSkeleton rows={6} />}>
          <TableBody selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} />
        </Suspense>
      </table>
    </div>
  );
}
