import { cn } from '@/libs/utils';
import { Rocket } from 'lucide-react';
import { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="flex w-full items-center justify-center gap-3 rounded-[80px] max-md:flex-col">
        <input
          type="text"
          name="searchInput"
          placeholder="Search the Rick and Morty Multiverse"
          className={cn(
            'w-3/4',
            'rounded-[15px]',
            'border-input-background border-1',
            'bg-input-background',
            'p-2 pl-3',
            'text-gray-600',
            'shadow-xl',
            'inset-shadow-sm',
            'transition delay-150 duration-300 ease-in-out',
            'outline-none',
            'text-shadow-2xs',
            'hover:shadow-xl/20 hover:outline-none',
            'focus:border-lime-300 focus:placeholder-transparent',
            'max-md:w-full'
          )}
        />
        <button
          type="button"
          className={cn(
            'flex',
            'w-1/4',
            'cursor-pointer',
            'items-center justify-center',
            'gap-2.5',
            'rounded-[15px]',
            'bg-button-background',
            'p-2',
            'text-gray-600',
            'shadow-xl inset-shadow-sm',
            'transition delay-150 duration-300 ease-in-out',
            'text-shadow-2xs',
            'hover:bg-button-background-hover hover:shadow-xl/20',
            'max-md:w-full'
          )}
        >
          <Rocket strokeWidth={1.25} />
          Let&apos;s search
        </button>
      </div>
    );
  }
}

export default Search;
