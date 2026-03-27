'use client';

import { useTranslations } from 'next-intl';

import { Character } from '@/features/types/apiTypes';

import { downloadFile } from './download.actions';

type Item = Pick<Character, 'id' | 'name' | 'gender' | 'species' | 'status' | 'created'>;

export function DownloadButton({ items }: { items: Item[] }) {
  const t = useTranslations('Flyout');

  async function downloadCSV() {
    const formData = new FormData();
    formData.append('items', JSON.stringify(items));

    const { csv, filename } = await downloadFile(formData);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={() => {
        void downloadCSV();
      }}
      className="bg-button-error/90 hover:bg-button-error-hover cursor-pointer rounded px-4 py-2 text-white transition-colors duration-300 max-sm:text-sm"
    >
      {t('download')}
    </button>
  );
}
