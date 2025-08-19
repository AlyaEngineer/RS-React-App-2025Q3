import { useTranslations } from 'next-intl';

import { Character } from '@/features/types/apiTypes';

type Item = Pick<Character, 'id' | 'name' | 'gender' | 'species' | 'status' | 'created'>;

export const DownloadButton = ({ items }: { items: Item[] }) => {
  const downloadCSV = () => {
    const headers = ['id', 'name', 'gender', 'species', 'status', 'created'];
    const csvString = [
      headers.join(','),
      ...items.map((item) =>
        headers
          .map((header) => {
            const value = item[header as keyof Item] ?? '';
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${items.length}_items.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const t = useTranslations('Flyout');

  return (
    <button
      onClick={downloadCSV}
      className="bg-button-error/90 hover:bg-button-error-hover cursor-pointer rounded px-4 py-2 text-white transition-colors duration-300 max-sm:text-sm"
    >
      {t('download')}
    </button>
  );
};
