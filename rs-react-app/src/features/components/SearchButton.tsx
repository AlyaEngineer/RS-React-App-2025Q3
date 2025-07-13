import { Component } from 'react';
import { Rocket } from 'lucide-react';
import { cn } from '@/libs/utils';

interface SearchButtonProps {
  onClick: () => void;
}

class SearchButton extends Component<SearchButtonProps> {
  render() {
    return (
      <button
        type="submit"
        onClick={this.props.onClick}
        className={cn(
          'flex',
          'w-1/4',
          'cursor-pointer',
          'items-center justify-center',
          'gap-2.5',
          'rounded-[15px]',
          'bg-button-background',
          'p-2',
          'text-gray-600',
          'shadow-xl inset-shadow-sm',
          'transition delay-150 duration-300 ease-in-out',
          'text-shadow-2xs',
          'hover:bg-button-background-hover hover:shadow-xl/20',
          'max-md:w-full',
          'focus:border-none'
        )}
      >
        <Rocket strokeWidth={1.25} />
        Let&apos;s search
      </button>
    );
  }
}

export default SearchButton;
