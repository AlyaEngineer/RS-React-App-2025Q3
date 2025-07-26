const PAGES_DISPLAYED_WITHOUT_ELLIPSIS = 5;
const PAGE_RANGE = 3;

export function createPageArray(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= PAGES_DISPLAYED_WITHOUT_ELLIPSIS) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  if (currentPage <= PAGE_RANGE) {
    pages.push(1, 2, 3, '...', totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
  }

  return pages;
}
