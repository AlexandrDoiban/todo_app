import { Router } from 'express';
import {
  createTaskController,
  deleteTaskController,
  editTaskController,
} from '../controllers';
import { validateCreateTask, validateEditTask } from '../middlewares';
import { createTaskSchema, editTaskSchema } from '../schemas';

const todosRouter = Router();

todosRouter.post(
  '/create',
  validateCreateTask(createTaskSchema),
  createTaskController,
);

todosRouter.delete('/delete/:id', deleteTaskController);

todosRouter.patch(
  '/edit/:id',
  validateEditTask(editTaskSchema),
  editTaskController,
);

export { todosRouter };
