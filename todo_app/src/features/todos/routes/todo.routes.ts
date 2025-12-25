import { Router } from 'express';
import {
  createTaskController,
  deleteTaskController,
  editTaskController,
  getAllTasksController,
  toggleTaskCompleteController,
} from '../controllers';
import { validateCreateTask, validateEditTask } from '../middlewares';
import { createTaskSchema, editTaskSchema } from '../schemas';

const todosRouter = Router();

todosRouter.get('/list', getAllTasksController);

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

todosRouter.patch('/:id/complete', toggleTaskCompleteController);
export { todosRouter };
