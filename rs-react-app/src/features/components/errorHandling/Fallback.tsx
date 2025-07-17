import { cn } from '@/libs/utils';

function Fallback() {
  return (
    <div
      className={cn(
        'bg-dark/4',
        'shadow-3xl/20 rounded-4xl',
        'flex h-auto max-w-2xl flex-col items-center justify-center gap-8',
        'm-auto p-6 max-sm:mx-6',
        'backdrop-invert backdrop-opacity-5',
        'max-sm:w-sm sm:w-xl md:w-2xl lg:w-4xl xl:w-6xl'
      )}
    >
      <h1 className="mb-4 text-center text-3xl font-bold text-white">Something went wrong!</h1>
      <p className="mb-6 text-center text-2xl text-white">
        Try refreshing the page or coming back later.
      </p>
      <button
        className={cn(
          'flex w-full items-center justify-center gap-2.5 p-2',
          'cursor-pointer',
          'rounded-2xl shadow-xl inset-shadow-sm',
          'bg-button-reload',
          'text-xl text-gray-600 text-shadow-2xs',
          'transition delay-150 duration-300 ease-in-out',
          'hover:bg-button-reload-hover hover:shadow-xl/20'
        )}
        onClick={() => window.location.reload()}
      >
        Reload page
      </button>
    </div>
  );
}

export default Fallback;
