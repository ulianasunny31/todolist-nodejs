import mongoose from 'mongoose';

import { getEnvVariables } from '../utils/getEnvVariables.js';

export const initMongoDB = async () => {
  try {
    const user = getEnvVariables('MONGODB_USER');
    const password = getEnvVariables('MONGODB_PASSWORD');
    const url = getEnvVariables('MONGODB_URL');
    const dbName = getEnvVariables('MONGODB_DB');

    const mongoDBUrl = `mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoDBUrl);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
