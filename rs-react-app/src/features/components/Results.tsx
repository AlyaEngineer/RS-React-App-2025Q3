import { cn } from '@/libs/utils';
import { Component } from 'react';
import CharacterFetcher from '@/features/fetcher/characterFetcher';
import CharacterItems from './CharacterItems';

interface ResultsProps {
  searchQuery: string;
}

class Results extends Component<ResultsProps> {
  render() {
    const { searchQuery } = this.props;

    return (
      <div
        className={cn(
          'bg-dark/4',
          'shadow-3xl/20',
          'flex h-auto flex-col items-center justify-center gap-8',
          'rounded-[10px]',
          'p-6 max-sm:p-4',
          'backdrop-invert backdrop-opacity-5',
          'w-full'
        )}
      >
        <h2 className="text-center text-2xl font-bold text-white">
          Search results for the query &quot;{searchQuery}&quot;
        </h2>

        <CharacterFetcher query={searchQuery}>
          {(data) => {
            if (data.loading)
              return (
                <p className="mb-4 text-center text-3xl font-bold text-lime-300">Loading...</p>
              );
            if (data.error)
              return (
                <p className="mb-4 text-center text-3xl font-bold text-red-400">{data.error}</p>
              );
            if (data.characters.length === 0)
              return (
                <p className="mb-4 text-center text-3xl font-bold text-white">Nothing found</p>
              );

            return <CharacterItems characters={data.characters} />;
          }}
        </CharacterFetcher>
      </div>
    );
  }
}

export default Results;
