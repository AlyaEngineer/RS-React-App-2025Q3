import { RefreshCw } from 'lucide-react';

import { cn } from '@/libs/utils';

type RefreshButtonProps = {
  onRefresh: () => void;
  isFetching: boolean;
};

export function RefreshButton({ onRefresh, isFetching }: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      disabled={isFetching}
      className={cn(
        'bg-button-background flex items-center justify-center px-5 py-2',
        'cursor-pointer',
        'rounded-xl shadow-xl inset-shadow-sm',
        'transition delay-150 duration-300 ease-in-out',
        'text-white text-shadow-2xs dark:text-gray-600',
        'hover:bg-button-background-hover hover:shadow-xl/20'
      )}
      aria-label="refresh-data"
    >
      {isFetching ? (
        <>
          <RefreshCw className="animate-spin" size={28} strokeWidth={1.25} />
        </>
      ) : (
        <>
          <RefreshCw size={28} strokeWidth={1.25} />
        </>
      )}
    </button>
  );
}
