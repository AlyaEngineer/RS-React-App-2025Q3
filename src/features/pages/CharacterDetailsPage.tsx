import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { fetchCharacterById } from '../api/characterApi';
import CharacterDetails from '../components/characters/CharacterDetails';
import { Character } from '../types/apiTypes';

type OutletContextType = {
  onCloseDetails: () => void;
};

export default function CharacterDetailsPage() {
  const { detailsId } = useParams();
  const { onCloseDetails } = useOutletContext<OutletContextType>();

  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!detailsId) return;
    fetchCharacterById(detailsId)
      .then(setCharacter)
      .catch(() => onCloseDetails());
  }, [detailsId, onCloseDetails]);

  if (!character) return <p>Loading...</p>;

  return <CharacterDetails character={character} onClose={onCloseDetails} />;
}
