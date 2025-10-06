export const calculatePaginationData = (amount, page, perPage) => {
  const totalPages = Math.ceil(amount / perPage);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    page: page,
    perPage,
    totalPages,
    totalItems: amount,
    hasNextPage,
    hasPrevPage,
  };
};
