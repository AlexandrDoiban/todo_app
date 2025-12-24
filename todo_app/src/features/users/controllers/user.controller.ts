import { Request, Response } from 'express';
import { CreateUserBody } from '../dto/user.dto';
import { createUserService, deleteUserService } from '../services/user.service';

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
