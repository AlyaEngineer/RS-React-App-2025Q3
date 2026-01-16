import type { Metadata } from 'next';

import { fetchCharactersByName } from '@/features/api/characterApi';

import MainClient from '../Main';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Search App',
  description: 'My App for searching Rick and Morty characters',
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { slug = [] } = await params;
  const { name = '' } = await searchParams;
  const currentPage = slug[0] ? Number(slug[0]) : 1;
  const detailsId = slug[1];
  const query = name;
  const initialData = await fetchCharactersByName(query, currentPage);

  return (
    <MainClient
      initialData={initialData}
      currentPage={currentPage}
      query={query}
      detailsId={detailsId}
    />
  );
}
