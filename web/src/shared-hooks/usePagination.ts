import React from 'react';
import { range } from '../utils/range';

interface PaginationParams {
  currentPage?: number;
  onPageChange: (page: number) => void;
  boundaries?: number;
  siblings?: number;
  total?: number;
}

export const DOTS = 'dots';

export const usePagination = ({
  currentPage = 1,
  onPageChange,
  boundaries = 1,
  siblings = 1,
  total = 0,
}: PaginationParams) => {
  const setPage = (page: number) => {
    if (page <= 0) {
      onPageChange(1);
    } else if (page > total) {
      onPageChange(total);
    } else {
      onPageChange(page);
    }
  };

  const nextPage = () => setPage(currentPage + 1);
  const previousPage = () => setPage(currentPage - 1);
  const firstPage = () => setPage(1);
  const lastPage = () => setPage(total);

  const paginationRange = React.useMemo((): (number | typeof DOTS)[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= total) {
      return range(1, total);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, boundaries);
    const rightSiblingIndex = Math.min(
      currentPage + siblings,
      total - boundaries
    );

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(total - (boundaries - 1), total),
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [
        ...range(1, boundaries),
        DOTS,
        ...range(total - rightItemCount, total),
      ];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(total - boundaries + 1, total),
    ];
  }, [total, siblings, currentPage]);

  return {
    range: paginationRange,
    currentPage,
    setPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
  };
};
