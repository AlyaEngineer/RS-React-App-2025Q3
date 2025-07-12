import { cn } from '@/libs/utils';
import { Component } from 'react';
import Search from './Search';
import ErrorButton from './ErrorButton';
import Results from './Results';
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
          'm-10 mx-auto p-6',
          'backdrop-invert backdrop-opacity-5',
          'max-w-[1550px]'
          // 'max-sm:w-sm sm:w-xl md:w-2xl lg:w-4xl xl:w-6xl'
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
