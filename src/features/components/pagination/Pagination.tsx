import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

import { PaginationProps } from "@/features/types/paginationTypes";

import { createPageArray } from "./paginationUtils";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = createPageArray(currentPage, totalPages);

  return (
    <div className="pagination">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <CircleArrowLeft strokeWidth={1.25} />
      </button>

      {pages.map((page, index) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${index}`}>
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            disabled={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <CircleArrowRight strokeWidth={1.25} />
      </button>
    </div>
  );
}
