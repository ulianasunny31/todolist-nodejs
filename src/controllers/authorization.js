import { ONE_DAY } from '../constants/index.js';
import { loginUser, registerUser } from '../services/authorization.js';

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

  res.cookie('refreshToken', session.refreshToken, {
    expiresAt: new Date(Date.now() + ONE_DAY),
    httpOnly: true,
  });

  res.cookie('accessToken', session.refreshToken, {
    expiresAt: new Date(Date.now() + ONE_DAY),
    httpOnly: true,
  });

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
  res.clearCookie('accessToken');

  res.status(204).send();
};
