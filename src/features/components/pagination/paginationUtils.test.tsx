import { describe, it, expect } from 'vitest';

import { createPageArray } from './paginationUtils';

describe('createPageArray', () => {
  it('returns all pages if totalPages <= 5', () => {
    expect(createPageArray(1, 3)).toEqual([1, 2, 3]);
    expect(createPageArray(3, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('shows first 3 pages, ellipsis, and last page if currentPage is near start', () => {
    expect(createPageArray(1, 10)).toEqual([1, 2, 3, '...', 10]);
    expect(createPageArray(3, 10)).toEqual([1, 2, 3, '...', 10]);
  });

  it('shows first page, ellipsis, last 3 pages if currentPage is near end', () => {
    expect(createPageArray(9, 10)).toEqual([1, '...', 8, 9, 10]);
    expect(createPageArray(10, 10)).toEqual([1, '...', 8, 9, 10]);
  });

  it('shows first page, ellipsis, currentPage ± 1, ellipsis, last page if currentPage is in the middle', () => {
    expect(createPageArray(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
    expect(createPageArray(6, 10)).toEqual([1, '...', 5, 6, 7, '...', 10]);
  });
});
