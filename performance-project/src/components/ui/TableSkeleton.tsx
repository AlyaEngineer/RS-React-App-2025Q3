import { TABLE_CONFIG } from '@/constants/tableConfig';

export default function TableSkeleton({
  rows = TABLE_CONFIG.SKELETON_ROW_COUNT,
}: {
  rows?: number;
}) {
  return (
    <tbody className="block animate-pulse md:table-row-group">
      {Array.from({ length: rows }).map((_, i) => (
        <tr
          key={i}
          className={`block border border-gray-200 md:table-row md:border-none ${
            i % 2 === 0 ? 'bg-gray-300' : 'bg-white'
          }`}
        >
          {Array.from({ length: TABLE_CONFIG.DEFAULT_TABLE_COLUMNS }).map((_, j) => (
            <td
              key={j}
              className="block p-2 max-md:w-1/2 md:table-cell md:w-1/7 md:border md:border-gray-200"
            >
              <div className="h-4 w-full rounded bg-gray-400"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
