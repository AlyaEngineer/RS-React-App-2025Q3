import { Checkbox } from '@/features/components/checkbox/Checkbox';
import { CloseButton } from '@/features/pages/CharacterDetailPage/CloseButton';
import { CharacterDetailsProps } from '@/features/types/viewTypes';

export default function CharacterDetails({ character, onClose }: CharacterDetailsProps) {
  const { name, status, species, gender, type, origin, location, image, episode, created } =
    character;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-end">
        <CloseButton onClose={onClose} />
      </div>
      <div className="flex flex-col text-2xl max-lg:text-lg max-md:text-base">
        <img
          src={image}
          alt={name}
          className="shadow-3xl/20 mb-4 h-auto w-full self-center rounded-md object-cover"
        />
        <div className="self-center">
          <Checkbox character={character} />
        </div>
        <h2 className="text-text-content my-3 text-center text-3xl font-bold max-lg:text-xl max-md:text-lg dark:text-white">
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
          <h3 className="text-text-content mt-3 text-center text-2xl font-semibold max-lg:text-lg dark:text-white">
            Episodes
          </h3>
          <div className="mt-4 w-full">
            <ul className="text-text-content max-h-screen list-disc overflow-y-auto pl-5 text-xl dark:text-white">
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
