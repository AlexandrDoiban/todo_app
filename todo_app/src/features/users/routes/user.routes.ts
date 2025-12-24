import express from 'express';
import { validateCreateUser } from '../middlewares/validateCreateUser';
import { createUserSchema } from '../schemas/userSchema';
import { createUser } from '../controllers/user.controller';

const userRoute = express.Router();

userRoute.post('/', validateCreateUser(createUserSchema), createUser);

export default userRoute;
