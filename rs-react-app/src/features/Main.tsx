import { cn } from '@/libs/utils';
import { Component } from 'react';
import Search from './Search';

class Main extends Component {
  render() {
    return (
      <div
        className={cn(
          'bg-dark/4',
          'shadow-3xl/20',
          'flex h-auto flex-col items-center justify-center gap-8',
          'rounded-[30px]',
          'p-6',
          'backdrop-invert backdrop-opacity-5',
          'max-sm:w-sm sm:w-xl md:w-2xl lg:w-4xl xl:w-6xl'
        )}
      >
        <Search />
        <h2>Results</h2>
      </div>
    );
  }
}

export default Main;
