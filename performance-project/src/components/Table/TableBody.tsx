import { useData } from '@/hooks/useData';
import { YearData } from '@/types/dataTypes';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { TableBodyProps } from '@/types/tableTypes';
import Button from '../ui/Button';

export default function TableBody({
  countries,
  selectedColumns,
  setSelectedColumns,
  selectedYear,
}: TableBodyProps) {
  const data = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [activeYearData, setActiveYearData] = useState<YearData | null>(null);

  return (
    <>
      <tbody className="block md:table-row-group">
        {countries.map((name, index) => {
          const yearData = data[name].data.find((d) => d.year === selectedYear) ?? null;
          return (
            <tr
              key={name}
              className={`block border border-gray-200 md:table-row ${
                index % 2 === 0 ? 'bg-gray-300' : 'bg-white'
              }`}
            >
              <td className="block p-2 text-left break-words whitespace-normal md:table-cell md:border md:border-gray-200">
                <span className="inline-block w-1/3 font-bold md:hidden">Name</span>
                {name}
              </td>
              <td className="block p-2 text-left break-words whitespace-normal md:table-cell md:border md:border-gray-200">
                <span className="inline-block w-1/3 font-bold md:hidden">ISO</span>
                {data[name].iso_code ?? 'N/A'}
              </td>
              <td className="block p-2 text-left break-words whitespace-normal md:table-cell md:border md:border-gray-200">
                <span className="inline-block w-1/3 font-bold md:hidden">Year</span>
                {yearData?.year ?? 'N/A'}
              </td>
              <td className="block p-2 text-left break-words whitespace-normal md:table-cell md:border md:border-gray-200">
                <span className="inline-block w-1/3 font-bold md:hidden">Population</span>
                {yearData?.population ?? 'N/A'}
              </td>
              <td className="block p-2 text-left break-words whitespace-normal md:table-cell md:border md:border-gray-200">
                <span className="inline-block w-1/3 font-bold md:hidden">CO₂</span>
                {yearData?.co2 ?? 'N/A'}
              </td>
              <td className="block p-2 text-left break-words whitespace-normal md:table-cell md:border md:border-gray-200">
                <span className="inline-block w-1/3 font-bold md:hidden">CO₂ per capita</span>
                {yearData?.co2_per_capita ?? 'N/A'}
              </td>

              {selectedColumns.map((column) => (
                <td
                  key={column}
                  className="block p-2 text-left break-words whitespace-normal md:table-cell md:border md:border-gray-200"
                >
                  <span className="inline-block w-1/3 font-bold md:hidden">{column}</span>
                  {yearData?.[column as keyof YearData] ?? 'N/A'}
                </td>
              ))}

              <td className="block p-2 text-left break-words whitespace-normal md:table-cell md:border md:border-gray-200">
                <span className="inline-block w-1/3 font-bold md:hidden">Actions</span>
                <Button
                  onClick={() => {
                    setActiveYearData(yearData ?? null);
                    setModalOpen(true);
                  }}
                  variant="add"
                >
                  Add info
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        yearData={activeYearData}
        onColumnsChange={(columns) => setSelectedColumns(columns)}
      />
    </>
  );
}
