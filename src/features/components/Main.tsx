import { Component } from 'react';

import { cn } from '@/libs/utils';

import ErrorButton from './errorHandling/ErrorButton';
import Results from './fetcher/Results';
import Search from './search/Search';

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
          'rounded-xl',
          '@9xl:m-auto p-6',
          'backdrop-invert backdrop-opacity-5',
          'max-w-(--my-max-width)'
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
