import { Link } from 'react-router-dom';

import { cn } from '@/libs/utils';

export default function Footer() {
  return (
    <footer
      className={cn(
        'bg-dark/4',
        'shadow-3xl/20',
        'mt-4 flex h-auto items-center justify-between gap-8 text-white text-shadow-lg/20 max-md:flex-col max-md:items-start max-md:gap-10',
        'rounded-xl',
        '@9xl:m-auto @9xl:mt-4 px-10 py-6 max-md:px-5',
        'backdrop-invert backdrop-opacity-5',
        'max-w-(--my-max-width)'
      )}
    >
      <div className="flex flex-col gap-2">
        <div>
          <Link
            to={'/'}
            className="hover:text-button-reload transition-colors duration-300 hover:text-shadow-lg/30"
          >
            <span className="p-2">Home</span>
          </Link>
        </div>
        <div>
          <Link
            to={'/about'}
            className="hover:text-button-reload transition-colors duration-300 hover:text-shadow-lg/30"
          >
            <span className="p-2">About us</span>
          </Link>
        </div>
        <div>
          <Link
            to="https://rs.school/courses/reactjs"
            target="_blank"
            className="hover:text-button-reload transition-colors duration-300 hover:text-shadow-lg/30"
          >
            <span className="p-2">Rolling Scopes School / React Course</span>
          </Link>
        </div>
      </div>

      <div className="max-md:px-2">
        <p>&copy; {new Date().getFullYear()} Rick & Morty API Search</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  );
}
