const parseStatus = (status) => {
  const isString = typeof status === 'string';
  if (!isString) return;

  const isStatus = (status) => ['completed', 'in_progress'].includes(status);
  if (isStatus(status)) return status;
};

export const parseFilterParams = (query) => {
  const { completed, in_progress } = query;

  const parsedCompleted = parseStatus(completed);
  const parsedInProgress = parseStatus(in_progress);

  return {
    completed: parsedCompleted,
    in_progress: parsedInProgress,
  };
};
