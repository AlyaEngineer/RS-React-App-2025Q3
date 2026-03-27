'use server';

import { Character } from '@/features/types/apiTypes';

type Item = Pick<Character, 'id' | 'name' | 'gender' | 'species' | 'status' | 'created'>;

export async function downloadFile(formData: FormData) {
  await Promise.resolve();
  const itemsJson = formData.get('items') as string;

  const items = JSON.parse(itemsJson.toString()) as Item[];

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

  return {
    csv: csvString,
    filename: `${items.length}_items.csv`,
  };
}
