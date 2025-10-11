import { Router } from 'express';
import tasksRouter from './todolist.js';
import authRouter from './authorization.js';

const router = Router();

router.use('/tasks', tasksRouter);
router.use('/auth', authRouter);

export default router;
