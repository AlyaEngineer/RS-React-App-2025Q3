import { useYears } from '@/hooks/useData';
import { YearSelectorProps } from '@/types/yearSelectorTypes';

export default function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  const years = useYears();

  return (
    <form className="w-full mx-auto max-w-sm">
      <label
        htmlFor="years"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Select a year
      </label>
      <select
        id="years"
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}
