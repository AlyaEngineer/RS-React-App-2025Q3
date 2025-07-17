import { Component } from 'react';

import { SearchInputProps } from '@/features/types/searchTypes';
import { cn } from '@/libs/utils';

class SearchInput extends Component<SearchInputProps> {
  render() {
    return (
      <input
        type="search"
        name="searchInput"
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder="Search the Rick and Morty Multiverse"
        className={cn(
          'bg-input-background border-input-background w-3/4 border-1 p-2 pl-3 max-md:w-full',
          'rounded-xl shadow-xl inset-shadow-sm outline-none',
          'text-gray-600 text-shadow-2xs',
          'transition delay-150 duration-300 ease-in-out',
          'hover:shadow-xl/20 hover:outline-none',
          'focus:border-lime-300 focus:placeholder-transparent'
        )}
      />
    );
  }
}

export default SearchInput;
