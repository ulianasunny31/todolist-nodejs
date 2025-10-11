import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllTasksController,
  getTaskByIdController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} from '../controllers/todolist.js';

import { createTaskSchema, updateTaskSchema } from '../validation/todolist.js';
import { validate } from '../middlewares/validate.js';
import { validateID } from '../middlewares/validateID.js';

const router = Router();

router.get('/', ctrlWrapper(getAllTasksController));

router.get('/:taskId', validateID, ctrlWrapper(getTaskByIdController));

router.patch(
  '/:taskId',
  validateID,
  validate(updateTaskSchema),
  ctrlWrapper(updateTaskController),
);

router.post(
  '/tasks',
  validate(createTaskSchema),
  ctrlWrapper(createTaskController),
);

router.delete('/:taskId', validateID, ctrlWrapper(deleteTaskController));

export default router;
