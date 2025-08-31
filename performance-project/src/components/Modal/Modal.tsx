import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '@/types/modalTypes';
import Button from '../ui/Button';
import CheckboxList from './CheckboxList';

export default function ColumnSelectorModal({
  isOpen,
  onClose,
  yearData,
  onColumnsChange,
}: ModalProps) {
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  useEffect(() => {
    if (!yearData) {
      setAvailableColumns([]);
      return;
    }

    const keys = Object.keys(yearData).filter((key) => {
      return key !== 'year' && key !== 'population' && key !== 'co2' && key !== 'co2_per_capita';
    });

    setAvailableColumns(keys);
  }, [yearData]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-5 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
      <div className="relative m-4 w-full max-w-screen-md overflow-hidden rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">
          Select additional columns {yearData ? `(Year: ${yearData.year})` : ''}
        </h2>

        <CheckboxList
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />

        <div className="flex flex-wrap items-center justify-end pt-4">
          <Button onClick={onClose} variant="cancel">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onColumnsChange(selectedColumns);
              onClose();
            }}
            variant="ok"
          >
            OK
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
