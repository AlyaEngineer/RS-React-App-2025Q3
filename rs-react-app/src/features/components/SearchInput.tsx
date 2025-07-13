import { Component } from 'react';
import { cn } from '@/libs/utils';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends Component<SearchInputProps> {
  render() {
    return (
      <input
        type="text"
        name="searchInput"
        value={this.props.value}
        onChange={this.props.onChange}
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
    );
  }
}

export default SearchInput;
