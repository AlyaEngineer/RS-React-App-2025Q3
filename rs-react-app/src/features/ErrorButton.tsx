import { cn } from '@/libs/utils';
import { Component } from 'react';

interface State {
  shouldThrow: boolean;
}

class ErrorButton extends Component<object, State> {
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
          'bg-[#F58311]',
          'p-2',
          'text-gray-600',
          'shadow-xl inset-shadow-sm',
          'transition delay-150 duration-300 ease-in-out',
          'text-shadow-2xs',
          'hover:bg-[#e66c10] hover:shadow-xl/20',
          'max-md:w-full'
        )}
      >
        Click me to trigger the error
      </button>
    );
  }
}

export default ErrorButton;
