import { Request, Response } from 'express';
import { CreateUserBody } from '../dto/user.dto';
import {
  createUserService,
  deleteUserService,
  getUserTodoListService,
} from '../services/user.service';
import { TaskListResponseDto } from '../dto';

export const createUserController = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
) => {
  const user = await createUserService(req.body);
  return res.status(201).json({ user });
};

export const deleteUserController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const deleteUser = await deleteUserService({ userId: req.params.id });
  return res.status(204).json({ user: deleteUser });
};

export const getUserTodoListController = async (
  req: Request<{ id: string }>,
  res: Response<Array<TaskListResponseDto>>,
) => {
  const list = await getUserTodoListService(req.params.id);
  return res.status(200).json(list);
};
