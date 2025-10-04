import { TodoTaskCollection } from '../db/models/TodoTask.js';

export const getAllTasks = async () => {
  const tasks = await TodoTaskCollection.find();
  return tasks;
};

export const getTaskById = async (taskId) => {
  const task = await TodoTaskCollection.findById(taskId);
  return task;
};

export const createTask = async (taskData) => {
  const newTask = await TodoTaskCollection.create(taskData);
  return newTask;
};

export const deleteTask = async (taskId) => {
  const task = await TodoTaskCollection.findOneAndDelete({ _id: taskId });
  return task;
};

export const updateTask = async (taskId, payload, options = {}) => {
  const updatedTask = await TodoTaskCollection.findOneAndUpdate(
    {
      _id: taskId,
    },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!updatedTask || !updatedTask.value) return null;

  return {
    updatedTask: updatedTask.value,
    isNew: Boolean(updatedTask?.lastErrorObject?.upserted),
  };
};
