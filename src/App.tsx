import { Component } from 'react';

import ErrorButton from './features/components/errorHandling/ErrorButton';
import Results from './features/components/fetcher/Results';
import Search from './features/components/search/Search';
import { cn } from './libs/utils';

class App extends Component {
  state = {
    searchQuery: localStorage.getItem('searchQuery') || '',
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
    localStorage.setItem('searchQuery', query);
  };

  render() {
    return (
      <div
        className={cn(
          'min-h-screen w-full overflow-x-hidden overflow-y-auto p-10 max-md:p-5',
          '@container'
        )}
      >
        <div
          className={cn(
            'bg-dark/4 shadow-3xl/20',
            'flex h-auto flex-col items-center justify-center gap-8',
            '@9xl:m-auto rounded-xl p-6',
            'backdrop-invert backdrop-opacity-5',
            'max-w-(--my-max-width)'
          )}
        >
          <Search onSearch={this.handleSearch} />
          <Results searchQuery={this.state.searchQuery} />
          <ErrorButton />
        </div>
      </div>
    );
  }
}

export default App;
