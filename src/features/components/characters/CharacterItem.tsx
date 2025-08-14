import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { CharacterItemProps } from '@/features/types/viewTypes';

import { Checkbox } from '../checkbox/Checkbox';

export default function CharacterItem({ character }: CharacterItemProps) {
  const { name, species, gender, image } = character;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { page } = useParams();

  const query = searchParams.get('name') || '';

  const currentPage = page || '1';

  const handleClick = () => {
    void navigate(`/${currentPage}/${character.id}?name=${encodeURIComponent(query)}`);
  };

  return (
    <div
      className="bg-item-card/80 hover:bg-item-card relative flex h-full items-center rounded-md p-4 transition-colors duration-300 hover:cursor-pointer max-md:p-2.5"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="absolute top-1 right-1">
        <Checkbox character={character} />
      </div>
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="shadow-3xl/20 h-28 w-28 rounded-md object-cover"
      />
      <div className="ml-4 flex flex-col">
        <h4 className="text-text-content text-lg font-semibold max-md:text-base">{name}</h4>
        <p
          data-testid="character-race"
          className="text-left text-sm font-medium text-white dark:text-gray-400"
        >
          race: <strong>{species}</strong>
        </p>
        <p
          data-testid="character-gender"
          className="text-left text-sm font-medium text-white dark:text-gray-400"
        >
          gender: <strong>{gender}</strong>
        </p>
      </div>
    </div>
  );
}
