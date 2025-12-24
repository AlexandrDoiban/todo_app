import express from 'express';
import { validateCreateUser } from '../middlewares/validateCreateUser';
import { createUserSchema } from '../schemas/user.schema';
import { createUser, deleteUser } from '../controllers/user.controller';

const userRoute = express.Router();

userRoute.post('/', validateCreateUser(createUserSchema), createUser);
userRoute.delete('/:id', deleteUser);

export default userRoute;
