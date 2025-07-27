import { CircleX } from 'lucide-react';

import { CharacterDetailsProps } from '@/features/types/viewTypes';

export default function CharacterDetails({ character, onClose }: CharacterDetailsProps) {
  const { name, status, species, gender, type, origin, location, image, episode, created } =
    character;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button
          className="hover:text-button-error text-white hover:cursor-pointer"
          onClick={onClose}
        >
          <CircleX strokeWidth={1.25} />
        </button>
      </div>

      <div className="flex flex-col">
        <img src={image} alt={name} className="mb-4 h-60 w-60 rounded-xl object-cover" />
        <h2 className="mb-2 text-center text-2xl text-white font-bold">{name}</h2>
        <p className="mb-1 text-gray-400">
          race: <strong>{species}</strong>
        </p>
        <p className="mb-1 text-gray-400">
          gender: <strong>{gender}</strong>
        </p>
        <p className="mb-1 text-gray-400">
          status: <strong>{status}</strong>
        </p>
        {type && (
          <p className="mb-1 text-gray-400">
            type: <strong>{type}</strong>
          </p>
        )}
        <p className="mb-1 text-gray-400">
          origin: <strong>{origin.name}</strong>
        </p>
        <p className="mb-1 text-gray-400">
          location: <strong>{location.name}</strong>
        </p>
        <p className="mb-1 text-gray-400">
          created: <strong>{new Date(created).toLocaleDateString()}</strong>
        </p>

        <div className="w-full">
          <h3 className="my-2 text-center text-lg text-white font-semibold">Episodes</h3>
          <div className="mt-4 max-h-96 w-full overflow-y-auto">
            <ul className="max-h-52 list-disc pl-5 text-lg text-gray-400">
              {episode.map((episodeUrl) => {
                const episodeId = episodeUrl.split('/').pop();
                return <li key={episodeUrl}>Episode <strong>#{episodeId}</strong></li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
