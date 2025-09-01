import { useYears } from '@/hooks/useData';
import { YearSelectorProps } from '@/types/yearSelectorTypes';

export default function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  const years = useYears();

  return (
    <form className="mx-auto w-full max-w-sm">
      <label
        htmlFor="years"
        className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Select a year
      </label>
      <select
        id="years"
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500"
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
