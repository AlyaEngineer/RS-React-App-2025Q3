import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

import { PaginationProps } from '@/features/types/paginationTypes';

import { createPageArray } from './paginationUtils';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = createPageArray(currentPage, totalPages);

  return (
    <div className="pagination">
      <button
        data-testid="previous-page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="previous page"
      >
        <CircleArrowLeft strokeWidth={1.25} />
      </button>

      {pages.map((page, index) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${index}`}>...</span>
        ) : (
          <button
            data-testid={`pagination-page-${page}`}
            aria-label={`page ${page}`}
            key={`page-${page}`}
            disabled={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        data-testid="next-page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="next page"
      >
        <CircleArrowRight strokeWidth={1.25} />
      </button>
    </div>
  );
}
