import { Request, Response } from 'express';
import { CreateUserBody } from '../dto/user.dto';
import { createUserService, deleteUserService } from '../services/user.service';

export const createUser = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
) => {
  const user = await createUserService(req.body);
  return res.status(201).json({ user });
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const deleteUser = await deleteUserService({ userId: req.params.id });
  return res.status(204).json({ user: deleteUser });
};
