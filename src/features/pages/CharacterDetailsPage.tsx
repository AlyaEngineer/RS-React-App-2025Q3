import { Loader } from 'lucide-react';
import { useOutletContext, useParams } from 'react-router-dom';

import { useCharacterById } from '@/hooks/useCharacterById';

import CharacterDetails from '../components/characters/CharacterDetails';

type OutletContextType = {
  onCloseDetails: () => void;
};

export default function CharacterDetailsPage() {
  const { detailsId } = useParams<{ detailsId: string }>();
  const { onCloseDetails } = useOutletContext<OutletContextType>();

  const { data: character, isLoading, isError } = useCharacterById(detailsId ?? '');

  if (isLoading) {
    return (
      <div className="flex h-full items-start justify-center" aria-label="loader">
        <Loader className="animate-spin text-white" size={32} />
      </div>
    );
  }

  if (isError || !character) {
    onCloseDetails();
    return null;
  }

  return <CharacterDetails character={character} onClose={onCloseDetails} />;
}
