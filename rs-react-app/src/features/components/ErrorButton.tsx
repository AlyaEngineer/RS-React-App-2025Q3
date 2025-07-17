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
      throw new Error('ErrorBoundary caught an error');
    }

    return (
      <button
        onClick={this.handleClick}
        className={cn(
          'bg-button-error flex w-1/4 items-center justify-center gap-2.5 p-2 max-md:w-full',
          'cursor-pointer',
          'rounded-2xl shadow-xl inset-shadow-sm',
          'text-gray-600 text-shadow-2xs',
          'transition delay-150 duration-300 ease-in-out',
          'hover:bg-button-error-hover hover:shadow-xl/20'
        )}
      >
        Click me to trigger the error
      </button>
    );
  }
}

export default ErrorButton;
