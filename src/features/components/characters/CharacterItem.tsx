import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { CharacterItemProps } from '@/features/types/viewTypes';

export default function CharacterItem({ character }: CharacterItemProps) {
  const { name, species, gender, location, image } = character;
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
      className="flex h-full items-center rounded-md bg-slate-700/80 p-4 hover:cursor-pointer hover:bg-slate-700 max-md:p-2.5"
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
      <img src={image} alt={name} loading="lazy" className="h-24 w-24 rounded-md object-cover" />
      <div className="ml-4 flex flex-col">
        <h4 className="text-lg font-semibold text-white max-md:text-base">{name}</h4>
        <p className="text-left text-sm font-medium text-gray-400">
          race: <strong>{species}</strong>
        </p>
        <p className="text-left text-sm font-medium text-gray-400">
          gender: <strong>{gender}</strong>
        </p>
        <p className="text-left text-sm font-medium text-gray-400">
          location: <strong>{location.name}</strong>
        </p>
      </div>
    </div>
  );
}
