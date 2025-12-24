import { Router } from 'express';
import { createTaskController } from '../controllers';
import { validateCreateTask } from '../middlewares';
import { createTaskSchema } from '../schemas';

const todosRouter = Router();

todosRouter.post(
  '/',
  validateCreateTask(createTaskSchema),
  createTaskController,
);

export { todosRouter };
