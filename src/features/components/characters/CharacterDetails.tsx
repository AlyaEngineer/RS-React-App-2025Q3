import { CircleX } from 'lucide-react';

import { CharacterDetailsProps } from '@/features/types/viewTypes';

import { Checkbox } from '../checkbox/Checkbox';

export default function CharacterDetails({ character, onClose }: CharacterDetailsProps) {
  const { name, status, species, gender, type, origin, location, image, episode, created } =
    character;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          className="hover:text-button-error text-white hover:cursor-pointer"
          onClick={onClose}
        >
          <CircleX strokeWidth={1.25} size={32} />
        </button>
      </div>
      <div className="flex flex-col">
        <img
          src={image}
          alt={name}
          className="shadow-3xl/20 mb-4 h-60 w-60 self-center rounded-xl object-cover"
        />
        <div className="self-center">
          <Checkbox character={character} />
        </div>
        <h2 className="text-text-content mb-2 text-center text-2xl font-bold dark:text-white">
          {name}
        </h2>
        <p className="text-text-content mb-1 dark:text-white">
          race: <strong>{species}</strong>
        </p>
        <p className="text-text-content mb-1 dark:text-white">
          gender: <strong>{gender}</strong>
        </p>
        <p className="text-text-content mb-1 dark:text-white">
          status: <strong>{status}</strong>
        </p>
        {type && (
          <p className="text-text-content mb-1 dark:text-white">
            type: <strong>{type}</strong>
          </p>
        )}
        <p className="text-text-content mb-1 dark:text-white">
          origin: <strong>{origin.name}</strong>
        </p>
        <p className="text-text-content mb-1 dark:text-white">
          location: <strong>{location.name}</strong>
        </p>
        <p className="text-text-content mb-1 dark:text-white">
          created: <strong>{new Date(created).toLocaleDateString()}</strong>
        </p>

        <div className="flex w-full flex-col">
          <h3 className="text-text-content mt-3 text-center text-xl font-semibold dark:text-white">
            Episodes
          </h3>
          <div className="mt-4 w-full">
            <ul className="text-text-content max-h-screen list-disc overflow-y-auto pl-5 text-lg dark:text-white">
              {episode.map((episodeUrl) => {
                const episodeId = episodeUrl.split('/').pop();
                return (
                  <li key={episodeUrl}>
                    Episode <strong>#{episodeId}</strong>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
