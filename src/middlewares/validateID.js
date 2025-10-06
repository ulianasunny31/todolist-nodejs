import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateID = (req, res, next) => {
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    throw createHttpError(400, 'Invalid ID format');
  }
  next();
};
