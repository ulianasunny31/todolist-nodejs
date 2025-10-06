import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  finished: Joi.boolean().default(false),
  in_progress: Joi.boolean().default(false),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50),
  finished: Joi.boolean().default(false),
  in_progress: Joi.boolean().default(false),
});
