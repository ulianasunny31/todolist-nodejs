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

router.get('/tasks', ctrlWrapper(getAllTasksController));

router.get('/tasks/:taskId', validateID, ctrlWrapper(getTaskByIdController));

router.patch(
  '/tasks/:taskId',
  validate(updateTaskSchema),
  ctrlWrapper(updateTaskController),
);

router.post(
  '/tasks',
  validate(createTaskSchema),
  ctrlWrapper(createTaskController),
);

router.delete('/tasks/:taskId', ctrlWrapper(deleteTaskController));

export default router;
