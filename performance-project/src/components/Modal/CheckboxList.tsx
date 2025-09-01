import { CheckboxListProps } from '@/types/checkboxListTypes';
import { formatColumnName } from '@/utils/formatColumnName';

export default function CheckboxList({
  availableColumns,
  selectedColumns,
  setSelectedColumns,
}: CheckboxListProps) {
  if (availableColumns.length === 0) {
    return <p className="text-gray-500">No additional information for the selected year</p>;
  }
  return (
    <div className="mb-6 flex max-h-96 flex-col gap-2 overflow-y-auto">
      {availableColumns.map((column) => (
        <label
          key={column}
          className="flex items-center gap-2 hover:cursor-pointer hover:text-shadow-lg"
        >
          <input
            type="checkbox"
            checked={selectedColumns.includes(column)}
            className="h-4 w-4 hover:cursor-pointer"
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedColumns([...selectedColumns, column]);
              } else {
                setSelectedColumns(selectedColumns.filter((col) => col !== column));
              }
            }}
          />
          <span>{formatColumnName(column)}</span>
        </label>
      ))}
    </div>
  );
}
