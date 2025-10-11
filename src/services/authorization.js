import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/authorization.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email already in use');

  const hashedPassword = await bcrypt.hash(payload.password);

  return await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'User not found');

  const isEqualPasswords = bcrypt.compare(payload.password, user.password);
  if (!isEqualPasswords) throw createHttpError(401, 'Invalid password');

  return user;
};
