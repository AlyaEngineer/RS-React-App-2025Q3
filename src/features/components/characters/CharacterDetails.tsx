import { CircleX } from 'lucide-react';

import { CharacterDetailsProps } from '@/features/types/viewTypes';

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
        <img src={image} alt={name} className="mb-4 h-60 w-60 rounded-xl object-cover" />
        <h2 className="mb-2 text-center text-2xl font-bold text-white">{name}</h2>
        <p className="mb-1 text-white">
          race: <strong>{species}</strong>
        </p>
        <p className="mb-1 text-white">
          gender: <strong>{gender}</strong>
        </p>
        <p className="mb-1 text-white">
          status: <strong>{status}</strong>
        </p>
        {type && (
          <p className="mb-1 text-white">
            type: <strong>{type}</strong>
          </p>
        )}
        <p className="mb-1 text-white">
          origin: <strong>{origin.name}</strong>
        </p>
        <p className="mb-1 text-white">
          location: <strong>{location.name}</strong>
        </p>
        <p className="mb-1 text-white">
          created: <strong>{new Date(created).toLocaleDateString()}</strong>
        </p>

        <div className="flex w-full flex-col">
          <h3 className="mt-3 text-center text-xl font-semibold text-white">Episodes</h3>
          <div className="mt-4 w-full">
            <ul className="max-h-screen list-disc overflow-y-auto pl-5 text-lg text-white">
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
