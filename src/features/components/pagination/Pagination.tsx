import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

import { PaginationProps } from '@/features/types/paginationTypes';

import { createPageArray } from './paginationUtils';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = createPageArray(currentPage, totalPages);

  return (
    <div className="flex flex-wrap justify-baseline">
      <button
        data-testid="previous-page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="previous page"
        className='text-white m-2 hover:cursor-pointer hover:text-button-reload disabled:cursor-default disabled:text-gray-400'
      >
        <CircleArrowLeft strokeWidth={1.25} />
      </button>

      <div className='flex w-72 justify-center gap-1'>
        {pages.map((page, index) =>
        typeof page === 'string' ? (
          <span className='text-white self-center' key={`ellipsis-${index}`}>...</span>
        ) : (
          <button
            data-testid={`pagination-page-${page}`}
            aria-label={`page ${page}`}
            key={`page-${page}`}
            disabled={currentPage === page}
            onClick={() => onPageChange(page)}
            className={`border-transparent border-2 px-3 py-1 text-white rounded-full transition hover:cursor-pointer
              ${currentPage === page ? 'bg-button-error-hover border-white border-2' : 'hover:border-2 hover:border-white'}
               disabled:cursor-default`}
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
        className='text-white m-2 hover:cursor-pointer hover:text-button-reload disabled:cursor-default disabled:text-gray-400'
      >
        <CircleArrowRight strokeWidth={1.25} />
      </button>
    </div>
  );
}
