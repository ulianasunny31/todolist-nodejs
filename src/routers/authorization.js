import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  refreshUserController,
} from '../controllers/authorization.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/authorization.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validate(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validate(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserController));

export default router;
