import { useData } from '@/hooks/useData';
import AddInfoButton from '../AddInfoButton';

export default function TableBody() {
  const data = useData();
  const countries = Object.keys(data);

  return (
    <tbody className="block md:table-row-group">
      {countries.map((name, index) => {
        const latest = data[name].data.at(-1);
        return (
          <tr
            key={name}
            className={`block border border-gray-200 md:table-row ${
              index % 2 === 0 ? 'bg-gray-300' : 'bg-white'
            }`}
          >
            <td className="block p-2 text-left md:table-cell md:border md:border-gray-200">
              <span className="inline-block w-1/3 font-bold md:hidden">Name</span>
              {name}
            </td>
            <td className="block p-2 text-left md:table-cell md:border md:border-gray-200">
              <span className="inline-block w-1/3 font-bold md:hidden">ISO</span>
              {data[name].iso_code ?? 'N/A'}
            </td>
            <td className="block p-2 text-left md:table-cell md:border md:border-gray-200">
              <span className="inline-block w-1/3 font-bold md:hidden">Year</span>
              {latest?.year}
            </td>
            <td className="block p-2 text-left md:table-cell md:border md:border-gray-200">
              <span className="inline-block w-1/3 font-bold md:hidden">Population</span>
              {latest?.population ?? 'N/A'}
            </td>

            <td className="block p-2 text-left md:table-cell md:border md:border-gray-200">
              <span className="inline-block w-1/3 font-bold md:hidden">CO₂</span>
              {latest?.co2 ?? 'N/A'}
            </td>
            <td className="block p-2 text-left md:table-cell md:border md:border-gray-200">
              <span className="inline-block w-1/3 font-bold md:hidden">CO₂ per capita</span>
              {latest?.co2_per_capita ?? 'N/A'}
            </td>

            <td className="block p-2 text-left md:table-cell md:border md:border-gray-200">
              <span className="inline-block w-1/3 font-bold md:hidden">Actions</span>
              <AddInfoButton />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
