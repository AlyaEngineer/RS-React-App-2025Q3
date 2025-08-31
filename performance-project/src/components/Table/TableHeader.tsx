import { TableHeaderProps } from '@/types/tableTypes';
import { formatColumnName } from '@/utils/formatColumnName';
import { ArrowUpDown } from 'lucide-react';
import Button from '../ui/Button';

export default function TableHeader({ selectedColumns, onSortPopulation }: TableHeaderProps) {
  return (
    <thead className="block md:table-header-group">
      <tr className="absolute -top-full -left-full block border border-gray-500 md:relative md:top-auto md:left-auto md:table-row md:border-none">
        <th className="block bg-gray-600 p-2 text-left font-bold break-words whitespace-normal text-white md:table-cell md:border md:border-gray-500">
          Name
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold break-words whitespace-normal text-white md:table-cell md:border md:border-gray-500">
          ISO
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold break-words whitespace-normal text-white md:table-cell md:border md:border-gray-500">
          Year
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold break-words whitespace-normal text-white md:table-cell md:border md:border-gray-500">
          Population
          <Button onClick={onSortPopulation} variant="sort">
            <ArrowUpDown className="h-5 w-5" />
          </Button>
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold break-words whitespace-normal text-white md:table-cell md:border md:border-gray-500">
          CO₂
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold break-words whitespace-normal text-white md:table-cell md:border md:border-gray-500">
          CO₂ per capita
        </th>
        {selectedColumns.map((col) => (
          <th
            key={col}
            className="block bg-gray-600 p-2 text-left font-bold break-words whitespace-normal text-white md:table-cell md:border md:border-gray-500"
          >
            {formatColumnName(col)}
          </th>
        ))}
        <th className="block bg-gray-600 p-2 text-left font-bold break-words whitespace-normal text-white md:table-cell md:border md:border-gray-500">
          Actions
        </th>
      </tr>
    </thead>
  );
}
