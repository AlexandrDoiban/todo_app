import { Router } from 'express';
import { createTaskController, deleteTaskController } from '../controllers';
import { validateCreateTask } from '../middlewares';
import { createTaskSchema } from '../schemas';

const todosRouter = Router();

todosRouter.post(
  '/create',
  validateCreateTask(createTaskSchema),
  createTaskController,
);

todosRouter.delete('/delete/:id', deleteTaskController);

export { todosRouter };
