import { Component } from 'react';

import { cn } from '@/libs/utils';

import { ErrorButtonState } from '../types/errorTypes';

class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { shouldThrow: false };
  }

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('ErrorBoundary check: not real error');
    }

    return (
      <button
        onClick={this.handleClick}
        className={cn(
          'flex',
          'w-1/4',
          'cursor-pointer',
          'items-center justify-center',
          'gap-2.5',
          'rounded-[15px]',
          'bg-button-error',
          'p-2',
          'text-gray-600',
          'shadow-xl inset-shadow-sm',
          'transition delay-150 duration-300 ease-in-out',
          'text-shadow-2xs',
          'hover:bg-button-error-hover hover:shadow-xl/20',
          'max-md:w-full'
        )}
      >
        Click me to trigger the error
      </button>
    );
  }
}

export default ErrorButton;
