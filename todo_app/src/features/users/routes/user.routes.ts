import express from 'express';
import { validateCreateUser } from '../middlewares/validateCreateUser';
import { createUserSchema } from '../schemas/user.schema';
import {
  createUserController,
  deleteUserController,
  getUserTodoListController,
} from '../controllers';

const userRoute = express.Router();

userRoute.post('/', validateCreateUser(createUserSchema), createUserController);
userRoute.delete('/:id', deleteUserController);
userRoute.get('/list/:id', getUserTodoListController);

export { userRoute };
