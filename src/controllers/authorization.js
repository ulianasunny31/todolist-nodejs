import { ONE_DAY } from '../constants/index.js';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUser,
  requestResetEmail,
} from '../services/authorization.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User registered successfully',
    user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupCookies(res, session);

  res.json({
    status: 200,
    message: 'User logged in successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshUserController = async (req, res) => {
  const session = await refreshUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupCookies(res, session);

  res.json({
    status: 200,
    message: 'User session refreshed successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetEmail(req.body.email);

  res.json({
    status: 200,
    message: 'Password reset email sent successfully',
  });
};

const setupCookies = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    expiresAt: new Date(Date.now() + ONE_DAY),
    httpOnly: true,
  });

  res.cookie('sessionId', session._id, {
    expiresAt: new Date(Date.now() + ONE_DAY),
    httpOnly: true,
  });
};
