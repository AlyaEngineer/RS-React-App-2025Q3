import { Suspense } from 'react';
import TableHeader from './Table/TableHeader';
import TableBody from './Table/TableBody';
import TableSkeleton from './ui/TableSkeleton';

export default function CountryList() {
  return (
    <div className="flex flex-col overflow-x-auto p-4">
      <h1 className="mb-4 text-2xl font-bold max-sm:text-xl">
        CO₂ emissions data by countries and regions
      </h1>
      <table className="w-full border-collapse max-lg:text-sm lg:table">
        <TableHeader />
        <Suspense fallback={<TableSkeleton rows={6} />}>
          <TableBody />
        </Suspense>
      </table>
    </div>
  );
}
