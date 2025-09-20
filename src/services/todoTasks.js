import { TodoTaskCollection } from '../db/models/TodoTask.js';

export const getAllTasks = async () => {
  const tasks = await TodoTaskCollection.find();
  return tasks;
};

export const getTaskById = async (taskId) => {
  const task = await TodoTaskCollection.findById(taskId);
  return task;
};
