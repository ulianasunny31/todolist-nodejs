import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../services/todolist.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllTasksController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = req.query;

  const tasks = await getAllTasks({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Tasks retrieved successfully',
    data: tasks,
  });
};

export const getTaskByIdController = async (req, res, next) => {
  const { taskId } = req.params;
  const { userId } = req.user._id;
  const task = await getTaskById(taskId, userId);

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Task retrieved successfully',
    data: task,
  });
};

export const createTaskController = async (req, res) => {
  const task = { ...req.body, userId: req.user._id };
  const result = await createTask(task);

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: result,
  });
};

export const deleteTaskController = async (req, res, next) => {
  const taskId = req.params;
  const userId = req.user._id;
  const task = await deleteTask(taskId, userId);

  if (!task) {
    next(createHttpError(404, 'Task not found'));
    return;
  }

  res.status(204).json({
    status: 204,
    message: 'Task deleted successfully',
  });
};

//patch
export const updateTaskController = async (req, res, next) => {
  const taskId = req.params;
  const userId = req.user._id;
  const result = await updateTask({ taskId, userId, payload: req.body });

  if (!result) {
    next(createHttpError(404, 'Task not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: ' Task updated successfully',
    data: result.task,
  });
};
