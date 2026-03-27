'use client';

import { Loader, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/router';

import { RefreshButton } from '@/features/components/refreshButton/RefreshButton';
import CharacterDetails from '@/features/pages/CharacterDetailPage/CharacterDetails';
import { useCharacterById } from '@/hooks/useCharacterById';

import { CloseButton } from './CloseButton';

interface CharacterDetailsPageProps {
  onCloseDetails: () => void;
}

export default function CharacterDetailsPage({ onCloseDetails }: CharacterDetailsPageProps) {
  const router = useRouter();
  const { detailsId } = router.query;

  const {
    data: character,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useCharacterById(detailsId as string);

  if (isLoading) {
    return (
      <div className="flex h-full items-start justify-center" aria-label="loader">
        <Loader className="m-5 animate-spin text-white" size={32} strokeWidth={1.25} />
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex h-full items-start justify-center" aria-label="loader">
        <RefreshCw className="m-5 animate-spin text-white" size={32} strokeWidth={1.25} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <CloseButton onClose={onCloseDetails} />
        </div>
        <p className="mb-4 max-w-56 text-center text-3xl font-bold text-red-400">
          Error loading character: {error?.message ?? 'Something went wrong'}
        </p>
      </div>
    );
  }

  return (
    <>
      <CharacterDetails character={character!} onClose={onCloseDetails} />
      <RefreshButton
        onRefresh={() => {
          void refetch();
        }}
        isFetching={isFetching}
      />
    </>
  );
}
