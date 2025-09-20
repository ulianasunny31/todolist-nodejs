import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

import { getEnvVariables } from './utils/getEnvVariables.js';
import { getAllTasks, getTaskById } from './services/todoTasks.js';

dotenv.config();

const app = express();

const PORT = Number(getEnvVariables('PORT', 3000));

export const startServer = () => {
  app.use(cors());

  //PINO-PRETTY
  //   app.use(
  //     pino({
  //       transport: {
  //         target: 'pino-pretty',
  //       },
  //     }),
  //   );

  app.use(express.json());

  app.get('/tasks', async (req, res) => {
    const tasks = await getAllTasks();

    res.status(200).json({
      data: tasks,
    });
  });

  app.get('/tasks/:taskId', async (req, res, next) => {
    const { taskId } = req.params;
    const task = await getTaskById(taskId);

    if (!task) {
      res.status(404).json({
        message: 'Task not found',
      });
      return;
    }

    res.status(200).json({
      data: task,
    });
  });

  //ERROR 404
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Route Not found',
    });
  });

  //ERROR 500
  app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong!' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
