import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);

  if (isKnownOrder) return sortOrder;

  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfTask = [
    '_id',
    'title',
    'completed',
    'in_progress',
    'createdAt',
    'updatedAt',
  ];

  if (keysOfTask.includes(sortBy)) return sortBy;

  return 'title';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
