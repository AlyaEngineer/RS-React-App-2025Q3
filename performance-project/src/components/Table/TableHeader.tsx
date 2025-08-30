export default function TableHeader() {
  return (
    <thead className="block md:table-header-group">
      <tr className="absolute -top-full -left-full block border border-gray-500 md:relative md:top-auto md:left-auto md:table-row md:border-none">
        <th className="block bg-gray-600 p-2 text-left font-bold text-white md:table-cell md:border md:border-gray-500">
          Name
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold text-white md:table-cell md:border md:border-gray-500">
          ISO
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold text-white md:table-cell md:border md:border-gray-500">
          Year
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold text-white md:table-cell md:border md:border-gray-500">
          Population
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold text-white md:table-cell md:border md:border-gray-500">
          CO₂
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold text-white md:table-cell md:border md:border-gray-500">
          CO₂ per capita
        </th>
        <th className="block bg-gray-600 p-2 text-left font-bold text-white md:table-cell md:border md:border-gray-500">
          Actions
        </th>
      </tr>
    </thead>
  );
}
