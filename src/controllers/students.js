import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
} from '../services/todoTasks.js';

import createHttpError from 'http-errors';

export const getAllTasksController = async (req, res) => {
  const tasks = await getAllTasks();

  res.status(200).json({
    status: 200,
    message: 'Tasks retrieved successfully',
    data: tasks,
  });
};

export const getTaskByIdController = async (req, res, next) => {
  const { taskId } = req.params;
  const task = await getTaskById(taskId);

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
  const task = await createTask(req.body);

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: task,
  });
};

export const deleteTaskController = async (req, res, next) => {
  const task = await deleteTask(req.params);

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
  const result = await updateTask(req.params, req.body);

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
