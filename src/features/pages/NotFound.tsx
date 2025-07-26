import { ArrowBigLeft } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/libs/utils';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-between py-8">
      <div className="flex">
        <img
          src="/404.svg"
          alt="Sorry, page not found! We can not find page you are looking for"
          className="w-xl"
        />
      </div>
      <div className="mb-15 flex w-fit">
        <Link
          className={cn(
            'flex w-full items-center px-4 py-2',
            'cursor-pointer',
            'rounded-xl shadow-xl inset-shadow-sm',
            'bg-button-error',
            'text-lg text-white text-shadow-2xs',
            'transition delay-150 duration-300 ease-in-out',
            'hover:bg-button-error-hover hover:shadow-xl/20'
          )}
          to={'/'}
        >
          <ArrowBigLeft strokeWidth={1.25} className="mr-4" />
          Back to Search
        </Link>
      </div>
    </div>
  );
}
