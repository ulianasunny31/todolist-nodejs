import { SORT_ORDER } from '../constants/index.js';
import { TodoTaskCollection } from '../db/models/TodoTask.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllTasks = async ({
  page,
  perPage,
  sortBy = 'title',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  //pagination logic
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const tasksQuery = TodoTaskCollection.find();

  //filtering logic
  if (filter.completed) {
    tasksQuery.where('completed').equals(filter.completed);
  }

  if (filter.in_progress) {
    tasksQuery.where('in_progress').equals(filter.in_progress);
  }

  //pagination logic + sorting
  const [tasksCount, tasks] = await Promise.all([
    TodoTaskCollection.find().merge(tasksQuery).countDocuments(),
    tasksQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

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
