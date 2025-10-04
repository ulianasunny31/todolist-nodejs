import { Router } from 'express';

import {
  getAllTasksController,
  getTaskByIdController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/tasks', ctrlWrapper(getAllTasksController));

router.get('/tasks/:taskId', ctrlWrapper(getTaskByIdController));

router.patch('/tasks/:taskId', ctrlWrapper(updateTaskController));
router.post('/tasks', ctrlWrapper(createTaskController));

router.delete('/tasks/:taskId', ctrlWrapper(deleteTaskController));

export default router;
