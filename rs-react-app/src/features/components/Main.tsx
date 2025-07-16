import { Component } from 'react';

import { cn } from '@/libs/utils';

import ErrorButton from './ErrorButton';
import Results from './Results';
import Search from './Search';
class Main extends Component {
  state = {
    searchQuery: localStorage.getItem('searchQuery') || '',
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <div
        className={cn(
          'bg-dark/4',
          'shadow-3xl/20',
          'flex h-auto flex-col items-center justify-center gap-8',
          'rounded-[10px]',
          'm-6 p-6 max-sm:m-3 max-sm:p-4',
          'backdrop-invert backdrop-opacity-5',
          'max-w-[1550px]'
        )}
      >
        <Search onSearch={this.handleSearch} />
        <Results searchQuery={this.state.searchQuery} />
        <ErrorButton />
      </div>
    );
  }
}

export default Main;
