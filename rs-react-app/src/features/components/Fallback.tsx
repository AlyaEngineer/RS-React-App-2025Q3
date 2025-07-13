import { cn } from '@/libs/utils';

function Fallback() {
  return (
    <div
      className={cn(
        'bg-dark/4',
        'shadow-3xl/20',
        'flex h-auto max-w-[700px] flex-col items-center justify-center gap-8',
        'rounded-[30px]',
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
          'flex',
          'cursor-pointer',
          'items-center justify-center',
          'gap-2.5',
          'rounded-[15px]',
          'bg-button-reload',
          'p-2',
          'text-xl text-gray-600',
          'shadow-xl inset-shadow-sm',
          'transition delay-150 duration-300 ease-in-out',
          'text-shadow-2xs',
          'hover:bg-button-reload-hover hover:shadow-xl/20',
          'w-full'
        )}
        onClick={() => window.location.reload()}
      >
        Reload page
      </button>
    </div>
  );
}

export default Fallback;
