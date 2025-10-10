import { TodoTaskCollection } from '../db/models/TodoTask.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllTasks = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const tasksQuery = TodoTaskCollection.find();
  const tasksCount = await TodoTaskCollection.find()
    .merge(tasksQuery)
    .countDocuments();

  const tasks = await tasksQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(tasksCount, page, perPage);

  return {
    tasks,
    ...paginationData,
  };
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
