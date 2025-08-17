'use client';

import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

import { PaginationProps } from '@/features/types/paginationTypes';

import { createPageArray } from './paginationUtils';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = createPageArray(currentPage, totalPages);

  return (
    <div className="flex flex-wrap justify-baseline gap-2">
      <button
        data-testid="previous-page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="previous page"
        className="hover:text-button-reload m-2 text-white hover:cursor-pointer disabled:cursor-default disabled:text-gray-400 dark:disabled:text-gray-300"
      >
        <CircleArrowLeft strokeWidth={1.25} />
      </button>

      <div className="grid w-auto auto-cols-[40px] grid-flow-col justify-center gap-1">
        {pages.map((page, index) =>
          typeof page === 'string' ? (
            <span className="flex justify-center self-center text-white" key={`ellipsis-${index}`}>
              ...
            </span>
          ) : (
            <button
              data-testid={`pagination-page-${page}`}
              aria-label={`page ${page}`}
              key={`page-${page}`}
              disabled={currentPage === page}
              onClick={() => onPageChange(page)}
              className={`rounded-full border-2 border-transparent text-white transition hover:cursor-pointer ${currentPage === page ? 'dark:bg-button-error-hover bg-button-reload border-2 border-white' : 'hover:border-2 hover:border-white'} disabled:cursor-default`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        data-testid="next-page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="next page"
        className="hover:text-button-reload m-2 text-white hover:cursor-pointer disabled:cursor-default disabled:text-gray-400 dark:disabled:text-gray-300"
      >
        <CircleArrowRight strokeWidth={1.25} />
      </button>
    </div>
  );
}
