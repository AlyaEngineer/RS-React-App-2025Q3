import { cn } from '@/libs/utils';
import { Component } from 'react';

class Results extends Component {
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
          'w-full'
        )}
      >
        <h2>Results</h2>
        <ul>
          <li>Item 1 — description</li>
          <li>Item 2 — description</li>
        </ul>
      </div>
    );
  }
}

export default Results;
