import { registerUser } from '../services/authorization.js';

export const registerUserController = (req, res) => {
  const user = registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User registered successfully',
    user,
  });
};

export const loginUserController = async (req, res) => {
  await loginUser(req.body);
};
