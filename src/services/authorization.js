import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/authorization.js';
import { SessionCollection } from '../db/models/session.js';
import {
  FIFTEEN_MINUTES,
  ONE_DAY,
  SMTP,
  TEMPLATE_DIR,
} from '../constants/index.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import jwt from 'jsonwebtoken';
import { getEnvVariables } from '../utils/getEnvVariables.js';
import { sendEmail } from '../utils/sendEmail.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email already in use');

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'User not found');

  const isEqualPasswords = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isEqualPasswords) throw createHttpError(401, 'Invalid password');

  await SessionCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshUser = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({ _id: sessionId });
  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionExpired =
    new Date(session.refreshTokenValidUntil) < new Date();
  if (isSessionExpired) throw createHttpError(401, 'Session token expired');

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const requestResetEmail = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found');

  //reset password token creation
  const resetToken = jwt.sign(
    { sub: user._id, email },
    getEnvVariables('JWT_SECERET'),
    { expiresIn: '15m' },
  );

  //email template creation
  const resetEmailPath = path.join(TEMPLATE_DIR, 'reset-password-email.html');
  const resetEmailTemplate = (await fs.readFile(resetEmailPath)).toString();
  const template = handlebars.compile(resetEmailTemplate);
  const html = template({
    name: user.username,
    link: `${getEnvVariables('APP-DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: getEnvVariables(SMTP.SMTP_FROM),
    to: email,
    subject: 'Password Reset Request',
    html,
  });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};
