import createHttpError from 'http-errors';

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    const err = createHttpError(400, {
      message: error.details,
    });
    next(err);
  }
};
