import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/authorization.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/authorization.js';

const router = Router();

router.get('/register', validate(registerUserSchema), registerUserController);
router.get('/login', validate(loginUserSchema), loginUserController);

export default router;
