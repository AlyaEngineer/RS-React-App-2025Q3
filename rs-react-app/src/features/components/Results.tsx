import { Component } from 'react';

import CharacterFetcher from '@/features/components/fetcher/characterFetcher';
import { cn } from '@/libs/utils';

import { ResultsProps } from '../types/searchTypes';

import CharacterItems from './CharacterItems';
import CharacterListSkeleton from './CharacterListSkeleton';

class Results extends Component<ResultsProps> {
  render() {
    const { searchQuery } = this.props;

    return (
      <div
        className={cn(
          'bg-dark/4',
          'shadow-3xl/20 rounded-xl',
          'flex h-auto w-full flex-col items-center justify-center gap-8',
          'p-6 max-sm:p-4',
          'backdrop-invert backdrop-opacity-5'
        )}
      >
        <h2 className="text-center text-2xl font-bold text-white">
          Search results for the query &quot;{searchQuery}&quot;
        </h2>

        <CharacterFetcher query={searchQuery}>
          {(data) => {
            if (data.loading) return <CharacterListSkeleton />;
            if (data.error)
              return (
                <p className="mb-4 text-center text-3xl font-bold text-red-400">
                  Error {data.error.status}: {data.error.message}
                </p>
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
