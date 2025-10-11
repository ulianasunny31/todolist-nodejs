import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

import { getEnvVariables } from './utils/getEnvVariables.js';

import router from './routers/index.js';
import { error404Handler } from './middlewares/Error404Handler.js';
import { error500Handler } from './middlewares/Error500Handler.js';

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

  app.use(router);

  //ERROR 404
  app.use(error404Handler);

  //ERROR 500
  app.use(error500Handler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
